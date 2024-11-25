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
import { AlbumService } from './album/album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { errors } from '../constants';
import { validate } from 'class-validator';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('album')
@UseGuards(JwtAuthGuard)
export class AlbumController {
  constructor(private readonly albumservice: AlbumService) {}
  @Get()
  @HttpCode(200)
  async getAll() {
    return await this.albumservice.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async getById(@Param('id') id: string) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }
    const album = await this.albumservice.getById(id);

    if (album) {
      return album;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: errors.NOT_FOUND,
      });
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async create(@Body() createAlbum: CreateAlbumDto) {
    const createAlbumDto = new CreateAlbumDto();
    createAlbumDto.name = createAlbum?.name;
    createAlbumDto.year = createAlbum?.year;
    createAlbumDto.artistId = createAlbum?.artistId;
    const errorsValidator = await validate(createAlbumDto);
    if (!createAlbum.name || !createAlbum.year || errorsValidator.length) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }
    return this.albumservice.create(createAlbum);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }
    const result = await this.albumservice.delete(id);
    if (!result) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: errors.NOT_FOUND,
      });
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async updateAlbum(
    @Param('id') id: string,
    @Body() UpdateAldto: UpdateAlbumDto,
  ) {
    const updateAlbumDto = new UpdateAlbumDto();
    updateAlbumDto.name = UpdateAldto?.name;
    updateAlbumDto.year = UpdateAldto?.year;
    updateAlbumDto.artistId = UpdateAldto?.artistId;
    const errorsValidator = await validate(updateAlbumDto);

    if (
      !this.isValidId(id) ||
      !UpdateAldto.name ||
      !UpdateAldto.year ||
      errorsValidator.length
    ) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }
    const result = await this.albumservice.update(id, UpdateAldto);
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
