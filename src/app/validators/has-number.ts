import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';

@ValidatorConstraint({ name: 'hasNumber', async: false })
class HasUppercaseConstraint implements ValidatorConstraintInterface {
    
  validate(value: string, _args: ValidationArguments) {

    const ragex = /[0-9]/;
    
    return ragex.test(value);

  }

  defaultMessage() {
    
    return 'O valor deve conter pelo menos uma número';

  }
}

export function HasNumber(validationOptions?: ValidationOptions){

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