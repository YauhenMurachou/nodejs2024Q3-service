import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FavsController } from '../favs.controller';
import { FavsService } from './favs.service';
import { FavsEntity } from '../../entities/favs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavsEntity])],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
