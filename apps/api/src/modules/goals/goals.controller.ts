import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../common/guards/auth.guard';
import { GoalsService } from './goals.service';
import { CreateGoalDto, DepositDto, WithdrawDto, UpdateAutoSaveDto, UpdateGrowModeDto } from './dto/create-goal.dto';

@Controller('v1/goals')
@UseGuards(AuthGuard)
export class GoalsController {
  constructor(private readonly goals: GoalsService) {}

  @Get()
  findAll(@CurrentUser() user: AuthenticatedUser) {
    return this.goals.findAll(user.userId);
  }

  @Get(':goalId')
  findOne(@CurrentUser() user: AuthenticatedUser, @Param('goalId') goalId: string) {
    return this.goals.findOne(user.userId, goalId);
  }

  @Post()
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateGoalDto) {
    return this.goals.create(user.userId, user.sub, dto);
  }

  @Post(':goalId/deposit')
  deposit(@CurrentUser() user: AuthenticatedUser, @Param('goalId') goalId: string, @Body() dto: DepositDto) {
    return this.goals.deposit(user.userId, goalId, dto);
  }

  @Post(':goalId/withdraw')
  withdraw(@CurrentUser() user: AuthenticatedUser, @Param('goalId') goalId: string, @Body() dto: WithdrawDto) {
    return this.goals.withdraw(user.userId, goalId, dto);
  }

  @Patch(':goalId/auto-save')
  updateAutoSave(@CurrentUser() user: AuthenticatedUser, @Param('goalId') goalId: string, @Body() dto: UpdateAutoSaveDto) {
    return this.goals.updateAutoSave(user.userId, goalId, dto);
  }

  @Patch(':goalId/grow-mode')
  updateGrowMode(@CurrentUser() user: AuthenticatedUser, @Param('goalId') goalId: string, @Body() dto: UpdateGrowModeDto) {
    return this.goals.updateGrowMode(user.userId, goalId, dto);
  }
}
