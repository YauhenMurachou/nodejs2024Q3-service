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
import { FavsService } from './favs/favs.service';
import { errors } from '../constants';

export class NotFoundException extends HttpException {
  constructor(message?: string | object | any[]) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

@Controller('favs')
export class FavsController {
  constructor(private Favservice: FavsService) {}
  @Get()
  @HttpCode(200)
  getAll() {
    return this.Favservice.gelAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrack(@Param('id') id: string) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    } else if (this.Favservice.addTrack(id)) {
      return this.Favservice.addTrack(id);
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
    } else if (this.Favservice.addAlbum(id)) {
      return this.Favservice.addAlbum(id);
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
    } else if (this.Favservice.addArtist(id)) {
      return this.Favservice.addArtist(id);
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
    return this.Favservice.deleteTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    return this.Favservice.deleteAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    return this.Favservice.deleteArtist(id);
  }

  private isValidId(id: string): boolean {
    return id.split('-').length === 5;
  }
}
