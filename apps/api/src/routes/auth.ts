import { Router } from 'express';
import { comparePassword } from '../lib/password.js';

const router = Router();

const users = [
  {
    id: 'admin-1',
    name: 'System Administrator',
    email: 'admin@myattendo.local',
    role: 'admin',
    passwordHash: '$2a$10$G1Nh1ahw6U7N0x6YIwlm8.0lVrXxx6J0pN3G1wYiez5s8D7aV5hS2',
  },
  {
    id: 'student-1',
    name: 'Aarav Sharma',
    email: 'student@myattendo.local',
    role: 'student',
    passwordHash: '$2a$10$eVd8NlcVfG1jaTS8lXJqqOjL2o2n.ZS/2h1LwJZ0tGHYxV1c3i.Wi',
  },
] as const;

router.post('/login', async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const isValid = await comparePassword(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  req.session.user = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  req.session.regenerate((error) => {
    if (error) {
      return res.status(500).json({ message: 'Unable to initialize session.' });
    }

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ message: 'Unable to end session.' });
    }

    return res.clearCookie('connect.sid').status(200).json({ message: 'Logged out successfully.' });
  });
});

router.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }

  return res.json({ user: req.session.user });
});

export default router;
