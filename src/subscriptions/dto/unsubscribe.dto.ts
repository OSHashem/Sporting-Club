import { IsInt, Min } from 'class-validator';

export class UnsubscribeDto {
  @IsInt()
  @Min(1)
  subscriptionId: number;
}