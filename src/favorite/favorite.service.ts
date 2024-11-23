import { Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteEntity } from '../entities/favorite.entity';
import { TrackEntity } from '../entities/track.entity';
import { AlbumEntity } from '../entities/album.entity';
import { ArtistEntity } from '../entities/artist.entity';

@Injectable()
export class FavoriteService implements OnModuleInit {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoriteRepository: Repository<FavoriteEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async onModuleInit() {
    const favorites = await this.favoriteRepository.find();
    if (favorites.length === 0) {
      await this.favoriteRepository.save({
        artists: [],
        albums: [],
        tracks: [],
      });
    }
  }

  private async getFavorites() {
    let favorites = await this.favoriteRepository.findOne({ where: {} });
    if (!favorites) {
      favorites = await this.favoriteRepository.save({
        artists: [],
        albums: [],
        tracks: [],
      });
    }
    return favorites;
  }

  async getAll() {
    const favorites = await this.getFavorites();

    const artistPromises = favorites.artists.map(async (id) => {
      const artist = await this.artistRepository.findOneBy({ id });
      if (!artist) return null;
      return {
        id: artist.id,
        name: artist.name,
        grammy: artist.grammy,
      };
    });

    const albumPromises = favorites.albums.map(async (id) => {
      const album = await this.albumRepository.findOneBy({ id });
      if (!album) return null;
      return {
        id: album.id,
        name: album.name,
        year: album.year,
        artistId: album.artistId,
      };
    });

    const trackPromises = favorites.tracks.map(async (id) => {
      const track = await this.trackRepository.findOneBy({ id });
      if (!track) return null;
      return {
        id: track.id,
        name: track.name,
        duration: track.duration,
        artistId: track.artistId,
        albumId: track.albumId,
      };
    });

    const [artists, albums, tracks] = await Promise.all([
      Promise.all(artistPromises),
      Promise.all(albumPromises),
      Promise.all(trackPromises),
    ]);

    return {
      artists: artists.filter(Boolean),
      albums: albums.filter(Boolean),
      tracks: tracks.filter(Boolean),
    };
  }

  async addTrack(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) return null;

    const favorites = await this.getFavorites();
    if (!favorites.tracks.includes(id)) {
      favorites.tracks.push(id);
      await this.favoriteRepository.save(favorites);
    }

    return {
      id: track.id,
      name: track.name,
      duration: track.duration,
      artistId: track.artistId,
      albumId: track.albumId,
    };
  }

  async addAlbum(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) return null;

    const favorites = await this.getFavorites();
    if (!favorites.albums.includes(id)) {
      favorites.albums.push(id);
      await this.favoriteRepository.save(favorites);
    }

    return {
      id: album.id,
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    };
  }

  async addArtist(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) return null;

    const favorites = await this.getFavorites();
    if (!favorites.artists.includes(id)) {
      favorites.artists.push(id);
      await this.favoriteRepository.save(favorites);
      return favorites;
    }

    return {
      id: artist.id,
      name: artist.name,
      grammy: artist.grammy,
    };
  }

  async deleteTrack(id: string) {
    const favorites = await this.getFavorites();
    favorites.tracks = favorites.tracks.filter((trackId) => trackId !== id);
    await this.favoriteRepository.save(favorites);
    return true;
  }

  async deleteAlbum(id: string) {
    const favorites = await this.getFavorites();
    favorites.albums = favorites.albums.filter((albumId) => albumId !== id);
    await this.favoriteRepository.save(favorites);
    return true;
  }

  async deleteArtist(id: string) {
    const favorites = await this.getFavorites();
    favorites.artists = favorites.artists.filter((artistId) => artistId !== id);
    await this.favoriteRepository.save(favorites);
    return true;
  }
}
