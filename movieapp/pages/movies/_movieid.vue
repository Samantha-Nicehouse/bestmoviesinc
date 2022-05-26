<template>
  <!-- Loading -->
  <Loading v-if="$fetchState.pending" />

  <!-- Movie Info -->
  <div v-else class="container single-movie">
    <NuxtLink class="button" :to="{ name: 'index' }"> Back </NuxtLink>
    <div class="movie-info">
      <div class="movie-img">
        <img
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          alt=""
        />
      </div>
      <div class="movie-content">
        <h1>Title: {{ movie.title }}</h1>
        <p class="movie-fact tagline">
          <span>Tagline:</span> "{{ movie.tagline }}"
        </p>
        <p class="movie-fact">
          <span>Released:</span>
          {{
            new Date(movie.release_date).toLocaleString('en-us', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          }}
        </p>
        <p class="movie-fact">
          <span>Duration:</span> {{ movie.runtime }} minutes
        </p>
        <p class="movie-fact">
          <span>Revenue:</span>
          {{
            movie.revenue.toLocaleString('en-us', {
              style: 'currency',
              currency: 'USD',
            })
          }}
        </p>
        <p class="movie-fact">
          <span>Rating:</span> {{ movie.vote_average }} (number of votes:
          {{ movie.vote_count }})
        </p>
        <p class="movie-fact"><span>Overview:</span> {{ movie.overview }}</p>
        <p class="movie-fact">
          <span>Directors:</span>
          <span
            v-for="(director, index) in directors"
            :key="index"
            class="cast"
          >
            {{ director.name
            }}<span v-if="index < directors.length - 1">,</span></span
          >.
        </p>
        <p class="movie-fact">
          <span>Actors:</span>
          <span v-for="(actor, index) in actors" :key="index" class="cast">
            {{ actor.name
            }}<span v-if="index < actors.length - 1">,</span></span
          >.
        </p>
        <div>
          <button class="button"> Add Movie to Favorites </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'singleMovie',

  data() {
    return {
      movie: '',
      movieCredits: '',
      directors: [],
      actors: [],
      Id : '',
      title : '',
      rating : '',
      poster_path: '',
      vote_average : '',
      release_date : '',
    }
  },

  async fetch() {
    await this.getSingleMovie()
    await this.getSingleMovieCredits()
  },
  fetchDelay: 1000,

  head() {
    return {
      title: this.movie.title,
    }
  },

  methods: {
    async getSingleMovie() {
      const data = axios.get(
        `https://api.themoviedb.org/3/movie/${this.$route.params.movieid}?api_key=a3350cca7f4b916251b737d31cd4135b&language=en-US`
      )
      const result = await data
      this.movie = result.data
    },
    async getSingleMovieCredits() {
      const data = axios.get(
        `https://api.themoviedb.org/3/movie/${this.$route.params.movieid}/credits?api_key=a3350cca7f4b916251b737d31cd4135b&language=en-US`
      )
      const result = await data
      this.movieCredits = result.data
      this.movieCredits.crew.forEach((crew) => {
        if (crew.department === 'Directing') {
          this.directors.push(crew)
        }
      })
      this.movieCredits.cast.forEach((cast) => {
        if (cast.known_for_department === 'Acting') {
          if (this.actors.length <= 9) {
            this.actors.push(cast)
          }
        }
      })
    },
    async addMovieToFavorites() {
        try{
         await this.$axios( {
        method: 'post',
        url:"https://mbiapiv2.azurewebsites.net/api/movies/addMovie",
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify({
          id: this.movie.id.toString(),
          title: this.movie.title,
          description: this.movie.overview,
          poster_img : this.movie.poster_path.toString(),
          release_date : this.movie.release_date.toString(),
          vote_avg : this.movie.vote_average
        })
        });
        }
        catch(e){

        }
    }
  },
}
</script>

<style lang="scss">
.single-movie {
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 16px;

  .button {
    align-self: flex-start;
    margin-bottom: 32px;
  }
  .cast {
    text-decoration: none !important;
    font-weight: normal !important;
  }
  .movie-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    color: #fff;
    @media (min-width: 800px) {
      flex-direction: row;
      align-items: flex-start;
    }
    .movie-img {
      img {
        max-height: 500px;
        width: 100%;
        @media (min-width: 800px) {
          max-height: 700px;
          width: initial;
        }
      }
    }
    .movie-content {
      h1 {
        font-size: 56px;
        font-weight: 400;
      }
      .movie-fact {
        margin-top: 12px;
        font-size: 20px;
        line-height: 1.5;
        span {
          font-weight: 600;
          text-decoration: underline;
        }
      }
      .tagline {
        font-style: italic;
        span {
          font-style: normal;
        }
      }
    }
  }
}
</style>
