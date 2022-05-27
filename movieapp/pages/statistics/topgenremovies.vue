<template>
  <div class="toprated">
    <Navbar class="navbar" design="default" />
    <div class="container search">
        <h1>Select a genre</h1>
        <select id="genre" v-model="genre" name="genre" @mouseenter="$fetch" class="form-control" @change="onChange($event) && $fetch">
            <option value="27">Horror</option>
            <option value="28">Action</option>
            <option value="12">Adventure</option>
            <option value="16">Animation</option>
            <option value="35">Comedy</option>
            <option value="80">Crime</option>
            <option value="99">Documentary</option>
            <option value="10751">Family</option>
            <option value="14">Fantasy</option>
            <option value="36">History</option>
            <option value="10402">Music</option>
            <option value="9648">Mystery</option>
            <option value="10749">Romance</option>
            <option value="878">Science Fiction</option>
            <option value="10770">TV Movie</option>
            <option value="53">Thriller</option>
            <option value="10752">War</option>
            <option value="37">Western</option>
            <option value="18">Drama</option>
        </select>
        <button v-show="genre !== ''" class="button" @click="clearSearch">
        Clear genre
      </button>
      
    </div>
    <!-- Loading Animation -->
    <Loading v-if="$fetchState.pending" />
    
    <!-- Movies -->
    <div v-else class="container movies">
      <!-- Popular Movies  -->
      <div id="movie-grid" class="movies-grid">
        <div v-for="(movie, index) in movies" :key="index" class="movie">
          <div class="movie-img">
              <div v-if="movie.poster_path !== null ">
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              alt=""
            />
              </div>
            <p class="review">{{ movie.vote_average }}</p>
            <p class="overview">{{ movie.overview }}</p>
          </div>
          <div class="info">
            <p class="title">
              {{ movie.title.slice(0, 25)
              }}<span v-if="movie.title.length > 25">...</span>
            </p>
            <p class="release">
              Released:
              {{
                new Date(movie.release_date).toLocaleString('en-us', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
              }}
            </p>
            <NuxtLink
              class="button button-light"
              :to="{ name: 'movies-movieid', params: { movieid: movie.id } }"
            >
              Get More Info
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '../../components/Navbar.vue'

export default {
  name: 'TopGenreMovies',

  components: {
    Navbar,
  },
  layout: 'empty',

  data() {
    return {
      movies: [],
      genre: "",
    }
  },

  async fetch() {
      if(this.genre !== ""){
        await this.getMovies()
  }
  },

  head() {
    return {
      title: 'Movie App - Top Rated Movies Info',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Get the most top rated movies in theaters & online',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'movies, stream, streaming, top rated',
        },
      ],
    }
  },

  methods: {
    async getMovies() {

      await axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=c0d2b5193ae0ea4f12cccda56ceab5c1&with_genres=${this.genre}&sort_by=vote_average.desc&vote_count.gte=10`
        )
        .then((res) => {
          res.data.results.forEach((movie) => {
            this.movies.push(movie)
          })
        })
    },
     async onChange(event){
         this.genre = await event.target.value
         console.log(this.genre)
     },
     async getMoviesDrama() {
      await axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=c0d2b5193ae0ea4f12cccda56ceab5c1&with_genres=18&sort_by=vote_average.desc&vote_count.gte=10`
        )
        .then((res) => {
          res.data.results.forEach((movie) => {
            this.movies.push(movie)
          })
        })
    },
    clearSearch() {
      this.genre = ''
      this.movies = []
    },
  },
}
</script>

<style lang="scss">
select{
    margin: 5px;
    width: 150px;
    
    font-size: 16px;
    border: 1px solid #CCC;
    height: 34px;
}
h1 {
      color: #fff;
      font-size: 16px;
      font-weight: 100;
      margin-bottom: 8px;
      @media (min-width: 750px) {
        font-size: 32px;
      }
      span {
        font-weight: 500;
      }
    }
.toprated {
  background-color: #211f1f;
  width: 100%;
  height: 100%;
  .loading {
    padding-top: 120px;
    align-items: flex-start;
  }
  .movies {
    padding: 32px 16px;
    .movies-grid {
      display: grid;
      column-gap: 32px;
      row-gap: 64px;
      grid-template-columns: 1fr;
      @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 750px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 1100px) {
        grid-template-columns: repeat(4, 1fr);
      }
      .movie {
        position: relative;
        display: flex;
        flex-direction: column;
        .movie-img {
          position: relative;
          overflow: hidden;
          &:hover {
            .overview {
              transform: translateY(0);
            }
          }
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
          .review {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            background-color: #c92502;
            color: #fff;
            border-radius: 0 0 16px 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          .overview {
            line-height: 1.5;
            position: absolute;
            bottom: 0;
            background-color: rgba(201, 38, 2, 0.9);
            padding: 12px;
            color: #fff;
            transform: translateY(100%);
            transition: 0.3s ease-in-out all;
          }
        }
        .info {
          margin-top: auto;
          .title {
            margin-top: 8px;
            color: #fff;
            font-size: 20px;
          }
          .release {
            margin-top: 8px;
            color: #c9c9c9;
          }
          .button {
            margin-top: 8px;
          }
        }
      }
    }
  }
}
</style>
