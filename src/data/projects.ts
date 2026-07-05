import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'gradify',
    title: 'Gradify',
    category: 'Academic Web Application',
    description:
      'A GPA calculator built for AUIS students. Import a transcript PDF, simulate grade changes, track retakes, and sync across devices, all without manual data entry.',
    stack: ['React', 'TypeScript', 'Convex', 'Clerk Auth', 'Tailwind CSS'],
    live: 'https://gradify.neuralsun.systems',
    status: 'live',
    featured: true,
  },
  {
    id: 'ghi-prediction',
    title: 'GHI Predicting Neural Networks',
    category: 'Machine Learning Research',
    description:
      'Trained four neural network architectures to forecast solar irradiance across 8 locations in Oman. Uses satellite weather data and custom feature engineering to predict energy output.',
    stack: ['Python', 'TensorFlow', 'Scikit-learn', 'GroupKFold'],
    github: 'https://github.com/mo-raaed/CNN-Architecture-Evaluator',
    status: 'in-progress',
    featured: true,
  },
  {
    id: 'schedule-maker',
    title: 'Weekly Schedule Builder',
    category: 'Utility Web Application',
    description:
      'Plan your weekly routine by dropping in fixed tasks. The app builds a clean, organized calendar and lets you export it as a high-quality PNG or PDF.',
    stack: ['React', 'TypeScript', 'Convex', 'Clerk Auth', 'Tailwind CSS'],
    live: 'https://schedule.neuralsun.systems/',
    status: 'live',
  },
  {
    id: 'rag-assistant',
    title: 'AUIS Academic Catalog RAG Assistant',
    category: 'Local AI System',
    description:
      'An AI assistant that answers student questions about the university catalog in natural language, running entirely offline on a laptop with no cloud APIs. Uses vector search and a quantized language model.',
    stack: ['Python', 'Phi-3-mini', 'ChromaDB', 'Gradio', 'CUDA'],
    status: 'local',
  },
  {
    id: 'gamut',
    title: 'Gamut Photo Scopes Lab',
    category: 'WebGL Visualization',
    description:
      'A browser-based photo analysis tool with GPU-accelerated histogram, waveform, and vectorscope views, built for photographers who want to inspect exposure and color without desktop software.',
    stack: ['React', 'TypeScript', 'WebGL', 'Vite'],
    github: 'https://github.com/mo-raaed/gamut',
    live: 'https://gamut.neuralsun.systems',
    status: 'live',
  },
  {
    id: 'stereo-depth',
    title: 'Stereo Depth Computer Vision',
    category: 'Computer Vision',
    description:
      'Generates spatial depth maps from stereo image pairs using block-matching algorithms and camera calibration, turning two flat photos into a 3D depth representation.',
    stack: ['Python', 'OpenCV', 'NumPy', 'Camera Calibration'],
    github: 'https://github.com/mo-raaed/StereoDepth-CV',
    status: 'local',
  },
  {
    id: 'emotion-music',
    title: 'Emotion-Adaptive Music Player',
    category: 'Computer Vision & AI',
    description:
      'Reads your facial expression through a webcam in real-time and automatically switches playlists to match your mood. Uses a neural network trained on 35,000+ face images.',
    stack: ['Python', 'PyTorch', 'ResNet-18', 'OpenCV'],
    status: 'local',
  },
  {
    id: 'sign-language',
    title: 'HandSpeak ASL Recognition',
    category: 'Computer Vision & Accessibility',
    description:
      'A real-time sign language recognition system for non-verbal hospital patients. It tracks 21 hand landmarks and classifies 29 ASL signs with a lightweight LandmarkNN, reaching 98.89% validation accuracy at 30 FPS on a laptop CPU with no GPU.',
    stack: ['Python', 'MediaPipe', 'Neural Network', 'OpenCV'],
    github: 'https://github.com/mo-raaed/handspeak',
    status: 'local',
  },
];
