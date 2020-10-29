import DB from './db.ts';
import * as bcrypt from 'https://deno.land/x/bcrypt/mod.ts';

interface User {
   email: string;
   password: string;
}

class UserClass {
   constructor() {}
   userCollection = DB.collection('users');

   register = async (inputUserDetails: User) => {
      const email = inputUserDetails.email;
      const password = inputUserDetails.password;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const register = await this.userCollection.insertOne({
         email: email,
         password: hashPassword
      });
      return console.log('User has been created');
   };
}

export default UserClass;
