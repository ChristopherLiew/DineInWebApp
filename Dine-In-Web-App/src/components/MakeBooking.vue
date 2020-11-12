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
        <router-link to="/submitrestaurant">Submit restaurant</router-link>
        <router-link to="/usersignup">Sign Up</router-link>
    </div>

    <div class="content">
        <div class="form">
            <h2>Make a reservation for { restaurant name }</h2> <!--pass name over-->
            <div class="seats">
                <label for="people">Number of People</label>
                <br>
                <span>
                <button class="seatbutton" value=1>1</button>
                <button class="seatbutton" value=2>2</button>
                <button class="seatbutton" value=3>3</button>
                <button class="seatbutton" value=4>4</button>
                <button class="seatbutton" value=5>5</button>
                </span>
            </div>
            <br>
            <div class="time">
                <label for="timeslot">Choose Timeslot</label>
                <span><input type="datetime-local" id="time" name="time" placeholder="EST"/></span>
            </div>
            <div class="confirmation">
                <p> Your reservation details are as follows </p>
                <!-- Pass over info here -->
            </div>
            <button class="reservebutton">Make Reservation</button>
        </div>
      
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

.seatbutton {
  background-color: whitesmoke;
  border: none;
  color: black;
  padding: 16px;
  margin: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
}

.seatbutton:focus{
    background-color:rgb(50, 223, 50);
}

.reservebutton {
  display: block;
  margin-left: auto;
  margin-right: auto;
  font-size : 20px;
  color: white;
  background-color: green;
  border-radius: 10px 10px 10px 10px;
  width: 25%;
  height: 15%;
}

.form {
  border: 2px solid #ccc;
  background-color: #eee;
  padding: 5px;
  border-radius: 10px 10px 10px 10px;
  margin-top: 10px;
  height:40%;
  width: 90%;
  margin: auto;
}

span {
    display: block;
    overflow: hidden;
    padding-right:10px;
}

input {
    width: 100%;
}

</style>