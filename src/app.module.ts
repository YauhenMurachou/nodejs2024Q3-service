import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumController } from './album/album.controller';
import { ArtistController } from './artist/artist.controller';
import { FavsController } from './favs/favs.controller';
import { TrackController } from './track/track.controller';
import { UserController } from './user/user.controller';

import { AlbumService } from './album/album/album.service';
import { ArtistService } from './artist/artist/artist.service';
import { FavsService } from './favs/favs/favs.service';
import { TrackService } from './track/track/track.service';
import { UserService } from './user/user/user.service';

import { FavsModule } from './favs/favs/favs.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './db/database.module';

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
    FavsModule,
    DatabaseModule,
  ],
  controllers: [
    AppController,
    AlbumController,
    ArtistController,
    FavsController,
    TrackController,
    UserController,
  ],
  providers: [
    AppService,
    AlbumService,
    ArtistService,
    FavsService,
    TrackService,
    UserService,
  ],
})
export class AppModule {}
