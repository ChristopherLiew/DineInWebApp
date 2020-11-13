import Home from './components/Home.vue'
import Profile from './components/Profile.vue'
import Map from './components/Map.vue'
import RestDetails from './components/RestDetails.vue'
import UserDetails from './components/UserDetails.vue'
import SignUp from './components/SignUp.vue'
import Review from './components/Review.vue'
import SearchBar from './components/SearchBar.vue'
import Login from './components/Login.vue'
import Resto from './components/Resto.vue'
import RestBackend from './components/RestBackend.vue'

export default[
    {
        name: "home",
        path:'/',
        component:Home
    },
    {
        name: "profile",
        path:'/profile',
        component: Profile
    },
    {
        name: 'map',
        path:'/map',
        component: Map
    },
    {
        name: 'restdetails',
        path:'/restdetails',
        component: RestDetails
    },
    {
        name: 'signup',
        path:'/signup',
        component: SignUp
    },
    {
        name: 'review',
        path:'/review/:user_id/:merchant_id', // Ensure params data persists on refresh
        component: Review
    },
    {   
        name: 'search',
        path:'/search',
        component: SearchBar
    },
    {
        name: 'login',
        path:'/login',
        component: Login
    },
    {
        name: 'restaurant',
        path:'/restaurant/:id',
        component: Resto
    },
    {
        name: 'restbackend',
        path:'/restbackend',
        component: RestBackend
    },
    {
        name: 'userdetails',
        path: '/userdetails',
        component: UserDetails
    }
]