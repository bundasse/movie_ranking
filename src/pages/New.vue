<template>
  <div class="w-full h-full min-h-screen bg-black px-[2%] py-5 box-border">
    <h1 class="text-3xl font-extrabold mb-5 text-white">현재 상영작</h1>
    <!-- 각 항목 -->
    <div class="flex flex-wrap gap-x-[1%]">
      <div v-for="(e, i) in movies" :key="e" class="mb-[2%] bg-white lg:bg-opacity-70 lg:hover:bg-opacity-100 transition-all duration-300 lg:basis-[19%] md:basis-[32%] basis-[49%] box-border p-3  rounded-lg">
        <!-- 이미지 -->
        <div class="flex justify-center mb-2">
          <router-link :to="'detail/'+(e.id)" class="inline-flex">
            <img :src="'https://www.themoviedb.org/t/p/w220_and_h330_face/'+ e.poster_path" :alt="e.title" class="rounded-lg">
          </router-link>
        </div>
        <!-- 영화정보 -->
        <h3 class="font-bold text-lg">{{(i+1)}}위 {{ e.title }}</h3>
        <p class="text-xs text-slate-500">{{ e.original_title }}</p>
        <ul class="text-sm pb-2 mb-1 border-b-black-300 border-b-[2px]">
          <li><i class="fa-solid fa-star text-yellow-400"></i> {{ e.vote_average }}</li>
          <li>개봉일 {{ e.release_date }}</li>
        </ul>
        <!-- 줄거리 -->
        <div class="text-sm line-clamp" v-if="e.overview !== ''">
          {{ e.overview }}
        </div>
        <div class="text-sm text-slate-500" v-else>
          아직 줄거리가 등록되지 않았습니다.
        </div>
      </div>
    </div>
    <!-- 각 항목 끝 -->
    <div class="text-slate-600 text-center my-5 text-sm">
      Film data from <a href="https://www.themoviedb.org/" class="underline" target="blank" title="TMDB(new tab)">TMDB</a>.
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "NewContents",
    data() {
    return {
      page: 1,
      movies:[]
    }
  },
  methods:{
  },
  mounted(){
  },
  created(){
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=f70d8115a6b978265c6796a7126e21e1&region=KR&language=ko-KR&page=1`).then((movies)=>{
      console.log(movies.data);
      this.page = movies.data.page;
      this.movies = movies.data.results;
    }).catch((error)=>{
      console.log(error);
    })
  },
  components: {
  }
}
</script>
<style>
/* 텍스트 3줄까지만 출력 */
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>