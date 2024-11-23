import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackrDto, UpdateTrackDto } from '../dto/track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from '../../entities/track.entity';
@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getall() {
    return this.trackRepository.find();
  }

  async getById(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      return null;
    }
    return track;
  }

  async create(createTrackDto: CreateTrackrDto) {
    const newTrack = {
      ...createTrackDto,
      id: uuidv4(),
    };
    return await this.trackRepository.save(newTrack);
  }

  async delete(id: string) {
    const track = await this.getById(id);
    if (!track) {
      return null;
    }

    await this.trackRepository.delete({ id });
    return true;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.getById(id);
    if (!track) {
      return null;
    }

    await this.trackRepository.update({ id }, updateTrackDto);
    return this.getById(id);
  }
}
