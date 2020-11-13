import DB from './db.ts';
import * as bcrypt from 'https://deno.land/x/bcrypt/mod.ts';

interface User {
   name?: string;
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

   // Also provides (encrypted) password!!
   getSingleUser = async (userId: string) => {
      const user = await this.userCollection.findOne({ _id: { $oid: userId } });
      if (user) {
         return user;
      } else {
         return false;
      }
   };

   register = async (inputUserDetails: User) => {
      console.log(inputUserDetails);
      const name = inputUserDetails.name;
      const email = inputUserDetails.email;
      const password = inputUserDetails.password;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const register = await this.userCollection.insertOne({
         name: name,
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

   // // Unsafe to implement like this
   // updateUser = async (userId: string, changeData: User) => {
   //    const {
   //       matchedCount,
   //       modifiedCount,
   //       upsertedId
   //    } = await this.userCollection.updateOne(
   //       { _id: { $oid: userId } },
   //       { $set: changeData }
   //    );
   //    if (matchedCount !== 0) {
   //       return true;
   //    } else {
   //       return false;
   //    }
   // };

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
