import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ArtistEntity } from './artist.entity';
import { AlbumEntity } from './album.entity';

@Entity('tracks')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => ArtistEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity | null;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @ManyToOne(() => AlbumEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId' })
  album: AlbumEntity | null;

  @Column({ type: 'uuid', nullable: true })
  albumId: string | null;

  @Column({ type: 'int' })
  duration: number;
}
