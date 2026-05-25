import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../common/guards/auth.guard';
import { AIService } from './ai.service';

@Controller('v1/ai')
@UseGuards(AuthGuard)
export class AIController {
  constructor(private readonly ai: AIService) {}

  @Get('recommendations')
  getRecommendations(@CurrentUser() user: AuthenticatedUser) {
    return this.ai.getRecommendations(user.userId);
  }

  @Post('recommendations/:id/action')
  actionRecommendation(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() body: { approved: boolean },
  ) {
    return this.ai.actionRecommendation(user.userId, id, body.approved);
  }
}
