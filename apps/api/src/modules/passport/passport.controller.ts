import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../common/guards/auth.guard';
import { PassportService } from './passport.service';

@Controller('v1/passport')
@UseGuards(AuthGuard)
export class PassportController {
  constructor(private readonly passport: PassportService) {}

  @Get()
  getPassport(@CurrentUser() user: AuthenticatedUser) {
    return this.passport.getPassport(user.userId);
  }

  @Post('snapshot')
  generateSnapshot(@CurrentUser() user: AuthenticatedUser) {
    return this.passport.generateSnapshot(user.userId);
  }
}
