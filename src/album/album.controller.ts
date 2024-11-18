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
import { AlbumService } from './album/album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { errors } from '../constants';
import { validate } from 'class-validator';

@Controller('album')
export class AlbumController {
  constructor(private readonly Albumservice: AlbumService) {}
  @Get()
  @HttpCode(200)
  getall() {
    return this.Albumservice.getall();
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

    if (this.Albumservice.getById(id)) {
      return this.Albumservice.getById(id);
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: errors.NOT_FOUND,
      });
    }
  }
  @Post()
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
    return this.Albumservice.create(createAlbum);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }
    if (this.Albumservice.delete(id)) {
      return this.Albumservice.delete(id);
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: errors.NOT_FOUND,
      });
    }
  }
  @Put(':id')
  @HttpCode(200)
  async updateAlbum(
    @Param('id') id: string,
    @Body() UpdateAldto: UpdateAlbumDto,
  ) {
    const result = await this.Albumservice.update(id, UpdateAldto);
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
