import { IsString, IsNotEmpty } from 'class-validator';

export class VerifyZkLoginDto {
  @IsString() @IsNotEmpty() jwt!: string;
  @IsString() @IsNotEmpty() walletAddress!: string;
  @IsString() @IsNotEmpty() ephemeralPublicKey!: string;
  @IsNotEmpty() zkProof!: Record<string, unknown>;
}

export class NonceRequestDto {
  @IsString() @IsNotEmpty() ephemeralPublicKey!: string;
  @IsNotEmpty() maxEpoch!: number;
}
