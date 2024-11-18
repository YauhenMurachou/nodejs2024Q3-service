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

export class NotFoundException extends HttpException {
  constructor(message?: string | object | any[]) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

@Controller('favs')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}
  @Get()
  @HttpCode(200)
  getAll() {
    return this.favoriteService.gelAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrack(@Param('id') id: string) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    } else if (this.favoriteService.addTrack(id)) {
      return this.favoriteService.addTrack(id);
    } else {
      throw new NotFoundException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: errors.UNPROCESSABLE_ENTITY,
      });
    }
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbum(@Param('id') id: string) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    } else if (this.favoriteService.addAlbum(id)) {
      return this.favoriteService.addAlbum(id);
    } else {
      throw new NotFoundException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: errors.UNPROCESSABLE_ENTITY,
      });
    }
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtist(@Param('id') id: string) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    } else if (this.favoriteService.addArtist(id)) {
      return this.favoriteService.addArtist(id);
    } else {
      throw new NotFoundException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: errors.UNPROCESSABLE_ENTITY,
      });
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    return this.favoriteService.deleteTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    return this.favoriteService.deleteAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    return this.favoriteService.deleteArtist(id);
  }

  private isValidId(id: string): boolean {
    return id.split('-').length === 5;
  }
}
