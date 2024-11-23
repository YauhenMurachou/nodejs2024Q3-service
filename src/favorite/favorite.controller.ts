import {
  Controller,
  Get,
  Post,
  Delete,
  HttpCode,
  Param,
  BadRequestException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { errors } from '../constants';
import { FavoriteService } from './favorite.service';

export class UnprocessableEntityException extends HttpException {
  constructor(message?: string | object | any[]) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

@Controller('favs')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  @HttpCode(200)
  async getAll() {
    return await this.favoriteService.getAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  async addTrack(@Param('id') id: string) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }
    const track = await this.favoriteService.addTrack(id);
    if (track) {
      return track;
    } else {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: errors.UNPROCESSABLE_ENTITY,
      });
    }
  }

  @Post('album/:id')
  @HttpCode(201)
  async addAlbum(@Param('id') id: string) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }
    const album = await this.favoriteService.addAlbum(id);
    if (album) {
      return album;
    } else {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: errors.UNPROCESSABLE_ENTITY,
      });
    }
  }

  @Post('artist/:id')
  @HttpCode(201)
  async addArtist(@Param('id') id: string) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }
    const artist = await this.favoriteService.addArtist(id);
    if (artist) {
      return artist;
    } else {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: errors.UNPROCESSABLE_ENTITY,
      });
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string) {
    return await this.favoriteService.deleteTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string) {
    return await this.favoriteService.deleteAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string) {
    return await this.favoriteService.deleteArtist(id);
  }

  private isValidId(id: string): boolean {
    return id.split('-').length === 5;
  }
}
