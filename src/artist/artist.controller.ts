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
import { validate } from 'class-validator';

import { ArtistService } from './artist/artist.service';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { errors } from '../constants';
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistservice: ArtistService) {}
  @Get()
  @HttpCode(200)
  getall() {
    return this.artistservice.getall();
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

    if (this.artistservice.getById(id)) {
      return this.artistservice.getById(id);
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: errors.NOT_FOUND,
      });
    }
  }
  @Post()
  @HttpCode(201)
  create(@Body() createArtist: CreateArtistDto) {
    if (!createArtist.name || !createArtist.grammy) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }

    return this.artistservice.create(createArtist);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }
    if (this.artistservice.delete(id)) {
      return this.artistservice.delete(id);
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
    @Body() UpdateArtistdto: UpdateArtistDto,
  ) {
    const updateArtistDto = new UpdateArtistDto();
    updateArtistDto.name = UpdateArtistdto.name;
    updateArtistDto.grammy = UpdateArtistdto.grammy;
    const errorsValidator = await validate(updateArtistDto);

    if (!this.isValidId(id) || errorsValidator.length) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    } else if (this.artistservice.update(id, UpdateArtistdto)) {
      return this.artistservice.update(id, UpdateArtistdto);
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
