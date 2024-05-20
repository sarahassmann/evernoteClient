import {Image} from "./image";
export {Image} from "./image";
import {Kwmtodo} from "./kwmtodo";
export {Kwmtodo} from "./kwmtodo";
import {Kwmtag} from "./kwmtag";
export {Kwmtag} from "./kwmtag";
import {User} from "./user";
export {User} from "./user";

// Define the Kwmnote class with specific properties.
export class Kwmnote {constructor(
  // Unique identifier for the note
  public id:number,
  // ID linking the note to a specific list
  public kwmlists_id: number,
  // Title of the note
  public noteTitle:string,
  // Description or content of the note
  public noteDescription:string,
  // Date when the note was created
  public created_at:Date,
  // Date when the note was last updated
  public updated_at:Date,
  ) {}
}
