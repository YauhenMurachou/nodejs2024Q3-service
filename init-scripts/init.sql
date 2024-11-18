\connect postgres;

-- Таблица "artists"
CREATE TABLE artists (
                         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                         name VARCHAR(255) NOT NULL,
                         grammy BOOLEAN NOT NULL DEFAULT FALSE
);

-- Таблица "albums"
CREATE TABLE albums (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        name VARCHAR(255) NOT NULL,
                        year INT NOT NULL,
                        artistId UUID,
                        CONSTRAINT fk_artist_album FOREIGN KEY (artistId) REFERENCES artists(id) ON DELETE SET NULL
);

-- Таблица "tracks"
CREATE TABLE tracks (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        name VARCHAR(255) NOT NULL,
                        artistId UUID,
                        albumId UUID,
                        duration INT NOT NULL,
                        CONSTRAINT fk_artist_track FOREIGN KEY (artistId) REFERENCES artists(id) ON DELETE SET NULL,
                        CONSTRAINT fk_album_track FOREIGN KEY (albumId) REFERENCES albums(id) ON DELETE SET NULL
);

-- Таблица "favorites"
CREATE TABLE favorites (
                           id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                           artists UUID[] DEFAULT '{}',
                           albums UUID[] DEFAULT '{}',
                           tracks UUID[] DEFAULT '{}'
);

-- Таблица "users"
CREATE TABLE users (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       login VARCHAR(255) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       version INT NOT NULL DEFAULT 1,
                       createdAt DATE NOT NULL DEFAULT CURRENT_DATE,
                       updatedAt DATE NOT NULL DEFAULT CURRENT_DATE
);
