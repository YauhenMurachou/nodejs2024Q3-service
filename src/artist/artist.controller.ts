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
  constructor(private readonly artistService: ArtistService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.artistService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }
    const artist = await this.artistService.getById(id);
    if (artist) {
      return artist;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: errors.NOT_FOUND,
      });
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createArtistDto: CreateArtistDto) {
    if (!createArtistDto.name || typeof createArtistDto.grammy !== 'boolean') {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }

    return await this.artistService.create(createArtistDto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }

    const result = await this.artistService.delete(id);
    if (!result) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: errors.NOT_FOUND,
      });
    }
  }
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const newUpdateArtistDto = new UpdateArtistDto();
    newUpdateArtistDto.name = updateArtistDto?.name;
    newUpdateArtistDto.grammy = updateArtistDto?.grammy;
    const errorsValidator = await validate(newUpdateArtistDto);
    if (!this.isValidId(id) || errorsValidator.length) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }

    const validationErrors = await validate(updateArtistDto);
    if (validationErrors.length > 0) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }

    const updatedArtist = await this.artistService.update(id, updateArtistDto);
    if (!updatedArtist) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: errors.NOT_FOUND,
      });
    }

    return updatedArtist;
  }

  private isValidId(id: string): boolean {
    return id.split('-').length === 5;
  }
}
