import { Module } from '@nestjs/common';
import { AlbumService } from './album/album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../entities/album.entity';
import { AlbumController } from './album.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}
