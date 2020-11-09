import { Router } from 'https://deno.land/x/oak/mod.ts';
import {
   getUsers,
   register,
   login,
   updateUser,
   getUserById,
   deleteUser
} from '../controllers/users.ts';

const router = new Router({ prefix: '/api/user' });

router
   .get('/', getUsers)
   .post('/register', register)
   .post('/login', login)
   .get('/:userId', getUserById)
   .put('/update/:userId', updateUser)
   .delete('/delete/:userId', deleteUser);

export default router;
