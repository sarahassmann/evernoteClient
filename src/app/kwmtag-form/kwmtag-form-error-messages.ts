// Define a class to represent error messages for form fields
export class ErrorMessage {
  constructor(
    public forControl: string, // The form control the error message is related to
    public forValidator: string, // The type of validation rule that was violated (e.g., 'required')
    public text: string, // The user-friendly error message to be displayed
  ) {}
}

// Create an array of ErrorMessage objects, each representing specific validation messages for tag forms
export const KwmtagFormErrorMessages = [
  // Message for when the tag name is not provided
  new ErrorMessage('tagName', 'required', 'Ein Tag-Name muss angegeben werden'),
  // Message for when the tag name is too short
  new ErrorMessage('tagName', 'minlength', 'Der Tag-Name muss mindestens 3 Zeichen enthalten'),
  // Message for when the tag name is too long
  new ErrorMessage('tagName', 'maxlength', 'Der Tag-Name darf höchstens 40 Zeichen enthalten'),
]
