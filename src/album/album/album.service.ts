import { Injectable } from '@nestjs/common';

import { CreateAlbumDto, UpdateAlbumDto } from '../dto/album.dto';

import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../../entities/album.entity';
import { TrackEntity } from '../../entities/track.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getAll() {
    return this.albumRepository.find();
  }

  async getById(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      return null;
    }
    return album;
  }

  async create(CreateAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      ...CreateAlbumDto,
      id: uuidv4(),
    };
    return this.albumRepository.save(newAlbum);
  }

  async delete(id: string) {
    const album = await this.getById(id);
    if (!album) {
      return null;
    }

    await this.trackRepository.update({ albumId: id }, { albumId: null });

    await this.albumRepository.delete({ id });
    return true;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.getById(id);
    if (!album) {
      return null;
    }

    await this.albumRepository.update({ id }, updateAlbumDto);
    return this.getById(id);
  }
}
