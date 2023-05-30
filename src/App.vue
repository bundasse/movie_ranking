<template>
  <NaviMenu />
  <RouterView />
</template>
<script>
import NaviMenu from "./components/Navi.vue"
export default {
  name: 'App',
  components:{
    NaviMenu
  }
}
</script>

<style>
</style>
