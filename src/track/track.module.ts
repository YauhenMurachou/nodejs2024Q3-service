import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../entities/album.entity';
import { ArtistEntity } from '../entities/artist.entity';
import { TrackEntity } from '../entities/track.entity';
import { TrackService } from './track/track.service';
import { TrackController } from './track.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity, ArtistEntity, TrackEntity])],
  providers: [TrackService],
  controllers: [TrackController],
  exports: [TrackService],
})
export class TrackModule {}
