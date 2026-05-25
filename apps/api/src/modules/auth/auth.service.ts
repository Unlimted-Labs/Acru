import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../../shared/supabase/supabase.service';
import { SuiService } from '../../shared/sui/sui.service';
import type { VerifyZkLoginDto, NonceRequestDto } from './dto/verify-zklogin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly sui: SuiService,
    private readonly jwt: JwtService,
  ) {}

  async getNonce(_dto: NonceRequestDto): Promise<{ nonce: string }> {
    // TODO: generate nonce, store in Supabase keyed to ephemeralPublicKey with 10-min TTL
    return { nonce: '' };
  }

  async verifyZkLogin(_dto: VerifyZkLoginDto): Promise<{ accessToken: string }> {
    // TODO: verify zkLogin proof via SuiClient, upsert user in Supabase, return app JWT
    return { accessToken: '' };
  }
}
