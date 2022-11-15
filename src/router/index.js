import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import NotFoundComponent from '../views/notFoundPage.vue'
import signIn from '../Authentication/signIn.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      isAuth:false
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta:{
      isAuth:false
    }
  },
  {
    path: '/Log-In',
    name: 'login',
    component: signIn
  },
  {
    path: '/def-error',
    name: 'router-undefine',
    component: NotFoundComponent
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

let previouseRoute = {};

router.beforeEach((to, from, next) => {
  let finalres = to;
  console.warn(from,"*****");
  if(Vue.prototype.$isLogged == false){
    finalres = {
        name: 'login'
    }    
  }else{
    if(to.matched.length != undefined && to.matched.length == 0){
      finalres = {name:'router-undefine'};
    }
  }
  if(previouseRoute == null || previouseRoute.name != finalres.name){
    previouseRoute = finalres;
    next(finalres);
  }else{
    next();
  }
});

export default router
