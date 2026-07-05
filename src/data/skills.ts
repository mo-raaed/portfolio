import type { Certification, SkillGroup } from '../types';

export const skillGroups: SkillGroup[] = [
  {
    category: 'AI-Driven Development',
    skills: [
      'Claude Code',
      'Cursor',
      'Prompt-Directed Development',
      'Spec Writing',
      'Agentic Iteration',
      'Rapid Prototyping',
      'Cloudflare & Netlify Deploys',
      'DNS & Domain Setup',
    ],
  },
  {
    category: 'Engineering & Analysis',
    skills: [
      'MATLAB',
      'Neural Networks',
      'Computer Vision',
      'Classical Feature Detection (Canny, Harris, LoG)',
      'Medical Image Analysis',
      'Hand Landmark Tracking',
      'RAG Systems',
      'Model Evaluation',
      'Signal Processing (FFT, Hilbert)',
      'Sensor Systems & Mechatronics',
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
