import { Router } from 'https://deno.land/x/oak/mod.ts';
import { getUsers, register, login } from '../controllers/users.ts';

const router = new Router({ prefix: '/api/user' });

router.get('/', getUsers).post('/register', register).post('/login', login);

export default router;
