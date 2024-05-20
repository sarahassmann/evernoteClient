import {Kwmlist} from "./kwmlist";


// Defines a factory class for creating instances of Kwmlist.
export class KwmlistFactory {
  // Provides a method to create an empty Kwmlist object with default values.
  static empty(): Kwmlist {
    // Returns a new Kwmlist instance with preset default values:
    return new Kwmlist(0, 'Test-KWM-List', 1, new Date(), new Date());
  }

  // Provides a method to create a Kwmlist object from a given raw object.
  static fromObject(rawKwmlist: any): Kwmlist {
    // Returns a new Kwmlist instance created by extracting properties from rawKwmlist.
    // It checks if the created_at and updated_at fields are strings; if so, it converts them to Date objects.
    return new Kwmlist(
      rawKwmlist.id,
      rawKwmlist.listName,
      rawKwmlist.user_id,
      typeof(rawKwmlist.created_at) === 'string' ?
        new Date(rawKwmlist.created_at) : rawKwmlist.created_at,
      typeof(rawKwmlist.updated_at) === 'string' ?
        new Date(rawKwmlist.updated_at) : rawKwmlist.updated_at
    );
  }
}
