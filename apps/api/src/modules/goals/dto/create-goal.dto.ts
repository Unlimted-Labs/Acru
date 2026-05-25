import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, IsDateString, Min, Max } from 'class-validator';

export class CreateGoalDto {
  @IsString() @IsNotEmpty() name!: string;
  @IsString() @IsOptional() notes?: string;
  @IsString() @IsNotEmpty() targetAmount!: string;
  @IsNumber() @Min(0) @Max(1) assetType!: number;
  @IsDateString() deadline!: string;
  @IsBoolean() autoSaveEnabled!: boolean;
  @IsString() @IsOptional() autoSaveAmount?: string;
  @IsNumber() @IsOptional() autoSaveIntervalEpochs?: number;
  @IsBoolean() growModeEnabled!: boolean;
  @IsNumber() @Min(0) @Max(10000) @IsOptional() growModeAllocationBps?: number;
}

export class DepositDto {
  @IsString() @IsNotEmpty() amount!: string;
  @IsNumber() @Min(0) @Max(1) assetType!: number;
}

export class WithdrawDto {
  @IsString() @IsNotEmpty() amount!: string;
  @IsNumber() @Min(0) @Max(1) assetType!: number;
}

export class UpdateAutoSaveDto {
  @IsBoolean() autoSaveEnabled!: boolean;
  @IsString() @IsOptional() autoSaveAmount?: string;
  @IsNumber() @IsOptional() autoSaveIntervalEpochs?: number;
}

export class UpdateGrowModeDto {
  @IsBoolean() growModeEnabled!: boolean;
  @IsNumber() @Min(0) @Max(10000) @IsOptional() growModeAllocationBps?: number;
}
