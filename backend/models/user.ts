import DB from './db.ts';
import * as bcrypt from 'https://deno.land/x/bcrypt/mod.ts';

interface User {
   userName?: string;
   email: string;
   password: string;
   isAdmin?: boolean;
}

class UserClass {
   constructor() {}
   userCollection = DB.collection('users');

   getAllUsers = async () => {
      const users = await this.userCollection.find({});
      return users;
   };

   register = async (inputUserDetails: User) => {
      const userName = inputUserDetails.userName;
      const email = inputUserDetails.email;
      const password = inputUserDetails.password;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const register = await this.userCollection.insertOne({
         userName: userName,
         email: email,
         password: hashPassword,
         registeredAt: new Date(),
         isAdmin: false
      });
      return console.log('User has been created');
   };

   login = async (inputUserDetails: User) => {
      const user: any = await this.userCollection.findOne({
         email: inputUserDetails.email
      });
      if (!user) {
         console.log('Not a registered user');
         return null;
      }
      const passwordConfirmation = await bcrypt.compare(
         inputUserDetails.password,
         user.password
      );
      if (passwordConfirmation) {
         return user;
      } else {
         return null;
      }
   };

   updateUser = async (userId: string, changeData: User) => {
      const {
         matchedCount,
         modifiedCount,
         upsertedId
      } = await this.userCollection.updateOne(
         { _id: { $oid: userId } },
         { $set: changeData }
      );
      if (matchedCount !== 0) {
         return true;
      } else {
         return false;
      }
   };

   deleteUser = async (userId: string) => {
      const isUserDeleted = await this.userCollection.deleteOne({
         _id: { $oid: userId }
      });
      if (isUserDeleted) {
         return true;
      } else {
         return false;
      }
   };
}

export default UserClass;