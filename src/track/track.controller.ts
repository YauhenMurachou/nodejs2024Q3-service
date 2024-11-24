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
  UseGuards,
} from '@nestjs/common';
import { TrackService } from './track/track.service';
import { CreateTrackrDto, UpdateTrackDto } from './dto/track.dto';
import { errors } from '../constants';
import { validate } from 'class-validator';
// import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('track')
// @UseGuards(JwtAuthGuard)
export class TrackController {
  constructor(private readonly Trackservice: TrackService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async getall() {
    return await this.Trackservice.getall();
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async getById(@Param('id') id: string) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }

    const track = await this.Trackservice.getById(id);

    if (track) {
      return track;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: errors.NOT_FOUND,
      });
    }
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
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
  // @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }
    const result = await this.Trackservice.delete(id);
    if (result) {
      return result;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: errors.NOT_FOUND,
      });
    }
  }

  @Put(':id')
  // @UseGuards(JwtAuthGuard)
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
    if (!this.isValidId(id) || errorsValidator.length) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }
    const result = await this.Trackservice.update(id, UpdateTrackdto);

    if (result) {
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
