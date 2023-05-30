<template>
    <div class="w-full h-full min-h-screen -z-50 bg-black px-[2%] box-border">
        <div class="max-w-7xl border p-10 bg-gray-900 text-white w-full text-center rounded-lg shadow-lg mx-auto">
            <h3 class="text-5xl mb-5 font-extrabold">404 Error!</h3>
            <img src="https://cdn.dribbble.com/users/2054184/screenshots/6309824/no-fluffy.gif" alt="404 Error" class="mx-auto w-[70%] lg:w-[40%] rounded-xl mb-10">
            <p class="text-lg font-normal text-slate-300 mt-0 mb-3">해당 페이지를 찾을 수 없습니다.</p>
            <p class="text-lg font-normal text-slate-300 mt-0 mb-6">아래 버튼을 눌러 메인으로 이동하실 수 있습니다.</p>
            <router-link to="/" class="py-1 px-10 border rounded transition-all hover:text-white hover:shadow-[inset_-60px_0_0_0_#F43F5E,inset_60px_0_0_0_#F43F5E] duration-300">메인으로</router-link>
        </div>
        <div class="text-slate-600 text-center my-5 text-sm">
        image created by <a href="https://dribbble.com/shots/6309824-No-Fluffy" class="underline" target="blank" title="Petter Pentilä(new tab)">Petter Pentilä</a>.
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            count: 5
        }
    },
    mounted(){
        // this.CountDown();
    },
    methods: {
        // CountDown(){
        //     if (this.count > 0) {
        //         setTimeout(() => {
        //         this.count--;
        //         this.CountDown();
        //         }, 1000); //Vue에서는 setInterval을 쓸 수 없다!
        //     }else{
        //         this.$router.replace('/');
        //     }
        // }
    },
}
</script>
<style>
    
</style>