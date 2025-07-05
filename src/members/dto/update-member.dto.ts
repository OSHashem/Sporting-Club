import { IsString, IsDateString, IsIn, IsOptional } from 'class-validator';
export class UpdateMemberDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsIn(['male', 'female'])
  gender?: 'male' | 'female';

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @IsOptional()
  @IsDateString()
  subscriptionDate?: string;

  @IsOptional()
  mainMemberId?: number;
}
