import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Subscription])],
  controllers: [MembersController],
  providers: [MembersService]
})
export class MembersModule {}
