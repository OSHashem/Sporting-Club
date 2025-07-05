import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private memberRepo: Repository<Member>,

    @InjectRepository(Subscription)
    private subscriptionRepo: Repository<Subscription>,
  ) {}

  // Create a new member
  async create(member: Partial<Member>) {
    // assign today’s date if it's not already given
    if (!member.subscriptionDate) {
      member.subscriptionDate = new Date().toISOString().split('T')[0]; // format: YYYY-MM-DD
    }

    const newMember = this.memberRepo.create(member);
    const savedMember = await this.memberRepo.save(newMember);
    return { savedMember, msg: 'Member created successfully' };
  }

  // Not required but added to aid while testing
  async findAll() {
    const members = await this.memberRepo.find();
    return { members, msg: 'All members fetched successfully' };
  }

  // Find a member by ID
  async findOne(id: number) {
    const member = await this.memberRepo.findOne({
      where: { id },
      relations: ['familyMembers', 'mainMember'],
    });
    return { member, msg: member ? 'Member found' : 'Member not found' };
  }

  // Update a member by ID
  async update(id: number, updated: Partial<Member>) {
    await this.memberRepo.update(id, updated);
    const updatedMember = await this.memberRepo.findOne({ where: { id } });
    return {
      updatedMember,
      msg: updatedMember ? 'Member updated successfully' : 'Member not found',
    };
  }

  // Remove a member by ID
  // Note: If a member is deleted, all their family members will have their mainMember set to null
  // to ensure that the family relationship is maintained without breaking the database integrity.
  async remove(id: number) {
    const member = await this.memberRepo.findOne({
      where: { id },
      relations: ['familyMembers'],
    });

    // Check if the member does not exist
    if (!member) return { data: null, msg: 'Member not found' };

    // Delete all subscriptions of the member that will be deleted
    await this.subscriptionRepo.delete({ member: { id } });

    await this.memberRepo.delete(id);
    return { member, msg: 'Member deleted successfully' };
  }

  // Not required but added to aid while testing
  async findFamilyMembers(id: number) {
    const member = await this.memberRepo.findOne({
      where: { id },
      relations: ['familyMembers'],
    });

    // Check if the member does not exists
    if (!member) {
      return { familyMembers: [], msg: 'Member not found' };
    }

    return {
      familyMembers: member.familyMembers || [],
      msg: 'Family members fetched successfully',
    };
  }

  // As per the requirement, Members may also have family members linked to them, and each family member can be associated with only one central member.
  // I will Use a dedicated endpoint to link a family member to a main member after both are created
  async linkFamilyMember(childId: number, mainId: number) {
    const child = await this.memberRepo.findOne({ where: { id: childId } });
    const main = await this.memberRepo.findOne({ where: { id: mainId } });

    // Check if either child or main members does not exist
    if (!child || !main) {
      throw new NotFoundException('Main or child member not found');
    }

    // Check if the child already has a main member linked
    if (child.mainMember) {
      throw new BadRequestException(
        'This member is already linked to a main member.',
      );
    }

    // Prevent circular linking
    if (child.id === main.id) {
      throw new Error('A member cannot be their own family member');
    }

    child.mainMember = main;
    const saved = await this.memberRepo.save(child);

    return {
      member: saved,
      msg: `Member ${child.firstName} is now linked to ${main.firstName}`,
    };
  }
}
