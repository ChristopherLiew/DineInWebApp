<template>
  <div>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>

    <body>
      <div class="sidebar">
        <div class="icon">
          <h2>Dinein</h2>
        </div>
        <router-link to="/">Home</router-link>
        <router-link to="/profile">Profile</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/restaurant">Restaurant</router-link>
        <router-link to="/submitrestaurant">Submit restaurant</router-link>
        <router-link to="/usersignup">Sign Up</router-link>
        <router-link to="/booking">Make a Booking</router-link>
      </div>
      <div class="accountbar">
        <button class="login" @click="goToLogin">Login</button>
        <button class="signup" @click="goToSignUp">Sign Up</button>
      </div>
      <div class="content">

        <div
          class="info"
          :style="{
            'background-image': 'url(https://vuejs.org/images/logo.png)',
          }"
        >
          <h1>What shall we explore today?</h1>
          <search></search>
        </div>
        <div class="row">
          <h1>Japanese Food</h1>
          <div class="cards">
            <div class="card">
              <img
                class="card-img-top"
                src="https://placekitten.com/g/200/200"
                alt="Card image cap"
                height="100"
                width="100"
                style="border-radius: 0.6rem"
              />
              <div class="card-block">
                <h4 class="card-title">Name</h4>
                <p class="card-text">Some quick example text to build</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
            <div class="card">
              <img
                class="card-img-top"
                src="https://placekitten.com/g/200/200"
                alt="Card image cap"
                height="100"
                width="100"
                style="border-radius: 0.6rem"
              />
              <div class="card-block">
                <h4 class="card-title">Name</h4>
                <p class="card-text">Some quick example text to build</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
            <div class="card">
              <img
                class="card-img-top"
                src="https://placekitten.com/g/200/200"
                alt="Card image cap"
                height="100"
                width="100"
                style="border-radius: 0.6rem"
              />
              <div class="card-block">
                <h4 class="card-title">Name</h4>
                <p class="card-text">Some quick example text to build</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
            <div class="card">
              <img
                class="card-img-top"
                src="https://placekitten.com/g/200/200"
                alt="Card image cap"
                height="100"
                width="100"
                style="border-radius: 0.6rem"
              />
              <div class="card-block">
                <h4 class="card-title">Name</h4>
                <p class="card-text">Some quick example text to build</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
            <div class="card">
              <img
                class="card-img-top"
                src="https://placekitten.com/g/200/200"
                alt="Card image cap"
                height="100"
                width="100"
                style="border-radius: 0.6rem"
              />
              <div class="card-block">
                <h4 class="card-title">Name</h4>
                <p class="card-text">Some quick example text to build</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
            <div class="card">
              <img
                class="card-img-top"
                src="https://placekitten.com/g/200/200"
                alt="Card image cap"
                height="100"
                width="100"
                style="border-radius: 0.6rem"
              />
              <div class="card-block">
                <h4 class="card-title">Name</h4>
                <p class="card-text">Some quick example text to build</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <h1>Japanese Food</h1>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import firebase from '../firebase.js';
import search from './SearchBar.vue';
const database = firebase.firestore();
const storage = firebase.storage();

export default {
  components: {
    search
  },
  data() {
    return {
      merchantInfo: {
        imgURL: null
      },
      merchant_id: 1, // Should be passed as a prop from Login Page. Upon Log In, Auth should return user_id and update parent before passing to profile
      loaded: false, // Triggered when data has sucessfully been pulled after Vue app is mounted
      uploadPct: 0,
      imageData: null,
    }
  },
  methods: {
    // 1) Pull profile information from Firebase
    fetchMerchant: function() {
      database.collection('merchants').where("merchant_id", "==", this.merchant_id).get().then((querySnapShot) => {
        querySnapShot.forEach(doc=>{
          console.log("Merchant data =>", doc.data());
          // Document ID
          this.doc_id = doc.id;
          // Merchant Profile Data
          this.merchantInfo.merchant_name = doc.data().merchant_name;
          this.merchantInfo.address = doc.data().address;
          this.merchantInfo.merchant_rating = doc.data().merchant_rating;
          // Operating Info 
          this.merchantInfo.opening_hours = doc.data().opening_hours;
          this.merchantInfo.closing_hours = doc.data().closing_hours;
          // Profile Image URL
          this.merchantInfo.carousel_imgURL = doc.data().carousel_imgURL;
          // Data loaded sucessfully
          this.loaded = true;
        })
      }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    },
    // THIS SECTION SHOULD EVENTUALLY GO INTO RESTAURANT BACKEND !!!
    updateMerchantProfile: function() {
      database.collection('merchants').doc(this.doc_id).update(
        this.merchantInfo
        ).then(function() {
          console.log("Merchant information successfully updated!")
        }).catch(function(error) {
          console.log("Error updating Merchant information: ", error);
        })
    },
    setMerchantImage: function() {
        let uploadTask = storage.ref(`${this.imageData.name}`).put(this.imageData);
        uploadTask.on('state_changed', 
        snapshot => {
          this.uploadPct = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        },
        error => {
          console.log("Error uploading Merchant picture ", error);
        },
        () => {
          this.uploadPct = 100;
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.merchantInfo.carousel_imgURL = downloadURL; // Profile Info has image URL and can directly pull with img tag
            this.updateProfile(); // Call on update profile to update downloadURL
            console.log("New Merchant image available at: ", downloadURL);
          })
        }
      )
    },
    inputImage(event) {
      this.uploadValue=0;
      this.picture=null;
      this.imageData = event.target.files[0];
    },
    goToLogin: function() {
      this.$router.push({name: "login"});
    },
    goToSignUp: function() {
      this.$router.push({name: "usersignup"});
    }
  },
  // Lifecycle Hooks 
  created() {
    this.fetchMerchant()
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
  background-image: restopic1;
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  width: 100%;
  height: 10%;
  padding: 80px;
  text-align: center;
}

.icon {
  text-align: center;
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
  background-color: #4caf50;
  color: white;
}

.sidebar a:hover:not(.active) {
  background-color: #555;
  color: white;
}

div.content {
  height: auto;
  background-image: linear-gradient(rgb(78, 223, 78), rgb(85, 199, 228));
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

.* {
  box-sizing: border-box;
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
.accountbar {
  height: auto;
}

.login {
  float: right;
  background-color: blue; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
}

.signup {
  float: right;
  background-color: blue; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
}
/* Style the counter cards */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 5px;
  text-align: center;
  background-color: white;
  width: 20rem;
  display: inline-block;
}

.cards {
  padding: 16px;
  overflow: scroll;
  white-space: nowrap;
}

::-webkit-scrollbar {
  width: 0px; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}
</style>