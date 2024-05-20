
// Defines a class to represent error messages for form validation
export class ErrorMessage {
  constructor(
    // Name of the form control the error message is associated with
    public forControl: string,
    // Type of validator that triggered the error (e.g., 'required')
    public forValidator: string,
    // The actual error message to be displayed
    public text: string,
  ) {}
}
// Array of ErrorMessage objects for a form, specifying custom messages for different validation errors
export const KwmnoteFormErrorMessages = [
  // Error message for the 'noteTitle' field if it is left empty
  new ErrorMessage('noteTitle', 'required', 'Ein Titel muss angegeben werden'),
  // Error message for the 'noteDescription' field if it is left empty
  new ErrorMessage('noteDescription', 'required', 'Eine Beschreibung muss angegeben werden'),
  // Error message for the 'noteDescription' field if it is too short
  new ErrorMessage('noteDescription', 'minlength', 'Die Beschreibung muss mindestens 5 Zeichen enthalten'),
  // Error message for the 'noteDescription' field if it is too long
  new ErrorMessage('noteDescription', 'maxlength', 'Die Beschreibung darf höchstens 40 Zeichen enthalten'),
]
