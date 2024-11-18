import { Module } from '@nestjs/common';
import { AlbumService } from './album/album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../entities/album.entity';
import { AlbumController } from './album.controller';
import { ArtistEntity } from '../entities/artist.entity';
import { TrackEntity } from '../entities/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity, ArtistEntity, TrackEntity])],
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}
