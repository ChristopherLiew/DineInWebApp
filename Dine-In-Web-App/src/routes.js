import Home from './components/Home.vue'
import Profile from './components/Profile.vue'
import Map from './components/Map.vue'
import SearchBar from './components/SearchBar.vue'
import Login from './components/Login.vue'
import Resto from './components/Resto.vue'
import UserReservations from './components/UserReservations.vue'

export default[
    {
        path:'/',
        component:Home
    },
    {
        path:'/profile',
        component: Profile
    },
    {
        path:'/map',
        component: Map
    },
    {
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