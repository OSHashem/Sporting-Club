import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sport } from './entities/sport.entity';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class SportsService {
  constructor(
    @InjectRepository(Sport)
    private sportRepo: Repository<Sport>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // Create New Sport
  async create(sport: Partial<Sport>) {
    const newSport = this.sportRepo.create(sport);
    const savedSport = await this.sportRepo.save(newSport);
    await this.cacheManager.del('all_sports'); // clear cache
    return { savedSport, msg: 'Sport created successfully' };
  }

  //   Find All Sports
  async findAll() {
    const cacheKey = 'all_sports';

    // Try to get from cache
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return { sports: cached, msg: 'All sports fetched from cache' };
    }

    // If not in cache, fetch from DB and cache it
    const sports = await this.sportRepo.find();
    await this.cacheManager.set(cacheKey, sports, 300_000); // cache for 5 minutes since Sports data doesn’t change often (new sports are rarely added or removed).
    // Users get fast responses with minimal delay.
    return { sports, msg: 'All sports fetched from database' };
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
    await this.cacheManager.del('all_sports'); // clear cache
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
    await this.cacheManager.del('all_sports'); // clear cache
    return { sport, msg: 'Sport deleted successfully' };
  }
}
