import {Kwmtag} from "./kwmtag";

// Define a class called KwmtagFactory that contains methods to create Kwmtag instances in different ways.
export class KwmtagFactory {

  // A static method that creates a Kwmtag with default values.
  static empty(): Kwmtag {
    return new Kwmtag(0,
      'KWM-Tag 1',
      new Date(),
      new Date());
  }

  // A static method that creates a Kwmtag from a provided object (like from JSON data).
  static fromObject(rawKwmtag: any): Kwmtag {
    return new Kwmtag(
      rawKwmtag.id,
      rawKwmtag.tagName,
      typeof(rawKwmtag.created_at) === 'string' ?
        new Date(rawKwmtag.created_at) : rawKwmtag.created_at,
      typeof(rawKwmtag.updated_at) === 'string' ?
        new Date(rawKwmtag.updated_at) : rawKwmtag.updated_at
    );
  }
}
