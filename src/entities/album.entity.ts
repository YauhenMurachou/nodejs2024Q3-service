import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('albums')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;
}
