import { Router } from 'https://deno.land/x/oak/mod.ts';
import {
   getUsers,
   register,
   login,
   getUserById,
   deleteUser
} from '../controllers/users.ts';

const router = new Router({ prefix: '/api/user' });

router
   .get('/', getUsers)
   .post('/register', register)
   .post('/login', login)
   .get('/:userId', getUserById)
   .delete('/delete/:userId', deleteUser);
// .put('/update/:userId', updateUser)

export default router;
