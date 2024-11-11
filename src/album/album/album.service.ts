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
    const index = this.album.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.album.splice(index, 1);
      return true;
    }
    return false;
  }

  async update(id: string, UpdateAlbumDto: UpdateAlbumDto) {
    const album = this.album.find((item) => item.id === id);
    if (!album) {
      return null;
    }
    album.name = UpdateAlbumDto.name;
    album.artistId = UpdateAlbumDto.artistId;
    album.year = UpdateAlbumDto.year;
    return album;
  }
}
