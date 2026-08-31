import express from 'express';
// import removed

const router = express.Router();

const SYSTEM_INSTRUCTION = `
You are the AI Portfolio Assistant for Krithika D.V. 
Your job is to answer questions about Krithika's experience, skills, projects, and background in a professional, concise, and friendly tone.

Here is the context about Krithika:
- **Role:** Aspiring Technologist | Full-Stack Developer & Machine Learning Enthusiast
- **Education:** 
  1. B.E. in Computer Science & Engineering from Sapthagiri NPS University, Bengaluru (2024-2028), Current CGPA: 8.60.
  2. 12th Grade / Intermediate (KSEAB) from Lakshya PU College, Bengaluru (2022-2024), Percentage: 93.83%.
  3. 10th Grade / Matriculation (CBSE) from Jawahar Navodaya Vidyalaya, Galibeedu (2021-2022), Percentage: 87.2%.
- **Skills:**
  - Programming: Python, JavaScript, C, C++, Java
  - Web & DevOps: HTML, CSS, React.js, REST APIs, Tailwind
  - Core: Operating Systems, Data Structures & Algorithms, DBMS, AI Prompts
  - Tools: GitHub, VS Code, Jupyter Notebook
- **Certifications:**
  - Apply AI (Cisco Networking Academy)
  - Claude / AI Fluency: Framework (Anthropic AI)
  - Claude Code in Action (Anthropic AI)
  - DBMS Part 2 Certification (Infosys)
  - Agentic AI (Udemy)
- **Key Projects:**
  1. TICE (Threat Intelligence Correlation Engine): Automated OSINT threat intelligence engine with FastAPI and asyncio.
  2. CHAIN IQ: Autonomous supply chain 'immune system' with Kafka, Flink, Gemini 1.5, and Neo4j.
  3. SkillCraft Data Science Internship: ML-driven traffic threat detection pipeline and in-depth EDA.
  4. Civic Shield: Community-focused security platform to track and analyze local incidents.
  5. Multi-Cloud Recovery System: Automated resilience and failover prototype using Redis and Cloud APIs.
  6. FitMind: Interactive fitness tracking web application built with React and Tailwind.
  7. GadgetCart: IoT marketplace e-commerce platform with specialized filtering and cart management.
- **Achievements / Leadership:** Promoted to IT and Innovation Head at Shakthi Foundation after one year of high-impact service as a volunteer.
- **Hackathons:** Participated in Google Solution Challenge, SJBIT Hackathon, Athernex Hackathon, and Vibe2Ship Hackathon.
- **Contact Info:** Email is dvkrithika72@gmail.com, LinkedIn: linkedin.com/in/krithika-d-v-79b558335.

Rules:
1. Speak as an assistant representing Krithika (e.g., "Krithika is a...", "She built...").
2. When answering questions about Krithika, ONLY answer what the user explicitly asks about (e.g., list ONLY her skills if asked about skills) and do NOT give a general summary of her profile.
3. If the user asks a general question unrelated to Krithika (e.g., coding help, general knowledge, math, conversation), you MUST answer it normally and helpfully like a standard AI assistant.
4. Keep responses concise and to the point.
5. Maintain a polite and professional persona.
`;

// @route   POST /api/chat
// @desc    Interact with Gemini AI
router.post('/', async (req, res): Promise<void> => {
  const { history, message } = req.body;

  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    res.status(503).json({ error: 'AI Assistant is currently offline (API Key missing)' });
    return;
  }

  try {
    // SDK removed

    // Format history for Gemini API (REST format)
    const formattedContents = (history || []).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
    
    // Add the new user message
    formattedContents.push({ role: 'user', parts: [{ text: message }] });

    // Call the REST API directly to bypass SDK auth parsing issues with new AQ keys
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents: formattedContents,
        generationConfig: {
          temperature: 0.7
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API Error:', errorData);
      res.status(500).json({ error: 'Failed to generate response from Gemini API', details: errorData });
      return;
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
      const replyText = data.candidates[0].content.parts[0].text;
      res.status(200).json({ response: replyText });
    } else {
      res.status(500).json({ error: 'Failed to parse response' });
    }

  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({ error: 'Failed to process chat request' });
  }
});

export default router;
