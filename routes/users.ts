import { Router } from 'https://deno.land/x/oak/mod.ts';
import { getUsers, register } from '../controllers/users.ts';

const router = new Router({ prefix: '/api/user' });

router.get('/', getUsers).post('/register', register);

export default router;
