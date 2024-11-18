import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumController } from './album/album.controller';
import { ArtistController } from './artist/artist.controller';
import { TrackController } from './track/track.controller';
import { UserController } from './user/user.controller';

import { AlbumService } from './album/album/album.service';
import { ArtistService } from './artist/artist/artist.service';
import { TrackService } from './track/track/track.service';
import { UserService } from './user/user/user.service';

import { FavoriteModule } from './favorite/favorite.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './db/database.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    FavoriteModule,
    AlbumModule,
    ArtistModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
