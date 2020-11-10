import Home from './components/Home.vue'
import Profile from './components/Profile.vue'
import Map from './components/Map.vue'
import RestSignup from './components/RestSignup.vue'
import UserSignup from './components/UserSignup.vue'
import Review from './components/Review.vue'
import SearchBar from './components/SearchBar.vue'
import Login from './components/Login.vue'
import Resto from './components/Resto.vue'
import UserReservations from './components/UserReservations.vue'

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
        name: 'restsignup',
        path:'/submitrestaurant',
        component: RestSignup
    },
    {
        name: 'usersignup',
        path:'/usersignup',
        component: UserSignup
    },
    {
        name: 'review',
        path:'/review/:user_id/:merchant_id', // Ensure params data persists on refresh
        component: Review
        path:'/search',
        component: SearchBar
    },
    {
        path:'/login',
        component: Login
    },
    {
        name: 'restaurant',
        path:'/restaurant/:id',
        component: Resto
    },
    {
        path: '/myreservations',
        component: UserReservations
    }
]