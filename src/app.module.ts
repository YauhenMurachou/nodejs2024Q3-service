import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { AlbumController } from './album/album.controller';
import { ArtistController } from './artist/artist.controller';
import { AlbumService } from './album/album/album.service';
import { ArtistService } from './artist/artist/artist.service';
import { UserService } from './user/user/user.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    AlbumController,
    ArtistController,
    UserController,
  ],
  providers: [AppService, AlbumService, ArtistService, UserService],
})
export class AppModule {}
