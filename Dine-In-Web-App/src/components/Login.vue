<template>
<div>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
        <router-link to="/restdetails">Submit restaurant</router-link>
        <router-link to="/signup">Sign Up</router-link>
        <a href="#" @click="logOut()">Log Out</a>
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
// Logging In:
// 1) Key in email and password and submit
// 2) At the same time keep the email and password updated by using v-model for the input fields 
// 3) On hitting the submit button, trigger the logInUser function

import firebase from '../firebase.js'

export default {
  data() {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    // Test with logged in progile and check profile.vue also
    logInUser: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(function() {
        alert("Welcome!")
        // Check user type and route accordingly
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
      firebase.auth().signOut().then(function() {
        alert("You have successfully logged out!")
        }).catch(function(error) {
          console.log("Error:", error);
        });
    }
  },
  // Lifecycle Hooks 
  created() {
    
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