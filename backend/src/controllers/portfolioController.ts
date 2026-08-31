import { Request, Response } from 'express';
import Project from '../models/Project';
import Certification from '../models/Certification';

// PROJECTS //

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      res.status(404).json({ success: false, error: 'Project not found' });
      return;
    }
    res.status(200).json({ success: true, data: project });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ success: false, error: 'Project not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// CERTIFICATIONS //

export const getCertifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const certifications = await Certification.find().sort({ createdAt: 1 });
    res.status(200).json({ success: true, count: certifications.length, data: certifications });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

export const createCertification = async (req: Request, res: Response): Promise<void> => {
  try {
    const certification = await Certification.create(req.body);
    res.status(201).json({ success: true, data: certification });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateCertification = async (req: Request, res: Response): Promise<void> => {
  try {
    const certification = await Certification.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!certification) {
      res.status(404).json({ success: false, error: 'Certification not found' });
      return;
    }
    res.status(200).json({ success: true, data: certification });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteCertification = async (req: Request, res: Response): Promise<void> => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id);
    if (!certification) {
      res.status(404).json({ success: false, error: 'Certification not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
