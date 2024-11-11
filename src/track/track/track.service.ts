import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as db from '../../db/db';
import { CreateTrackrDto, UpdateTrackDto } from '../dto/track.dto';
@Injectable()
export class TrackService {
  track = db.track;
  getall() {
    return this.track;
  }

  getById(id: string) {
    return this.track.find((item) => item.id === id);
  }

  async create(CreateTrackrDto: CreateTrackrDto) {
    const newTrack = {
      ...CreateTrackrDto,
      id: uuidv4(),
    };
    this.track.push(newTrack);
    return newTrack;
  }

  delete(id: string) {
    const index = this.track.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.track.splice(index, 1);
      return true;
    }
    return false;
  }

  async update(id: string, UpdateTrackDto: UpdateTrackDto) {
    const track = this.track.find((item) => item.id === id);
    if (!track) {
      return null;
    }
    track.name = UpdateTrackDto.name;
    track.artistId = UpdateTrackDto.artistId;
    track.albumId = UpdateTrackDto.artistId;
    track.duration = UpdateTrackDto.duration;
    return track;
  }
}
