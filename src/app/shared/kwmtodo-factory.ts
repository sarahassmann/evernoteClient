import {Kwmtodo} from './kwmtodo';
import {Kwmnote} from './kwmnote';
import {Kwmlist} from "./kwmlist";

// Defines a factory class for creating Kwmtodo instances.
export class KwmtodoFactory {
  // Creates a Kwmtodo object with preset default values.
  static empty(): Kwmtodo {
    return new Kwmtodo(1,
      1,
      1,
      'KWM-Todo 1',
      'KWM-Todo-Description 1',
      new Date(),
      new Date(),
      new Date());
  }

  // Creates a Kwmtodo object from a raw data object
  static fromObject(rawKwmtodo: any): Kwmtodo {
    return new Kwmtodo(
      rawKwmtodo.id,
      rawKwmtodo.kwmlists_id,
      rawKwmtodo.kwmnotes_id,
      rawKwmtodo.todoName,
      rawKwmtodo.todoDescription,
      typeof(rawKwmtodo.created_at) === 'string' ?
        new Date(rawKwmtodo.created_at) : rawKwmtodo.created_at,
      typeof(rawKwmtodo.updated_at) === 'string' ?
        new Date(rawKwmtodo.updated_at) : rawKwmtodo.updated_at,
      typeof(rawKwmtodo.due_date) === 'string' ?
        new Date(rawKwmtodo.due_date) : rawKwmtodo.due_Date
    );
  }
}
