import { PartialType } from '@nestjs/mapped-types';
import { createSportDto } from './create-sport.dto';

export class UpdateSportDto extends PartialType(createSportDto) {}