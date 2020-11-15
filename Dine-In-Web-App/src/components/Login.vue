<template>
<div>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>

  <body>
    <div class="sidebar">
      <div class="icon">
        <h2><router-link to="/">DineIn</router-link></h2>
      </div>
        <router-link to="/">Home</router-link>
        <router-link to="/profile">Profile</router-link>
        <router-link :to="{ name: 'restaurant', params: {id: '4czuiVI8sNQKcPRMVRgk0ahTKzc2'}}">Restaurant</router-link>
        <router-link to="/signup">Sign Up</router-link>
        <hr>
        <router-link to="/login">Log In</router-link>
    </div>

    <div class="content">
      <h2>Login Page</h2>
      <h3>Please enter the following:</h3>
      <input type="text" v-model="email" placeholder="Email Address">
      <br>
      <input type="text" v-model="password" placeholder="Password">
      <br>
      <button @click="logInUser()">Log In</button>
      <button @click="goToSignUp()">Sign Up</button> <!-- Link to registration page to fill in details -->
    </div>
  </body>

</div>
</template>
<script>
// TBD
// 1) Add in check for user strikes, if strikes = 3, disable user
// *https://firebase.google.com/docs/auth/admin/manage-users

import firebase from '../firebase.js'
const database = firebase.firestore();

export default {
  data() {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    // Test with logged in profile and check profile.vue also
    logInUser: function() {
      var vm = this;
      var email = this.email // Trim white spaces
      firebase.auth().signInWithEmailAndPassword(email.trim(), this.password).then(function() {
        let uid = firebase.auth().currentUser.uid;
        // Check user type
        database.collection('user_type').where("user_id", "==", uid).get().then((querySnapShot) => {
        querySnapShot.forEach(doc=> {
          let user_type = doc.data().user_type;
          if (user_type == "user") {
            // Check if blacklist
            database.collection('users').where("user_id", "==", uid).get().then((querySnapShot) => {
            querySnapShot.forEach(doc=> {
              let strikes = doc.data().strikes;
              if (strikes >= 3) {
                firebase.auth().signOut().then(function() {
                  alert("Your account has been disabled!")
                  }).catch(function(error) {
                    console.log("Error:", error);
                    });
              } else {
                alert("Welcome!")
                vm.$router.push({name: 'profile'})
              }
          })
          })
          } else {
            alert("Welcome!")
            vm.$router.push({name: 'restaurantmerch', params: {id: uid}})
          }
        })
        })
      }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
              console.log(error);
          });
    },
    signUpUser: function() { 
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/email-already-exists') {
            alert('Email already exists.');
        } else {
            alert(errorMessage);
        }
          console.log(error);
      });
    },
    goToSignUp: function() {
      this.$router.push({name: 'signup'});
    },
    logOut: function() {
      let vm = this;
      firebase.auth().signOut().then(function() {
        alert("You have successfully logged out!")
        console.log("logging out!")
        }).catch(function(error) {
          console.log("Error:", error);
        });
        vm.$router.push({name: 'home'})
    }
}
}

</script>

<style>
body {
  margin: 0;
  font-family: "Lato", sans-serif;
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
  background-color: #4CAF50;
  color: white;
}

.sidebar a:hover:not(.active) {
  background-color: #555;
  color: white;
}

div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
  background-image: linear-gradient( rgb(78, 223, 78), rgb(85, 199, 228));
}

</style>