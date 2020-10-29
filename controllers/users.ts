import User from '../models/user.ts';

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
