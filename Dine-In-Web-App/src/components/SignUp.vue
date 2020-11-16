<template>
  <div>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
      <div class = "content">
        <h2>Create Account</h2>
        <h3>Please enter the following:</h3>
        <input type="text" name="email" v-model="email" placeholder="Email Address">
        <br>
        <input type="text" name="password" v-model="password" placeholder="Password">
        <br>
        <input type="text" name="username" v-model="username" placeholder="Username">
        <select id="rating" name="rating" v-model.lazy="acc_type">
          <option value=User>User</option>
          <option value=Merchant>Merchant</option>
        </select>
        <button class= "smallinteractbutton" @click="signUpUser">Sign Up</button>
        </div>
    </body>
  </div>
</template>

<script>
// Should have indiation if User or Restaurant based on that take them to the User Profile page or the Restaurant Profile page where they will populate info
import firebase from '../firebase.js'
const database = firebase.firestore()

export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      acc_type: 'user'
    }
  },
  methods: {
    signUpUser: function() { 
      var vm = this;
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(function() {
        let new_user = {};
        let uid = firebase.auth().currentUser.uid;

        // Create new user type ref in user_type reference
          let user_type = {};
          user_type.uid = uid;
          console.log(uid);
          console.log(vm.acc_type);
          user_type.user_type = vm.acc_type;
          database.collection('user_type').doc(uid).set(user_type).then(function() {
          console.log("user successfully written to user_type collection!");
          })
        .catch(function(error) {
          console.error("Error writing new user to user type collection: ", error);
          });

        if (vm.acc_type == 'user') {
          new_user.user_id = uid;
          new_user.email = vm.email;
          new_user.user_name = vm.username;
          new_user.status = "new";
          // Create user within user collection
          database.collection('users').doc(uid).set(new_user).then(function() {
          console.log("user successfully written to users collection!");
          })
        .catch(function(error) {
          console.error("Error writing new user to users collection: ", error);
          }); 
          vm.$router.push({name: "userdetails"}) // Change to user sign up details page

        } else {
          new_user.merchant_id = uid;
          new_user.status = "new";
          // Create merchant within merchant collection
          database.collection('merchants').doc(uid).set(new_user).then(function() {
          console.log("merchant successfully written to merchants collection!");
          })
        .catch(function(error) {
          console.error("Error writing new user to merchant collection: ", error);
          });
          vm.$router.push({name: "restdetails"})
        }
      }).catch(function(error) {
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


</style>
