import { IsEnum, IsInt, Min } from 'class-validator';

export class SubscribeDto {
  @IsInt()
  @Min(1)
  memberId: number;

  @IsInt()
  @Min(1)
  sportId: number;

  @IsEnum(['group', 'private'], {
    message: 'type must be one of the following values: group, private',
  })
  type: 'group' | 'private';
}
