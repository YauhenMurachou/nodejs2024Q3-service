import { Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import * as db from '../../db/db';
import { CreateArtistDto, UpdateArtistDto } from '../dto/artist.dto';
@Injectable()
export class ArtistService {
  artist = db.artist;
  getall() {
    return this.artist;
  }

  getById(id: string) {
    return this.artist.find((item) => item.id === id);
  }

  async create(CreateArtist: CreateArtistDto) {
    const newArtist = {
      ...CreateArtist,
      id: uuidv4(),
    };
    this.artist.push(newArtist);
    return newArtist;
  }

  delete(id: string) {
    const index = this.artist.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.artist.splice(index, 1);
      const tracks = db.track.filter((item) => item.artistId === id);
      tracks.forEach((track) => {
        track.artistId = null;
      });
      const albums = db.album.filter((item) => item.artistId === id);
      albums.forEach((album) => {
        album.artistId = null;
      });
      return true;
    }
    return false;
  }

  update(id: string, UpdateArtistDto: UpdateArtistDto) {
    const artist = this.artist.find((item) => item.id === id);
    if (artist) {
      artist.name = UpdateArtistDto.name;
      artist.grammy = UpdateArtistDto.grammy;
      return artist;
    } else {
      return null;
    }
  }
}
