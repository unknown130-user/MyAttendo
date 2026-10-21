import { Router } from 'express';
import { calculateAttendance } from '@myattendo/shared';

const router = Router();

const studentSummary = {
  welcome: 'Welcome back, Aarav!',
  totals: {
    totalClassesConducted: 42,
    totalClassesAttended: 35,
    totalClassesMissed: 7,
  },
  metrics: {
    below65: 1,
    between65And75: 2,
    above75: 3,
  },
  subjects: [
    { name: 'Data Structures', code: 'CS201', faculty: 'Dr. Nair', attended: 28, conducted: 35, percentage: 80 },
    { name: 'Operating Systems', code: 'CS205', faculty: 'Prof. Mehta', attended: 18, conducted: 30, percentage: 60 },
    { name: 'Database Systems', code: 'CS210', faculty: 'Dr. Rao', attended: 25, conducted: 30, percentage: 83.33 },
    { name: 'Computer Networks', code: 'CS214', faculty: 'Prof. Iyer', attended: 14, conducted: 22, percentage: 63.64 },
  ],
};

router.get('/dashboard', (req, res) => {
  if (!req.session.user || req.session.user.role !== 'student') {
    return res.status(403).json({ message: 'Student access required.' });
  }

  return res.json(studentSummary);
});

router.get('/attendance', (req, res) => {
  if (!req.session.user || req.session.user.role !== 'student') {
    return res.status(403).json({ message: 'Student access required.' });
  }

  const subjects = studentSummary.subjects.map((subject) => ({
    ...subject,
    ...calculateAttendance(subject.attended, subject.conducted),
  }));

  return res.json({ items: subjects });
});

export default router;
