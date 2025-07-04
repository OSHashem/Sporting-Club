import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';

@Injectable()
export class MembersService {
    constructor(
        @InjectRepository(Member)
        private memberRepo: Repository<Member>,
    ) {}
    

    async create(member: Partial<Member>){
        const newMember = this.memberRepo.create(member);
        const savedMember = await this.memberRepo.save(newMember);
        return { savedMember, msg: 'Member created successfully' };
    }

    // Not required but added it to aid while testing

    async findAll(){
        const members = await this.memberRepo.find();
        return { members, msg: 'All members fetched successfully' };
    }


    async findOne(id: number){
        const member = await this.memberRepo.findOne({where:{id}});
        return { member, msg: member ? 'Member found' : 'Member not found' };
    }


    async update(id: number, updated: Partial<Member>){
        await this.memberRepo.update(id,updated);
        const updatedMember = await this.memberRepo.findOne({where:{id}});
        return { updatedMember, msg: updatedMember ? 'Member updated successfully' : 'Member not found' };
    }


    async remove(id:number){
        const member = await this.memberRepo.findOne({where:{id}});
        if(!member)
            return { data: null, msg: 'Member not found' };
        await this.memberRepo.delete(id);
        return { member, msg: 'Member deleted successfully' };
    }

    // Added it to aid while testing
    async findFamilyMembers(id: number){
        const member = await this.memberRepo.findOne({where: {id}, relations: ['familyMembers']});
        if (!member){
            return { familyMembers: [], msg: 'Member not found' };
        }
        return { familyMembers: member.familyMembers || [], msg: 'Family members fetched successfully' };
    }
}
