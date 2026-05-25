import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NonceRequestDto, VerifyZkLoginDto } from './dto/verify-zklogin.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('nonce')
  async nonce(@Body() dto: NonceRequestDto) {
    return this.auth.getNonce(dto);
  }

  @Post('verify')
  async verify(@Body() dto: VerifyZkLoginDto) {
    return this.auth.verifyZkLogin(dto);
  }
}
