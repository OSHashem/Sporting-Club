import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sport } from './entities/sport.entity';

@Injectable()
export class SportsService {
    
    constructor(
        @InjectRepository(Sport)
        private sportRepo: Repository<Sport>,
    ) {}

    create(sport: Partial<Sport>){
        const newSport = this.sportRepo.create(sport)
        return this.sportRepo.save(newSport);
    }

    findAll(){
        return this.sportRepo.find();
    }

    findOne(id: number){
        return this.sportRepo.findOne({where: {id}});
    }

    async update (id: number, updatedData: Partial<Sport>){
        await this.sportRepo.update(id,updatedData);
        return this.findOne(id);
    }

    async remove (id:number){
        const sport = await this.findOne(id);
        if(!sport)
            return null;
        await this.sportRepo.delete(id);
        return sport;
    }


}
