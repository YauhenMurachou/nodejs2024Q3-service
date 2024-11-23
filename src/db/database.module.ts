import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FavoriteEntity } from '../entities/favorite.entity';
import { AlbumEntity } from '../entities/album.entity';
import { ArtistEntity } from '../entities/artist.entity';
import { UserEntity } from '../entities/user.entity';
import { TrackEntity } from '../entities/track.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [
          AlbumEntity,
          ArtistEntity,
          FavoriteEntity,
          TrackEntity,
          UserEntity,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
