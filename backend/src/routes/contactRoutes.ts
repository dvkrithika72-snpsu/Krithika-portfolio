import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { submitContactForm, getContacts, updateContactStatus, deleteContact, verifyContact } from '../controllers/contactController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Rate limiter for contact submissions to prevent spam
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // Limit each IP to 5 contact requests per windowMs
  message: { success: false, error: 'Too many contact requests from this IP, please try again after an hour.' }
});

router.post('/', contactLimiter, submitContactForm);
router.get('/verify/:token', verifyContact);

// Admin Routes
router.get('/', protect, getContacts);
router.put('/:id/status', protect, updateContactStatus);
router.delete('/:id', protect, deleteContact);

export default router;
