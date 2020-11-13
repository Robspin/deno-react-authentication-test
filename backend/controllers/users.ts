import { create } from 'https://deno.land/x/djwt@v1.9/mod.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';

import User from '../models/user.ts';

const { JWT_KEY } = config({ safe: true });

const UserClass = new User();

export const getUsers = async ({ response }: { response: any }) => {
   const users = await UserClass.getAllUsers();
   response.body = users;
};

export const register = async ({
   request,
   response
}: {
   request: any;
   response: any;
}) => {
   const requestBody = await request.body({
      contentTypes: {
         text: ['application/ld+json']
      }
   });

   const users = await requestBody.value;
   const name = users.name;
   const email = users.email;
   const password = users.password;
   if (await UserClass.userCollection.findOne({ email: users.email })) {
      response.status = 500;
      response.body = 'User already exists!';
      console.log('User already exists!');
   } else {
      UserClass.register({
         name: name,
         email: email,
         password: password
      });
      response.body = users;
   }
};

export const login = async ({
   request,
   response
}: {
   request: any;
   response: any;
}) => {
   const requestBody = await request.body({
      contentTypes: {
         text: ['application/ld+json']
      }
   });
   const users = await requestBody.value;
   const email = users.email;
   const password = users.password;
   const login = await UserClass.login({
      email: email,
      password: password
   });
   if (login === null) {
      console.log('Invalid userinfo entered');
      response.status = 404;
      response.body = 'Entered value input is wrong';
   } else {
      const key = `${JWT_KEY}`;
      const payload = {
         email: email,
         exp: new Date().getTime() + 6000
      };
      // const header = { alg: 'HS256', typ: 'JWT' };
      const token = await create({ alg: 'HS256', typ: 'JWT' }, payload, key);
      response.status = 200;
      response.body = {
         _id: login._id.$oid,
         name: login.name,
         email: email,
         isAdmin: login.isAdmin,
         token: token
      };
   }
};

export const getUserById = async ({
   request,
   response,
   params
}: {
   request: any;
   response: any;
   params: any;
}) => {
   const userId = await params.userId;
   const user = await UserClass.getSingleUser(userId);
   if (user) {
      response.body = user;
   } else {
      response.status = 404;
      response.body = 'User not found';
   }
};

// // Unsafe to implement like this
// export const updateUser = async ({
//    request,
//    response,
//    params
// }: {
//    request: any;
//    response: any;
//    params: any;
// }) => {
//    const userId = await params.userId;
//    const requestBody = await request.body({
//       contentTypes: {
//          text: ['application/ld+json']
//       }
//    });
//    const users = await requestBody.value;
//    const updateUser = await UserClass.updateUser(userId, users);
//    if (updateUser === true) {
//       response.status = 200;
//       response.body = {
//          msg: 'User has been updated'
//       };
//    } else {
//       response.status = 404;
//       response.body = {
//          msg: 'User not found'
//       };
//    }
// };

export const deleteUser = async ({
   request,
   response,
   params
}: {
   request: any;
   response: any;
   params: any;
}) => {
   const userId = await params.userId;
   const deleteUser = await UserClass.deleteUser(userId);
   if (deleteUser === true) {
      response.status = 200;
      response.body = {
         msg: 'User has been deleted'
      };
   } else {
      response.status = 404;
      response.body = {
         msg: 'User not found'
      };
   }
};
