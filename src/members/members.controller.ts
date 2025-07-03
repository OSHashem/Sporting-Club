import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { Member } from './entities/member.entity';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  create(@Body() member: Partial<Member>) {
    return this.membersService.create(member);
  }

  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updated: Partial<Member>) {
    return this.membersService.update(+id, updated);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }

  @Get(':id/family')
  getFamily(@Param('id') id: string){
    return this.membersService.findFamilyMembers(+id);
  }
}
