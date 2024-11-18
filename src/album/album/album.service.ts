import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateAlbumDto, UpdateAlbumDto } from '../dto/album.dto';

import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../../entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async getAll() {
    return this.albumRepository.find();
  }

  async getById(id: string) {
    return this.albumRepository.findOneBy({ id });
  }

  async create(CreateAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      ...CreateAlbumDto,
      id: uuidv4(),
    };

    return this.albumRepository.create(newAlbum);
  }

  async delete(id: string) {
    const album = await this.getById(id);
    if (!album) {
      throw new BadRequestException();
    }

    await this.albumRepository.delete({ id });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.getById(id);
    if (!album) {
      return null;
    }

    await this.albumRepository.update({ id }, { ...updateAlbumDto });

    return this.getById(id);
  }
}
