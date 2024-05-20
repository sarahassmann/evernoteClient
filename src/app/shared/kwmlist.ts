import {Image} from "./image";
export {Image} from "./image";
import {Kwmtodo} from "./kwmtodo";
export {Kwmtodo} from "./kwmtodo";
import {Kwmnote} from "./kwmnote";
export {Kwmnote} from "./kwmnote";
import {Kwmtag} from "./kwmtag";
export {Kwmtag} from "./kwmtag";
import {User} from "./user";
export {User} from "./user";

// Define the Kwmlist class with a constructor initializing various properties.
export class Kwmlist {constructor(
  // Unique identifier for the list
  public id:number,
  // Name of the list
  public listName:string,
  // user_id of the user who created the list
  public user_id:number,
  // created_at date of the list
  public created_at:Date,
  // updated_at date of the list
  public updated_at:Date) {}
}
