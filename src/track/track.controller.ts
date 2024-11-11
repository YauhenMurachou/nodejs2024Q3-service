import {
  Controller,
  Body,
  Get,
  HttpCode,
  Post,
  Param,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  Put,
  Delete,
} from '@nestjs/common';
import { TrackService } from './track/track.service';
import { CreateTrackrDto, UpdateTrackDto } from './dto/track.dto';
import { errors } from '../constants';
import { validate } from 'class-validator';

@Controller('track')
export class TrackController {
  constructor(private readonly Trackservice: TrackService) {}
  @Get()
  @HttpCode(200)
  getall() {
    return this.Trackservice.getall();
  }

  @Get(':id')
  @HttpCode(200)
  getById(@Param('id') id: string) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }

    if (this.Trackservice.getById(id)) {
      return this.Trackservice.getById(id);
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: errors.NOT_FOUND,
      });
    }
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createTrack: CreateTrackrDto) {
    if (!createTrack.name || !createTrack.duration) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }
    return await this.Trackservice.create(createTrack);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }
    if (this.Trackservice.delete(id)) {
      return this.Trackservice.delete(id);
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: errors.NOT_FOUND,
      });
    }
  }

  @Put(':id')
  @HttpCode(200)
  async updateTrack(
    @Param('id') id: string,
    @Body() UpdateTrackdto: UpdateTrackDto,
  ) {
    const updateTrackDto = new UpdateTrackDto();
    updateTrackDto.name = UpdateTrackdto?.name;
    updateTrackDto.duration = UpdateTrackdto?.duration;
    updateTrackDto.artistId = UpdateTrackdto?.artistId;
    const errorsValidator = await validate(updateTrackDto);
    const result = await this.Trackservice.update(id, UpdateTrackdto);
    if (!this.isValidId(id) || errorsValidator.length) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    } else if (result) {
      return result;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: errors.NOT_FOUND,
      });
    }
  }

  private isValidId(id: string): boolean {
    return id.split('-').length === 5;
  }
}
