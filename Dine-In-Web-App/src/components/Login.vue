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
        <router-link to="/signup">Sign Up</router-link>
        <hr>
        <router-link to="/login">Log In</router-link>
    </div>

    <div class="content12">
      <h2>Login Page</h2>
      <h3>Please enter the following:</h3>
      <input type="text" v-model="email" placeholder="Email Address">
      <br>
      <input type="text" v-model="password" placeholder="Password">
      <br>
      <button class= "smallinteractbutton" @click="logInUser()">Log In</button>
      <button class= "smallinteractbutton" @click="goToSignUp()">Sign Up</button> <!-- Link to registration page to fill in details -->
    </div>
  </body>

</div>
</template>
<script>

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
      console.log("in login function!")
      var vm = this;
      var email = this.email // Trim white spaces
      firebase.auth().signInWithEmailAndPassword(email.trim(), this.password).then(function() {
        let uid = firebase.auth().currentUser.uid;
        console.log("User id: " + uid)
        // Check user type
        database.collection('user_type').where("uid", "==", uid).get().then((querySnapShot) => {
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



/* background colour */
div.content {
  margin-left: 200px;
  padding: 1px 16px;
  
  
}

.content12 {
  margin-left: 200px;
  padding: 1px 16px;
  height: 2500px;
  width: auto;
  background-color:#FFE4E1;
}

/* login and signup buttons */
.smallinteractbutton {
    width: 10%;
    background-color: #4caf50;
    color: white;
    padding: 14px 20px;
    margin-right: 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

</style>