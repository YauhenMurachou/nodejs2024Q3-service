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

@Module({
  imports: [],
  controllers: [
    AppController,
    AlbumController,
    ArtistController,
    TrackController,
    UserController,
  ],
  providers: [
    AppService,
    AlbumService,
    ArtistService,
    TrackService,
    UserService,
  ],
})
export class AppModule {}
