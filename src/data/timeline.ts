import type { TimelineEvent } from '../types';

/** Auto-sorted oldest → newest by sortDate. */
export const timelineEvents: TimelineEvent[] = (
  [
    {
      id: 't-vex',
      sortDate: '2024-06-01',
      displayDate: 'Mid 2024',
      title: 'VEX Robotics Head Scorekeeper',
      role: 'Volunteering',
      description:
        'Organized and refereed match records for the national VEX Robotics tournament held on the AUIS campus.',
      icon: 'volunteering',
    },
    {
      id: 't-admissions',
      sortDate: '2024-10-01',
      displayDate: 'Late 2024',
      title: 'AUIS Admissions & Podcast',
      role: 'Volunteering Award',
      description:
        'Completed over 50 hours of verified volunteering, assisting registrar data and filming/editing campus podcast series.',
      icon: 'volunteering',
    },
    {
      id: 't-shift',
      sortDate: '2025-01-15',
      displayDate: 'Jan 2025',
      title: 'Shift Agency Video Intern',
      role: 'Video Editor & Filmmaker',
      description:
        'Managed production lifecycles and edited cinematic videos for corporate clients using DaVinci Resolve.',
      icon: 'work',
    },
    {
      id: 't-gradify',
      sortDate: '2025-03-01',
      displayDate: 'Early 2025',
      title: 'Gradify 2.0 Launched',
      role: 'Full-stack Developer',
      description:
        'Designed and deployed a full-stack GPA tool actively used by AUIS students for transcript import and grade simulation.',
      icon: 'project',
    },
    {
      id: 't-cdcs',
      sortDate: '2025-06-01',
      displayDate: 'Mid 2025',
      title: 'Certified Document Control (CDCS)',
      role: 'Professional Certification',
      description:
        'Acquired professional certification as a Document Control Specialist, key for operations in engineering sectors.',
      icon: 'award',
    },
    {
      id: 't-ghi',
      sortDate: '2025-10-01',
      displayDate: 'Late 2025',
      title: 'GHI Solar Prediction Research',
      role: 'AI Researcher',
      description:
        'Engineered deep neural network predictors for solar irradiance forecasting, contributing to an upcoming academic publication.',
      icon: 'project',
    },
    {
      id: 't-capstone',
      sortDate: '2026-01-15',
      displayDate: '2026',
      title: 'Capstone: Sensor Fusion Framework',
      role: 'Research Lead',
      description:
        'Leading MEMS-PZT sensor fusion research for rotating machinery condition monitoring in the energy and oil operations domain.',
      icon: 'project',
    },
  ] satisfies TimelineEvent[]
).sort((a, b) => new Date(a.sortDate).getTime() - new Date(b.sortDate).getTime());
