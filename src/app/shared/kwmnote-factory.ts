import {Kwmnote, Kwmtag} from "./kwmnote";

// Define a factory class for creating Kwmnote objects.
export class KwmnoteFactory {

  // A static method that creates a new Kwmnote object with default or placeholder values.
  static empty(): Kwmnote {
    return new Kwmnote(0,     // ID set to 0, indicating it's a placeholder
      1,              // List ID set to 1, just a sample value
      'KWM-Note 1',     // Default title for the note
      'KWM-Note 1', // Default description for the note
      new Date(),
      new Date(),
    );
  }

  // A static method that creates a Kwmnote object from a given object.
  static fromObject(rawKwmnote: any): Kwmnote {
    return new Kwmnote(
      rawKwmnote.id,
      rawKwmnote.kwmlists_id,
      rawKwmnote.noteTitle,
      rawKwmnote.noteDescription,
      typeof(rawKwmnote.created_at) === 'string' ?
        new Date(rawKwmnote.created_at) : rawKwmnote.created_at,
      typeof(rawKwmnote.updated_at) === 'string' ?
        new Date(rawKwmnote.updated_at) : rawKwmnote.updated_at
    );
  }

}
