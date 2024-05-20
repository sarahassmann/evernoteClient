import {Image} from "./image";
export {Image} from "./image";
import {Kwmtodo} from "./kwmtodo";
export {Kwmtodo} from "./kwmtodo";
import {Kwmnote} from "./kwmnote";
export {Kwmnote} from "./kwmnote";
import {Kwmtag} from "./kwmtag";
export {Kwmtag} from "./kwmtag";

// Define a class named User to represent user information in the application.
export class User {constructor(
  // A unique identifier for the user.
  public id:number,
  // User's name.
  public name:string,
  // User's email address.
  public email:string,
  // Timestamp for when the user's email was verified.
  public emailVerifiedAt:string,
  // User's password (usually stored in a hashed format).
  public password:string,
  // Token used to remember the user on future visits without needing to log in again.
  public rememberToke:string,
  public created_at:Date,
  public updated_at:Date,
  public firstName:string,
  public lastName:string,
  public profilePicture:string) {}
}
