<template>
    <div class="w-full h-full min-h-screen bg-black text-white">
      <div class="max-w-7xl mx-auto py-2 px-10">
          <button @click="goBack()"><i class="fa-solid fa-chevron-left"></i>뒤로가기</button>
      </div>
      <div class="relative max-w-7xl mx-auto h-full p-10 text-white">
          <div class="bg-cover bg-no-repeat bg-top sm:bg-right opacity-25 absolute h-full w-full left-0 top-0" :style="'background-image: url(https://www.themoviedb.org/t/p/original/'+(listItem.backdrop_path)+')'"></div>
          <div class="relative z-10 ">
              <div class="w-full flex items-stretch flex-wrap gap-10">
                  <div>
                    <img :src="'https://www.themoviedb.org/t/p/w220_and_h330_face/'+(listItem.poster_path)" :alt="listItem.title" class="border border-slate-600 shadow-sm shadow-slate-800">
                  </div>
                  <div class="min-w-[300px] mt-3">
                      <p v-if="listItem.tagline !== ''" class="text-lg mb-1 opacity-80">{{ listItem.tagline }}</p>
                      <h3 class="font-bold text-4xl">{{ listItem.title }}</h3>
                      <p class="text-lg opacity-30">{{ listItem.original_title }}</p>
                      <p><span v-for="e in (listItem.genres)" :key="e" class="after:content-['│'] last:after:content-none">{{ e.name }}</span></p>
                      <ul class="text-sm pt-2 my-2 border-b-black-300 border-t-[2px]">
                          <li>평점 <i class="fa-solid fa-star text-yellow-400"></i> {{ listItem.vote_average }}</li>
                          <li>개봉일 {{ listItem.release_date }}</li>
                          <li>상영시간 {{ listItem.runtime }}분</li>
                          <li><span v-for="e in (listItem.production_countries)" :key="e" class="after:content-[','] after:mr-1 last:after:content-none">{{ e.name }}</span></li>
                          <li class="mt-2 align-text-bottom" v-if="listItem.homepage !== ''"><button class="p-[2px] px-1 rounded cursor-pointer text-sm border" @click="open_page(listItem.homepage)">보러가기</button></li>
                      </ul>
                      <ul class=" flex items-start gap-5 mt-5 text-md text-slate-100" v-if="providers !== undefined">
                        <li class="px-3 border border-slate-800 rounded-xl pb-2 bg-slate-700 bg-opacity-40" v-if="providers.flatrate !== undefined">스트리밍<p class="flex gap-x-2"><span v-for="i in (providers.flatrate)" :key="i"><img :src="'https://www.themoviedb.org/t/p/original/'+(i.logo_path)" :alt="i.provider_name" class="w-8 rounded"></span></p></li>
                        <li class="px-3 border border-slate-800 rounded-xl pb-2 bg-slate-700 bg-opacity-40" v-if="providers.buy !== undefined">구매<p class="flex gap-x-2"><span v-for="i in (providers.buy)" :key="i"><img :src="'https://www.themoviedb.org/t/p/original/'+(i.logo_path)" :alt="i.provider_name" class="w-8 rounded"></span></p></li>
                        <li class="px-3 border border-slate-800 rounded-xl pb-2 bg-slate-700 bg-opacity-40" v-if="providers.rent !== undefined">대여<p class="flex gap-x-2"><span v-for="i in (providers.rent)" :key="i"><img :src="'https://www.themoviedb.org/t/p/original/'+(i.logo_path)" :alt="i.provider_name" class="w-8 rounded"></span></p></li>
                      </ul>
                  </div>
              </div>
              <div class="text-sm max-w-3xl mt-5" v-if="listItem.overview !== ''">
                  {{ listItem.overview }}
              </div>
              <div class="text-sm max-w-3xl mt-5 text-slate-400" v-else>
                아직 줄거리가 등록되지 않았습니다.
              </div>
          </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "DetailPage",
    data(){
        return{
            listId: this.$route.params.id,
            listItem: {},
            providers:[]
        }
    },
    created(){
    axios.get(`https://api.themoviedb.org/3/movie/${this.listId}?api_key=f70d8115a6b978265c6796a7126e21e1&language=ko-KR`).then((movies)=>{
        this.listItem = movies.data;
        console.log(movies.data);
    }).catch((error)=>{
      console.log(error);
    }),
    axios.get(`https://api.themoviedb.org/3/movie/${this.listId}/watch/providers?api_key=f70d8115a6b978265c6796a7126e21e1&language=ko-KR`).then((movieP)=>{
        this.providers = movieP.data.results.KR;
        console.log(this.providers);
    }).catch((error)=>{
      this.providers = undefined;
      console.log(error);
    })
  },
  methods:{
    open_page(url){
      window.open(url);
    },
    goBack(){
        this.$router.go(-1);
    },
    
},
  computed:{
    ResultList(){
      return this.listItem.filter((data)=>{
        if(data.id === Number(this.listId)){
          return data.id
        }else{
          return null
        }
      })
    }
  }
}
</script>
<style>
</style>