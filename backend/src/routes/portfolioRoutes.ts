import express from 'express';
import { 
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject,
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification
} from '../controllers/portfolioController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Projects routes
router.route('/projects')
  .get(getProjects)
  .post(protect, createProject);

router.route('/projects/:id')
  .put(protect, updateProject)
  .delete(protect, deleteProject);

// Certifications routes
router.route('/certifications')
  .get(getCertifications)
  .post(protect, createCertification);

router.route('/certifications/:id')
  .put(protect, updateCertification)
  .delete(protect, deleteCertification);

export default router;
