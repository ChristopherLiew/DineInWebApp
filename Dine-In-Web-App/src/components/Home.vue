<template>
  <div>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href='https://fonts.googleapis.com/css?family=Sofia' rel='stylesheet'>
    </head>
   
    <body>
      <div class="sidebar">
        <div class="icon" :style="{
            'background-image': 'url(https://firebasestorage.googleapis.com/v0/b/dineinwebapp.appspot.com/o/Site%20Images%2Fmain_logo.png?alt=media&token=024c04f1-2b1a-4e35-9651-da1aa5a17fbd)',
          }">
          <h2 div = "fancyfont"><router-link to="/">DineIn</router-link></h2>
        </div>
        <router-link to="/">Home</router-link>
        <router-link to="/profile">Profile</router-link>
        <div v-if="user_id == null">
        <router-link to="/signup">Sign Up</router-link>
        <div>
        <a href="https://dontgojsonwaterfalldashboard.herokuapp.com/">Covid19</a>
        </div>
        <hr>
        <router-link to="/login">Log In</router-link>
        </div>
        <div v-if="user_id">
        <hr>
        <a href="#" @click="logOut()">Log Out</a>
        </div>
      </div>
      <div class="welcomepicture">
        <div
          class="info"
          :style="{
            'background-image': 'url(https://firebasestorage.googleapis.com/v0/b/dineinwebapp.appspot.com/o/Site%20Images%2Fbanner.jpg?alt=media&token=5525b3e1-430e-4e9b-ab46-576052cd40be)',
          }"
        >
          <h1 style="color:White">What shall we explore today?</h1>
          <div class ="searcharea">
          <search></search>
          </div>
        </div>
      </div>
    
      <div v-if="data_loaded" class="content">
        <br>
        
        <h1>Indian Food</h1>
        <div class="row">
        <div class="displaycard" v-for="merchant in carousel_one" :key="merchant.merchant_id">
          <!-- Change this.carousel_one = this.getCarouselData('indian');-->
          <div class="displaycard">
            <img :src="merchant.imgURL.food" alt="merchant.merchant_name" class="frontpic">
            <br>
            <router-link :to="{ name: 'restaurant', params: { id: merchant.merchant_id }}">{{merchant.merchant_name}}</router-link>
          </div>
          </div>
        </div>
        <h1>Chinese Food</h1>
        <div class="row">
        <div class="displaycard" v-for="merchant in carousel_two" :key="merchant.merchant_id">
          <!-- Change to carousel_two and add this.carousel_two = this.getCarouselData('chinese');-->
          <div class="displaycard">
            <img :src="merchant.imgURL.food" alt="merchant.merchant_name" class="frontpic">
            <br>
            <router-link :to="{ name: 'restaurant', params: { id: merchant.merchant_id }}">{{merchant.merchant_name}}</router-link>
          </div>
          </div>
        </div>
        <h1>Malay Food</h1>
        <div class="row">
        <div class="displaycard" v-for="merchant in carousel_three" :key="merchant.merchant_id"> 
          <!-- Change to carousel_three and add this.carousel_three = this.getCarouselData('malay');-->
          <div class="displaycard">
            <img :src="merchant.imgURL.food" alt="merchant.merchant_name" class="frontpic">
            <br>
            <router-link :to="{ name: 'restaurant', params: { id: merchant.merchant_id }}">{{merchant.merchant_name}}</router-link>
          </div>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import firebase from '../firebase.js';
import search from './SearchBar.vue';
const database = firebase.firestore();

export default {
  components: {
    search
  },
  data() {
    return {
      merchantInfo: {
        imgURL: null
      },
      carousel_one: null,
      carousel_two: null,
      carousel_three: null,
      user_id: null, 
      loaded: false, 
      uploadPct: 0,
      imageData: null,
      data_loaded: false
    }
  },
  methods: {
    getCarouselData: function(cuisine) {
      let carousel_data = [];
      database.collection('merchants').where("cuisine", "==", cuisine).get().then((querySnapshot) => {
        querySnapshot.forEach(doc => {
        let merchant = {
          merchant_id: null,
          merchant_name: null,
          imgURL: {
            'interior': null,
            'exterior': null,
            'food': null
          }
        }
          merchant.merchant_id = doc.data().merchant_id; // For route params/ link
          merchant.merchant_name = doc.data().merchant_name;
          merchant.imgURL = doc.data().imgURL; // All interior, exterior and food images
          carousel_data.push(merchant);
        })
      })
      this.data_loaded = true;
      return carousel_data;
    },
    goToLogin: function() {
      this.$router.push({name: "login"});
    },
    goToSignUp: function() {
      this.$router.push({name: "signup"});
    },
    logOut: function() {
      firebase.auth().signOut().then(function() {
        alert("You have successfully logged out!")
        console.log("logging out!")
        }).catch(function(error) {
          console.log("Error:", error);
        });
        location.reload();
    }
},
  // Lifecycle Hooks 
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user_id = user.uid;
        console.log("Getting signed in user")
      }
    });
    this.carousel_one = this.getCarouselData('western');
    this.carousel_two = this.getCarouselData('indian');
    this.carousel_three = this.getCarouselData('malay');
  }
}

</script>

<style>
body {
  margin: 0;
  font-family: "Lato", sans-serif;
}

.iconDetails {
  float: left;
  height: 70px;
  width: 70px;
}

.info {
  background: rgba(0, 0, 0, 0.5);
  color: black;
  
  width: 100%;
  height: 10%;
  padding: 80px;
  text-align: center;
}

.icon {
  text-align: center;
  font-family:"Luminari";
}

.sidebar {
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
  position: fixed;
  height: 100%;
  overflow: auto;
}

.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}

.sidebar a.active {
  background-color: #D9A59F;
  color: white;
}

.sidebar a:hover:not(.active) {
  background-color: #D9A59F;
  color: white;
}
.fancyfont {
  
  font-family: 'Alex Brush';
  font-size: 22px;
}

div.content {

  margin-left: 200px;
  padding: 1px 16px;
  height: 2500px;
  width: auto;
  background-color:#FFE4E1;
  
}

.stati:hover {
  -moz-box-shadow: 0px 0.4em 0.5em rgb(0, 0, 0, 0.8);
  -webkit-box-shadow: 0px 0.4em 0.5em rgb(0, 0, 0, 0.8);
  box-shadow: 0px 0.4em 0.5em rgb(0, 0, 0, 0.8);
}

.stati div {
  display: block;
}
.stati div b {
  font-size: 2em;
  width: 100%;
  float: right;
  text-align: right;
  display: block;
}
.stati div span {
  font-size: 1.2em;
  width: 100%;
  color: rgb(0, 0, 0, 0.8);
  display: block;
  float: right;
  text-align: right;
}

.stati.bg-turquoise {
  background: rgb(26, 188, 156);
  color: white;
}


/* Float four columns side by side */

.column2 {
  float: left;
  width: 35%;
  padding: 0 5px;
  margin-left: 20px;
}

/* Clear floats after the columns */

/* Responsive columns */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 10px;
  }
}
.welcomepicture {
  height: auto;
  
}

.searcharea {
  display: grid;
  place-items: center;
}

/* Style the counter cards */
.displaycard {
  padding: 14px 20px;
  text-align: center;
  display: inline-block;
  width: auto;
  border-radius: 10px 10px 10px 10px;
  background-color: whitesmoke;
  margin: 1rem;
}

.frontpic {
  width:400px;
  height:300px;
}

.row {
  overflow-x: scroll;
 
  white-space: nowrap;
  
}

::-webkit-scrollbar {
  width: 0px; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}
</style>