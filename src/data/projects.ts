import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'gradify',
    title: 'Gradify 2.0',
    category: 'Academic Web Application',
    description:
      'A GPA calculator built for AUIS students — import your transcript PDF, simulate grade changes, track retakes, and sync across devices. No manual data entry needed.',
    stack: ['React', 'TypeScript', 'Convex', 'Clerk Auth', 'Tailwind CSS'],
    live: 'https://gradify.netlify.app',
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
    id: 'sensor-fusion',
    title: 'Rotordynamic Sensor Fusion Framework',
    category: 'Mechatronics & Signal Processing',
    description:
      'A dual-sensor condition monitoring system for rotating machinery. Fuses MEMS accelerometer and PZT knock sensor data through custom analog conditioning and digital fault analysis (FFT, Hilbert envelope) on ESP32.',
    stack: ['Sensor Fusion', 'Analog Front-End', 'ESP32', 'FFT & Hilbert', 'MATLAB'],
    status: 'in-progress',
  },
  {
    id: 'schedule-maker',
    title: 'Weekly Schedule Builder',
    category: 'Utility Web Application',
    description:
      'Plan your weekly routine by dropping in fixed tasks — the app builds a clean, organized calendar and lets you export it as a high-quality PNG or PDF.',
    stack: ['React', 'TypeScript', 'Convex', 'Clerk Auth', 'Tailwind CSS'],
    live: 'https://schedule.neuralsun.systems/',
    status: 'live',
  },
  {
    id: 'rag-assistant',
    title: 'AUIS Academic Catalog RAG Assistant',
    category: 'Local AI System',
    description:
      'An AI assistant that answers student questions about the university catalog in natural language — runs entirely offline on a laptop with no cloud APIs. Uses vector search and a quantized language model.',
    stack: ['Python', 'Phi-3-mini', 'ChromaDB', 'Gradio', 'CUDA'],
    status: 'local',
  },
  {
    id: 'gamut',
    title: 'Gamut Photo Scopes Lab',
    category: 'WebGL Visualization',
    description:
      'A browser-based photo analysis tool with GPU-accelerated scopes — histogram, waveform, and vectorscope — for photographers who want to inspect exposure and color without desktop software.',
    stack: ['React', 'TypeScript', 'WebGL', 'Vite'],
    github: 'https://github.com/mo-raaed/gamut',
    // TODO: flip back to 'live' (and add the `live` URL) once Gamut is deployed. (Bug 7)
    status: 'local',
  },
  {
    id: 'stereo-depth',
    title: 'Stereo Depth Computer Vision',
    category: 'Computer Vision',
    description:
      'Generates spatial depth maps from stereo image pairs using block-matching algorithms and camera calibration — turning two flat photos into a 3D depth representation.',
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
];
