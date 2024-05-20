import {Image} from "./image";
export {Image} from "./image";
import {Kwmtodo} from "./kwmtodo";
export {Kwmtodo} from "./kwmtodo";
import {Kwmnote} from "./kwmnote";
export {Kwmnote} from "./kwmnote";
import {User} from "./user";
export {User} from "./user";

// Define a new class called Kwmtag to represent a tag associated with items like notes or tasks.
export class Kwmtag {constructor(
  // A unique identifier for the tag.
  public id:number,
  // The name of the tag.
  public tagName:string,
  public created_at:Date,
  public updated_at:Date) {}
}
