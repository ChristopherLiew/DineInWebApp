import Home from './components/Home.vue'
import Profile from './components/Profile.vue'
import Map from './components/Map.vue'
import RestSignup from './components/RestSignup.vue'
import Signup from './components/Signup.vue'

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
        path:'/signup',
        component: Signup
    }
]