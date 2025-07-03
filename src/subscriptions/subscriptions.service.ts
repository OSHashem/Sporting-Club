import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { Member } from 'src/members/entities/member.entity';
import { Sport } from 'src/sports/entities/sport.entity';

@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectRepository(Subscription)
        private readonly subscriptionRepo: Repository<Subscription>,
        
        @InjectRepository(Member)
        private readonly memberRepo: Repository<Member>,
        
        @InjectRepository(Sport)
        private readonly sportRepo: Repository<Sport>,
  ) {}

  async subscribe(memberId: number, sportId: number, type: 'group' | 'private'){
    const member = await this.memberRepo.findOne({where: {id:memberId}});
    const sport = await this.sportRepo.findOne({where: {id:sportId}});

    if (!member || !sport) {
      throw new NotFoundException('Member or Sport not found');
    }

    // Check for existing subscription
    const existing = await this.subscriptionRepo.findOne({
      where: { member: { id: memberId }, sport: { id: sportId }},
    });

    if (existing) {
      throw new ConflictException('Member already subscribed to this sport');
    }

    const subscription = this.subscriptionRepo.create({member, sport, type,});
    return this.subscriptionRepo.save(subscription);
  }

  async unsubscribe(subscriptionId: number){
    const found = await this.subscriptionRepo.findOne({where: {id: subscriptionId}});
     if(!found){
        throw new NotFoundException('Subscription not found');
     }

     await this.subscriptionRepo.remove(found);
     return {message: 'Unsubscribed successfully'};

  }

  // Added both to aid while in testing
  findAll(){
    return this.subscriptionRepo.find();
  }

  findOne(id:number){
    return this.subscriptionRepo.findOne({where: {id}});
  }
}
