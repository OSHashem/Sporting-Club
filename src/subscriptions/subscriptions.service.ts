import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
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

  // Member Subscribe to a Sport
  async subscribe(
    memberId: number,
    sportId: number,
    type: 'group' | 'private',
  ) {
    const member = await this.memberRepo.findOne({ where: { id: memberId } });
    const sport = await this.sportRepo.findOne({ where: { id: sportId } });

    // Checks if either no member or sport with such with Id is found
    if (!member || !sport) {
      throw new NotFoundException('Member or Sport not found');
    }

    // Check for existing subscription
    const existing = await this.subscriptionRepo.findOne({
      where: { member: { id: memberId }, sport: { id: sportId } },
    });

    if (existing) {
      throw new ConflictException('Member already subscribed to this sport');
    }

    const subscription = this.subscriptionRepo.create({ member, sport, type });
    const savedSubscription = await this.subscriptionRepo.save(subscription);
    return { savedSubscription, msg: 'Subscription created successfully' };
  }

  // Member unsub from sport
  async unsubscribe(subscriptionId: number) {
    const found = await this.subscriptionRepo.findOne({
      where: { id: subscriptionId },
    });
    if (!found) {
      throw new NotFoundException('Subscription not found');
    }

    await this.subscriptionRepo.remove(found);
    return { found, msg: 'Unsubscribed successfully' };
  }

  // Added both to aid in testing
  async findAll() {
    const subs = await this.subscriptionRepo.find();
    return { subs, msg: 'All subscriptions fetched successfully' };
  }

  async findOne(id: number) {
    const sub = await this.subscriptionRepo.findOne({ where: { id } });
    return { sub, msg: sub ? 'Subscription found' : 'Subscription not found' };
  }
}
