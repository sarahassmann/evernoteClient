import {Image} from "./image";
export {Image} from "./image";
import {Kwmnote} from "./kwmnote";
export {Kwmnote} from "./kwmnote";
import {Kwmtag} from "./kwmtag";
export {Kwmtag} from "./kwmtag";
import {User} from "./user";
export {User} from "./user";

// Define the Kwmtodo class to represent a to-do item.
export class Kwmtodo {constructor(
  // A unique identifier for the to-do.
  public id:number,
  // ID of the list this to-do belongs to.
  public kwmlists_id:number,
  // ID of the note this to-do is associated with.
  public kwmnotes_id:number,
  // The name of the to-do.
  public todoName:string,
  // A description for the to-do.
  public todoDescription:string,
  public created_at:Date,
  public updated_at:Date,
  public due_date:Date,
) {}
}
