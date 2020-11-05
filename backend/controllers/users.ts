import { create } from 'https://deno.land/x/djwt@v1.9/mod.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';

import User from '../models/user.ts';

const { JWT_KEY } = config({ safe: true });

const UserClass = new User();

export const getUsers = async ({ response }: { response: any }) => {
   const users = await UserClass.getAllUsers();
   console.log(users);
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
   const userName = users.userName;
   const email = users.email;
   const password = users.password;
   if (await UserClass.userCollection.findOne({ email: users.email })) {
      response.status = 500;
      response.body = 'User already exists!';
      console.log('User already exists!');
   } else {
      UserClass.register({
         userName: userName,
         email: email,
         password: password
      });
      response.body = 'User has been Created';
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
         name: login.userName,
         email: email,
         token: token
      };
   }
};

export const updateUser = async ({
   request,
   response,
   params
}: {
   request: any;
   response: any;
   params: any;
}) => {
   const userId = await params.userId;
   const requestBody = await request.body({
      contentTypes: {
         text: ['application/ld+json']
      }
   });
   const users = await requestBody.value;
   const updateUser = await UserClass.updateUser(userId, users);
   if (updateUser === true) {
      response.status = 200;
      response.body = {
         msg: 'User has been updated'
      };
   } else {
      response.status = 404;
      response.body = {
         msg: 'User not found'
      };
   }
};

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
