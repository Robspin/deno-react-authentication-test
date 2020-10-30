import { create } from 'https://deno.land/x/djwt@v1.9/mod.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';

import User from '../models/user.ts';

const { JWT_KEY } = config({ safe: true });

const UserClass = new User();

export const getUsers = ({ response }: { response: any }) => {
   response.body = 'All users';
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
   const email = users.email;
   const password = users.password;
   UserClass.register({ email: email, password: password });
   response.body = 'User has been Created';
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
   const users = requestBody.value;
   const email = users.email;
   const password = users.password;
   console.log(email, password);
   const login = await UserClass.login({ email: email, password: password });
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
         msg: 'Hello user',
         email: email,
         token: token
      };
   }
};
