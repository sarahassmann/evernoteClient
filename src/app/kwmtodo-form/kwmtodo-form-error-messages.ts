// Class to encapsulate error message details for form validation.
export class ErrorMessage {
  constructor(
    public forControl: string, // The form control name the error message is associated with.
    public forValidator: string, // The name of the validator that triggered this error.
    public text: string, // The human-readable error message displayed to the user.
  ) {}
}

// Array containing specific error messages for the Kwmtodo form fields.
export const KwmtodoErrorMessages = [
  // Error message when the 'todoName' field is left empty.
  new ErrorMessage('todoName', 'required', 'Ein Titel muss angegeben werden'),
  // Error message when the 'todoName' field has fewer than 3 characters.
  new ErrorMessage('todoName', 'minlength', 'Der Titel muss mindestens 3 Zeichen enthalten'),
  // Error message when the 'todoName' field exceeds 40 characters.
  new ErrorMessage('todoName', 'maxlength', 'Der Titel darf höchstens 40 Zeichen enthalten'),
  // Error message when the 'todoDescription' field is left empty.
  new ErrorMessage('todoDescription', 'required', 'Eine Beschreibung muss angegeben werden'),
  // Error message when the 'todoDescription' field has fewer than 5 characters.
  new ErrorMessage('todoDescription', 'minlength', 'Die Beschreibung muss mindestens 5 Zeichen enthalten'),
  // Error message when the 'todoDescription' field exceeds 200 characters.
  new ErrorMessage('todoDescription', 'maxlength', 'Die Beschreibung darf höchstens 200 Zeichen enthalten'),
]
