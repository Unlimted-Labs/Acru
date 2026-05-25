import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../common/guards/auth.guard';
import { GrowModeService } from './grow-mode.service';

@Controller('v1/grow')
@UseGuards(AuthGuard)
export class GrowModeController {
  constructor(private readonly grow: GrowModeService) {}

  @Get('options')
  getOptions() {
    return this.grow.getOptions();
  }

  @Post('allocate')
  allocate(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: { goalId: string; protocol: string; amount: string },
  ) {
    return this.grow.allocate(user.userId, body.goalId, body.protocol, body.amount);
  }

  @Post('withdraw')
  withdraw(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: { goalId: string; protocol: string },
  ) {
    return this.grow.withdrawFromProtocol(user.userId, body.goalId, body.protocol);
  }
}
