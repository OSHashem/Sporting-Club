import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { Member } from './entities/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  // Create a new member with input validation
  create(@Body() createdDto: CreateMemberDto) {
    return this.membersService.create(createdDto);
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
  // Update a member by ID with input validation
  update(@Param('id') id: string, @Body() updatedDto: UpdateMemberDto) {
    return this.membersService.update(+id, updatedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }

  @Get(':id/family')
  getFamily(@Param('id') id: string) {
    return this.membersService.findFamilyMembers(+id);
  }

  @Patch('/:childId/link/:mainId')
  async linkFamily(
    @Param('childId') childId: string,
    @Param('mainId') mainId: string,
  ) {
    return this.membersService.linkFamilyMember(+childId, +mainId);
  }
}
