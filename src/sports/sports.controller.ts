import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { SportsService } from './sports.service';
import { Sport } from './entities/sport.entity';
import { createSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';

@Controller('sports')
export class SportsController {
    constructor(private readonly sportsService: SportsService) {}

    @Post()
    create(@Body() sport: createSportDto){
        return this.sportsService.create(sport)
    }

    @Get()
    findAll(){
        return this.sportsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.sportsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updated: UpdateSportDto){   
        return this.sportsService.update(+id,updated);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.sportsService.remove(+id);
    }

}
