import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('favorites')
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { array: true, default: [] })
  artists: string[];

  @Column('uuid', { array: true, default: [] })
  albums: string[];

  @Column('uuid', { array: true, default: [] })
  tracks: string[];
}
