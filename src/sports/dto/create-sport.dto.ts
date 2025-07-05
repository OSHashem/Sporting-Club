import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class createSportDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsEnum(['male', 'female', 'mix'], {
    message: 'allowed Gender must be one of: male, female, mix',
  })
  allowedGender: 'male' | 'female' | 'mix';
}
