import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';

@ValidatorConstraint({ name: 'hasUppercase', async: false })
class HasUppercaseConstraint implements ValidatorConstraintInterface {
    
  validate(value: string, _args: ValidationArguments) {

    return /[A-Z]/.test(value);

  }

  defaultMessage() {
    
    return 'O valor deve conter pelo menos uma letra maiúscula';

  }
}

export function HasUpperCase(validationOptions?: ValidationOptions){

  return function (object: Object, propertyName: string){

    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: HasUppercaseConstraint,
    });

  };
}