import type { TimelineEvent } from '../types';

/** Auto-sorted oldest → newest by sortDate. */
export const timelineEvents: TimelineEvent[] = (
  [
    {
      id: 't-gradify',
      sortDate: '2024-06-15',
      displayDate: 'Summer 2024',
      title: 'Gradify Launched',
      role: 'Full-stack Developer',
      description:
        'Designed and deployed a full-stack GPA tool actively used by AUIS students for transcript import and grade simulation.',
      icon: 'project',
    },
    {
      id: 't-admissions',
      sortDate: '2024-10-01',
      displayDate: 'Fall 2024',
      title: 'AUIS Admissions & Podcast',
      role: 'Volunteering Award',
      description:
        'Completed over 50 hours of verified volunteering, assisting registrar data and filming/editing campus podcast series.',
      icon: 'volunteering',
    },
    {
      id: 't-shift',
      sortDate: '2025-01-15',
      displayDate: 'January 2025',
      title: 'Shift Agency Video Intern',
      role: 'Video Editor & Filmmaker',
      description:
        'Managed production lifecycles and edited cinematic videos for corporate clients using DaVinci Resolve.',
      icon: 'work',
    },
    {
      id: 't-ghi',
      sortDate: '2025-06-15',
      displayDate: 'Summer 2025',
      title: 'GHI Solar Prediction Research',
      role: 'AI Researcher',
      description:
        'Engineered deep neural network predictors for solar irradiance forecasting, contributing to an upcoming academic publication.',
      icon: 'project',
      ongoing: true,
    },
    {
      id: 't-vex',
      sortDate: '2025-11-01',
      displayDate: 'November 2025',
      title: 'VEX Robotics Head Scorekeeper',
      role: 'Volunteering',
      description:
        'Organized and refereed match records for the national VEX Robotics tournament held on the AUIS campus.',
      icon: 'volunteering',
    },
    {
      id: 't-cdcs',
      sortDate: '2025-12-01',
      displayDate: 'December 2025',
      title: 'Certified Document Control (CDCS)',
      role: 'Professional Certification',
      description:
        'Acquired professional certification as a Document Control Specialist, key for operations in engineering sectors.',
      icon: 'award',
    },
    {
      id: 't-capstone',
      sortDate: '2026-02-01',
      displayDate: 'Spring 2026',
      title: 'Capstone: Sensor Fusion Framework',
      role: 'Research Lead',
      description:
        'Leading MEMS-PZT sensor fusion research for rotating machinery condition monitoring in the energy and oil operations domain.',
      icon: 'project',
      ongoing: true,
    },
    {
      id: 't-deans-award',
      sortDate: '2026-05-01',
      displayDate: 'May 2026',
      title: "Dean's Award",
      role: 'Academic Honor',
      description:
        "Recognized by the American University of Iraq, Sulaimani for earning a 3.50 to 3.74 GPA in the Fall 2025 semester.",
      icon: 'award',
    },
  ] satisfies TimelineEvent[]
).sort((a, b) => new Date(a.sortDate).getTime() - new Date(b.sortDate).getTime());
