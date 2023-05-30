<template>
  <div class="w-full h-full min-h-screen bg-black px-[2%] py-5 box-border">
    <h1 class="text-3xl font-extrabold mb-3  text-white">인기 작품</h1>
    <!-- 상단메뉴 -->
    <div class="mb-3 text-xl font-extrabold text-slate-500">
      <button class="mx-3 cursor-pointer" :class="watchProvider == 8 && 'text-rose-500'" @click="watchProvider = 8; getItem(); handleSlideTo()">넷플릭스</button>
      <button class="mx-3 cursor-pointer" :class="watchProvider == 97 && 'text-rose-500'" @click="watchProvider = 97; getItem(); handleSlideTo()">왓챠</button>
      <button class="mx-3 cursor-pointer" :class="watchProvider == 337 && 'text-rose-500'" @click="watchProvider = 337; getItem(); handleSlideTo()">디즈니플러스</button>
      <button class="mx-3 cursor-pointer" :class="watchProvider == 356 && 'text-rose-500'" @click="watchProvider = 356; getItem(); handleSlideTo()">Wavve</button>
      <button class="mx-3 cursor-pointer" :class="watchProvider == 96 && 'text-rose-500'" @click="watchProvider = 96; getItem(); handleSlideTo()">네이버 시리즈</button>
      <!-- OTT서비스업체보기 https://api.themoviedb.org/3/watch/providers/movie?api_key=f70d8115a6b978265c6796a7126e21e1&watch_region=KR
  고유코드 넷플 8 왓챠 97 디플 337 웨이브 356 네이버시리즈 96 -->
    </div>
    <!-- 각 항목 -->
    <div class="flex flex-wrap gap-x-[1%]">
      <swiper
      :slidesPerView="1"
      :spaceBetween="20"
      :slidesPerGroup="1"
      :keyboard="{ enable:true }"
      :grabCursor="true"
      :navigation=true
      :pagination="{
        clickable: true,
      }"
      :style="{
        '--swiper-navigation-color': 'rgb(244 63 94)',
        '--swiper-pagination-color': 'rgb(244 63 94)',
        '--swiper-navigation-sides-offset': '0px'
      }"
      :breakpoints="{
        '450': {
          slidesPerView: 1,
          spaceBetween: 20,
          slidesPerGroup: 1
        },
        '640': {
          slidesPerView: 2,
          spaceBetween: 20,
          slidesPerGroup: 2
        },
        '768': {
          slidesPerView: 3,
          spaceBetween: 20,
          slidesPerGroup: 3
        },
        '1024': {
          slidesPerView: 5,
          spaceBetween: 20,
          slidesPerGroup: 5
        },
      }"
      @swiper="onSwiper"
      :modules="modules"
      class="mySwiper">
        <swiper-slide v-for="(e, i) in movies" :key="e">
          <div class="mb-2 bg-white lg:bg-opacity-70 lg:hover:bg-opacity-100 transition-all duration-300 lg:basis-[19%] md:basis-[19%] basis-[49%] box-border p-3 h-full rounded-lg">
            <!-- 이미지 -->
            <div class="flex justify-center mb-2">
              <router-link :to="'detail/'+(e.id)" class="inline-flex">
                <img :src="'https://www.themoviedb.org/t/p/w220_and_h330_face/'+ e.poster_path" :alt="e.title" class="rounded-lg">
              </router-link>
            </div>
            <!-- 영화정보 -->
            <h3 class="font-bold text-xl">{{(i+1)}}위 {{ e.title }}</h3>
            <p class="text-xs text-slate-500">{{ e.original_title }}</p>
            <ul class="text-sm pb-2 mb-1 border-b-black-300 border-b-[2px]">
              <li><i class="fa-solid fa-star text-yellow-400"></i> {{ e.vote_average }}</li>
              <li>개봉일 {{ e.release_date }}</li>
            </ul>
            <!-- 줄거리. 줄거리가 없을 경우 등록되지 않았다는 문구 출력. -->
            <div v-if="e.overview !== ''" class="text-sm line-clamp">
              {{ e.overview }}
            </div>
            <div class="text-sm text-slate-500" v-else>
              아직 줄거리가 등록되지 않았습니다.
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <!-- 각 항목 끝 -->
    <div class="text-slate-600 text-center my-5 text-sm">
      Film data from <a href="https://www.themoviedb.org/" class="underline" target="blank" title="TMDB(new tab)">TMDB</a>.
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import axios from 'axios';
import { Pagination, Navigation, Keyboard } from 'swiper';
export default {
    name: "MainHome",
    data() {
    return {
      watchProvider:8,
      page: 1,
      totalPages: 0,
      movies:[],
      swiper: null,
    }
  },
  methods:{
    getItem: function() {
      localStorage.setItem("watchP",this.watchProvider);  
      axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f70d8115a6b978265c6796a7126e21e1&watch_region=KR&language=ko&page=1&with_watch_providers=${this.watchProvider}`).then((movies)=>{
      this.movies = movies.data.results;
    }).catch((error)=>{
      console.log(error);
    })
    },
    onSwiper(swiper) {
      this.swiper = swiper;
    },
    handleSlideTo() {
      
      this.swiper.slideTo(0);
    },
  },
  mounted(){
  },
  created(){
    const watchP = localStorage.getItem("watchP");
    this.watchProvider = watchP;
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f70d8115a6b978265c6796a7126e21e1&watch_region=KR&language=ko&page=1&with_watch_providers=${this.watchProvider}`).then((movies)=>{
      console.log(movies.data);
      this.page = movies.data.page;
      this.movies = movies.data.results;
      this.totalPages = movies.data.total_pages;
    }).catch((error)=>{
      console.log(error);
    })
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination, Navigation, Keyboard],
    };
  },
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