import { Injectable } from '@nestjs/common';
import * as db from '../../db/db';
@Injectable()
export class FavsService {
  gelAll() {
    return db.favs;
  }

  addTrack(id: string) {
    const track = db.track.find((item) => item.id == id);
    if (!track) {
      return null;
    }
    db.favs.tracks.push(track);
    return true;
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
