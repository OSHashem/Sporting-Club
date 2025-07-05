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

  // Create New Sport
  async create(sport: Partial<Sport>) {
    const newSport = this.sportRepo.create(sport);
    const savedSport = await this.sportRepo.save(newSport);
    return { savedSport, msg: 'Sport created successfully' };
  }

  //   Find All Sports
  async findAll() {
    const sports = await this.sportRepo.find();
    return { sports, msg: 'All sports fetched successfully' };
  }

  //   Find Sport By Id
  async findOne(id: number) {
    const sport = await this.sportRepo.findOne({ where: { id } });
    return { sport, msg: sport ? 'Sport found' : 'Sport not found' };
  }

  // Update Sport By Id
  async update(id: number, updatedData: Partial<Sport>) {
    await this.sportRepo.update(id, updatedData);
    const updatedSport = await this.sportRepo.findOne({ where: { id } });
    return {
      updatedSport,
      msg: updatedSport ? 'Sport updated successfully' : 'Sport not found',
    };
  }

  //   Remove Sport By Id
  async remove(id: number) {
    const sport = await this.sportRepo.findOne({ where: { id } });
    if (!sport) return { sport: null, msg: 'Sport not found' };
    await this.sportRepo.delete(id);
    return { sport, msg: 'Sport deleted successfully' };
  }
}
