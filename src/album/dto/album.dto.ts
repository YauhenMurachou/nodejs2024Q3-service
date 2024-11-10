import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  year: number;

  @IsString()
  @IsOptional()
  artistId;
}

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  year: number;

  @IsString()
  @IsOptional()
  artistId;
}
