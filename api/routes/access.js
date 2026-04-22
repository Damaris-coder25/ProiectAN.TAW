import { Router } from 'express';

const router = Router();

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === 'admin' && password === 'admin') {
        res.send('Login successful');
  } else {
        res.send('Login failed');
  }

})

export default router;