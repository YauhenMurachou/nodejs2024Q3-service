import { Injectable } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from '../dto/artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from '../../entities/artist.entity';
import { TrackEntity } from '../../entities/track.entity';
import { AlbumEntity } from '../../entities/album.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async getAll() {
    return this.artistRepository.find();
  }

  async getById(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      return null;
    }
    return artist;
  }

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      ...createArtistDto,
      id: uuidv4(),
    };
    return this.artistRepository.save(newArtist);
  }

  async delete(id: string) {
    const artist = await this.getById(id);
    if (!artist) {
      return null;
    }

    await this.trackRepository.update({ artistId: id }, { artistId: null });

    await this.albumRepository.update({ artistId: id }, { artistId: null });

    await this.artistRepository.delete({ id });
    return true;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.getById(id);
    if (!artist) {
      return null;
    }

    await this.artistRepository.update({ id }, updateArtistDto);
    return this.getById(id);
  }
}
