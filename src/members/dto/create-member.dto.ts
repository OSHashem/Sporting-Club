import { IsString, IsDateString, IsIn, IsOptional } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsIn(['male', 'female'])
  gender: 'male' | 'female';

  @IsDateString()
  birthDate: string;

  @IsOptional()
  @IsDateString()
  subscriptionDate?: string;

  @IsOptional()
  mainMemberId?: number;
}
