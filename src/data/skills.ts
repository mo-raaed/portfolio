import type { Certification, SkillGroup } from '../types';

export const skillGroups: SkillGroup[] = [
  {
    category: 'AI, Machine Learning & Vision',
    skills: [
      'TensorFlow',
      'PyTorch',
      'Neural Networks',
      'LSTM',
      'CNN',
      'RAG Systems',
      'LLMs',
      'OpenCV',
      'Computer Vision',
    ],
  },
  {
    category: 'Web & Core Programming',
    skills: [
      'TypeScript',
      'Python',
      'React',
      'Vite',
      'Tailwind CSS v4',
      'Convex',
      'Clerk Auth',
      'WebGL',
      'MATLAB',
    ],
  },
  {
    category: 'Operations & Industry Skills',
    skills: [
      'Document Control (CDCS)',
      'Project Management',
      'Git / GitHub',
      'Data Preprocessing',
      'Video Production',
      'Photography',
    ],
  },
];

export const certifications: Certification[] = [
  { title: 'Certified Document Control', issuer: 'CDCS Certification' },
  { title: 'Project Management Foundations', issuer: 'Coursera / PM' },
  { title: 'Project Initiation Credentials', issuer: 'Coursera / Google' },
];
