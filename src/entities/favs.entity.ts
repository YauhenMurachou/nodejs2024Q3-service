import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorites')
export class FavsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  artists: string;
  albums: string;
  tracks: string;
}
