import { Injectable } from '@nestjs/common';

import { CreateAlbumDto, UpdateAlbumDto } from '../dto/album.dto';

import * as db from '../../db/db';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AlbumService {
  album = db.album;
  getall() {
    console.log(this.album);
    return this.album;
  }

  getById(id: string) {
    return this.album.find((item) => item.id === id);
  }

  async create(CreateAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      ...CreateAlbumDto,
      id: uuidv4(),
    };

    this.album.push(newAlbum);

    return newAlbum;
  }

  delete(id: string) {
    const newArrAlbum = db.album.filter((item) => item.id !== id);
    this.album = newArrAlbum;
    if (this.album.length == db.album.length) {
      return false;
    }
    return this.album;
  }

  async update(id: string, UpdateAlbumDto: UpdateAlbumDto) {
    const album = this.album.find((item) => item.id === id);
    album.name = UpdateAlbumDto.name;
    album.artistId = UpdateAlbumDto.artistId;
    album.year = UpdateAlbumDto.year;
    return album;
  }
}
