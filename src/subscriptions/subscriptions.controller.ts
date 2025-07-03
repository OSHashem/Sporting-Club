import { Controller, Post, Delete, Param, Body, Get } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
    constructor(private readonly subscriptionsService: SubscriptionsService) {}
    
    @Post()
      create(@Body('memberId') memberId: number,
            @Body('sportId') sportId: number,
            @Body('type') type: 'group' | 'private') {
        return this.subscriptionsService.subscribe(memberId,sportId,type);
      }
      
      @Delete(':id')
      remove(@Param('id') id: string) {
        return this.subscriptionsService.unsubscribe(+id);
      }
    
      @Get()
      findAll() {
        return this.subscriptionsService.findAll();
      }
    
      @Get(':id')
      findOne(@Param('id') id: string) {
        return this.subscriptionsService.findOne(+id);
      }
}
