import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        name: "MainHome",
        component: ()=> import('@/pages/Home')
    },
    {
        path: "/detail/:id",
        name: "DetailPage",
        component: ()=> import('@/pages/Detail')
    },
    {
        path: "/new",
        name: "NewContents",
        component: ()=> import('@/pages/New')
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/404",
    },
    {
        path: "/404",
        component: ()=> import('@/pages/NoPage')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;