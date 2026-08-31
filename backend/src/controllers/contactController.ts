import { Request, Response } from 'express';
import mongoose from 'mongoose';
import crypto from 'crypto';
import Contact from '../models/Contact';

export const submitContactForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message } = req.body;

    // Strict Server-Side Validation
    if (!name || name.trim().length === 0 || name.length > 100) {
      res.status(400).json({ success: false, error: 'Valid name is required (max 100 characters)' });
      return;
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email || !emailRegex.test(email) || email.length > 150) {
      res.status(400).json({ success: false, error: 'Valid email is required (max 150 characters)' });
      return;
    }
    if (!message || message.trim().length < 10 || message.length > 5000) {
      res.status(400).json({ success: false, error: 'Message must be between 10 and 5000 characters' });
      return;
    }

    // Default AI Values
    let aiCategory = 'General';
    let aiSummary = message.substring(0, 100) + '...';
    let aiPriority: 'High' | 'Medium' | 'Low' = 'Medium';
    let aiTone = 'Unknown';

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (apiKey) {
      try {
        const SYSTEM_INSTRUCTION = `
          You are an AI analyzing incoming inquiries for a portfolio website.
          Given the following inquiry details, generate a JSON response with EXACTLY these 4 keys:
          - "category": A short category (e.g. "AI / Full Stack", "Web Dev", "Job Opportunity")
          - "summary": A concise 1-sentence summary of what the person wants.
          - "priority": Must be exactly one of: "High", "Medium", "Low". (e.g. Job offers/serious gigs are High, casual questions are Low, general projects are Medium).
          - "tone": A 1-2 word description of their tone (e.g. "Professional", "Casual", "Urgent").
          Do NOT output any markdown blocks, just raw JSON.
        `;
        const userPrompt = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
            contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
            generationConfig: { temperature: 0.1 }
          })
        });
        if (response.ok) {
          const data = await response.json();
          if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
            let aiText = data.candidates[0].content.parts[0].text;
            aiText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
            const aiParsed = JSON.parse(aiText);
            aiCategory = aiParsed.category || aiCategory;
            aiSummary = aiParsed.summary || aiSummary;
            aiPriority = (['High', 'Medium', 'Low'].includes(aiParsed.priority) ? aiParsed.priority : 'Medium') as 'High' | 'Medium' | 'Low';
            aiTone = aiParsed.tone || aiTone;
          }
        }
      } catch (geminiError) {
        console.error('Gemini Analysis Failed, using fallback:', geminiError);
      }
    }

    // Generate Verification Token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const contact = await Contact.create({
      name, email, message,
      aiCategory, aiSummary, aiPriority, aiTone,
      status: 'new',
      emailStatus: 'pending',
      verificationToken,
      verificationExpires
    });

    console.log(`✅ Saved unverified inquiry from ${name}. (Email system disabled)`);
    
    res.status(201).json({
      success: true,
      message: 'Contact form submitted.'
    });
  } catch (error: any) {
    console.error('Contact submission error:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

export const verifyContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.params;
    
    const contact = await Contact.findOne({ 
      verificationToken: token,
      verificationExpires: { $gt: new Date() }
    }).select('+verificationToken +verificationExpires');

    if (!contact) {
      res.status(400).json({ success: false, error: 'Invalid or expired verification token' });
      return;
    }

    contact.emailStatus = 'verified';
    contact.verifiedAt = new Date();
    contact.verificationToken = undefined;
    contact.verificationExpires = undefined;
    await contact.save();

    // Trigger owner notification ONLY after successful verification
    // (Email system disabled)

    res.status(200).json({ success: true, message: 'Email verified successfully.' });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

export const getContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error: any) {
    console.error('Fetch contacts error:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

export const updateContactStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    
    if (!['new', 'read', 'replied'].includes(status)) {
      res.status(400).json({ success: false, error: 'Invalid status' });
      return;
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      res.status(404).json({ success: false, error: 'Inquiry not found' });
      return;
    }

    res.status(200).json({ success: true, data: contact });
  } catch (error: any) {
    console.error('Update contact status error:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

export const deleteContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      res.status(404).json({ success: false, error: 'Inquiry not found' });
      return;
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    console.error('Delete contact error:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
