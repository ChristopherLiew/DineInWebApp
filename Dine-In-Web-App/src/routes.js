import Home from './components/Home.vue'
import Profile from './components/Profile.vue'
import Map from './components/Map.vue'
import RestSignup from './components/RestSignup.vue'
import UserSignup from './components/UserSignup.vue'

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
        path:'/submitrestaurant',
        component: RestSignup
    },
    {
        path:'/usersignup',
        component: UserSignup
    }
]