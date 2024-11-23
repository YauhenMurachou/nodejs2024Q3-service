import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { FavoriteEntity } from '../entities/favorite.entity';
import { TrackEntity } from '../entities/track.entity';
import { AlbumEntity } from '../entities/album.entity';
import { ArtistEntity } from '../entities/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AlbumEntity,
      ArtistEntity,
      FavoriteEntity,
      TrackEntity,
    ]),
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
