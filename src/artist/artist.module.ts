import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist/artist.service';
import { ArtistEntity } from '../entities/artist.entity';
import { TrackEntity } from '../entities/track.entity';
import { AlbumEntity } from '../entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity, TrackEntity, AlbumEntity])],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
