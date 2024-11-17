import { Injectable } from '@nestjs/common';
import * as db from '../../db/db';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { v4 as uuidv4 } from 'uuid';
import { FavsEntity } from '../../entities/favs.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavsEntity)
    private FavsRepository: Repository<FavsEntity>,
  ) {}

  gelAll() {
    return this.FavsRepository.find();
  }

  async addTrack(id: string) {
    const track = db.track.find((item) => item.id == id);
    if (!track) {
      return null;
    }
    const addTrack = await this.FavsRepository.insert(track);
    db.favs.tracks.push(track);
    return addTrack;
  }

  addAlbum(id: string) {
    const album = db.album.find((item) => item.id == id);
    if (!album) {
      return null;
    }
    db.favs.albums.push(album);
    return true;
  }

  addArtist(id: string) {
    const artist = db.artist.find((item) => item.id == id);
    if (!artist) {
      return null;
    }
    db.favs.artists.push(artist);
    return true;
  }

  deleteTrack(id: string) {
    const track = db.track.filter((item) => item.id !== id);
    db.favs.tracks = track;
    return true;
  }

  deleteAlbum(id: string) {
    const album = db.album.filter((item) => item.id !== id);
    db.favs.albums = album;
    return true;
  }

  deleteArtist(id: string) {
    const artist = db.artist.filter((item) => item.id !== id);
    db.favs.artists = artist;
    return true;
  }
}
