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
    
    create (member: Partial<Member>){
        const newMember = this.memberRepo.create(member);
        return this.memberRepo.save(newMember);
    }

    // Not required but added it to aid while testing
    findAll(){
        return this.memberRepo.find();
    }

    findOne(id: number){
        return this.memberRepo.findOne({where:{id}});
    }

    async update(id: number, updated: Partial<Member>){
        await this.memberRepo.update(id,updated);
        return this.findOne(id);
    }

    async remove(id:number){
        const member = await this.findOne(id);
        if(!member)
            return null;
        await this.memberRepo.delete(id);
        return member;
    }

    // Added it to aid while testing
    async findFamilyMembers(id: number){
        const member = await this.memberRepo.findOne({where: {id},
        relations: ['familyMembers']
    });

    if (!member){
        throw new NotFoundException('Member Not Found');
    }

    return member.familyMembers || [];
    }
}
