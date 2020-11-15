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
        <router-link to="/restaurant">Restaurant</router-link>
        <router-link to="/signup">Sign Up</router-link>
        <hr>
        <router-link to="/login">Log In</router-link>
      </div>
      <div class = "content">
        <h2>Create Account</h2>
        <div class="signupcontainer">
            <form class="card-panel" v-on:submit.prevent="signUpUser">
                <label for="email">Email:</label>
                <div class="field">
                    <span><input type="email" name="email" v-model="email"></span>
                </div>
                <label for="password">Password:</label>
                <div class="field"> 
                    <span><input type="password" name="password" v-model="password"></span>
                </div>
                <label for="username">Username:</label>
                <div class="field">
                    <span><input type="text" name="username" v-model="username"></span>
                </div>
                <label for="lname">Account Type</label>
                <select id="rating" name="rating" v-model.lazy="acc_type">
                <option value=User>User</option>
                <option value=Merchant>Merchant</option>
                </select>
                <input type="submit" value="Submit"/>
            </form>
            </div>
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
      acc_type: 'User'
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
          user_type.user_id = uid;
          console.log(uid);
          console.log(vm.acc_type);
          user_type.user_type = vm.acc_type;
          database.collection('user_type').doc(uid).set(user_type).then(function() {
          console.log("user successfully written to users type collection!");
          })
        .catch(function(error) {
          console.error("Error writing new user to user type collection: ", error);
          });

        if (vm.acc_type == 'User') {
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
        vm.$router.push({name: 'home'})
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
  /*height: auto;*/
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

.signupcontainer {
  border: 2px solid #ccc;
  background-color: #eee;
  padding: 5px;
  border-radius: 10px 10px 10px 10px;
  margin-top: 10px;
  height:30%;
  width: 20%;
  margin: auto;

}

.register {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
  height: 20%;
}

input {
    width: 100%;
}
span {
    display: block;
    overflow: hidden;
    padding-right:10px;
}
</style>
