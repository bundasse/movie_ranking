<template>
    <div class="flex flex-wrap gap-5 p-4 bg-black text-slate-500 text-xl font-extrabold">
        <p :class=" $route.path === '/' && 'text-rose-500'">
          <router-link to="/">홈</router-link>
        </p>
        <p :class=" $route.path === '/new' && 'text-rose-500'">
          <router-link to="/new">현재 상영작</router-link>
        </p>
    </div>
</template>
<script>
  export default {
    name: 'NaviMenu'
  }
</script>
<style>
    
</style>