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
        <router-link to="/restdetails">Merchant Profile</router-link>
        <router-link to="/restbackend">Merchant Backend</router-link>
        <router-link to="/signup">Sign Up</router-link>
        <a href="#" @click="logOut()">Log Out</a>
    </div>

    <div class="content">
        <div class="form">
            <h2>Make a reservation for { this.restaurant_name }</h2> <!--pass name over-->
            <div class="seats">
                <div class="vacancies">
                    <div class="tabletype">
                        <p>No. of One Seater Tables available</p>
                    </div>
                    <div class="available seats">
                        <p>{{this.oneSeaters}}</p>
                    </div>
                    <div class="adjustments">
                        <button class="adjustseats" @click="minusSeat(1)">-</button>
                        <button class="adjustseats" @click="addSeat(1)">+</button>
                    </div>
                </div>
            </div>
            <br>
            <div class="reservationlist">
                <table>
                    <thead>
                    <tr>
                    <th></th>
                    <th>Restaurant</th>
                    <th>Date</th>
                    <th>Pax</th>
                    <th>Cancel Reservation</th>
                    <th>Leave a Review</th>
                    </tr>
                    </thead>
                <tbody>
                    <tr v-for="(reservation ,i) in user_reservations" :key="i">
                    <th scope="row">{{i + 1}}</th>  
                    <td>{{ reservation.merchant_name }}</td> 
                    <td>{{ reservation.datetime }}</td> <!-- Format nicely in DOW/ DATE/ TIME -->
                    <td>{{ reservation.pax }}</td>
                    <td><button @click="cancelReservation(reservation.reservation_id)">Confirm Reservation</button></td>
                    <td><button @click="blacklistCustomer(user_id)">Customer did not show up</button></td> <!-- Go to review form -->
                    </tr>
                </tbody>
                </table>
            </div>
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
const database = firebase.firestore();

export default {
  data() {
    return {
      email: null,
      password: null,
      restaurant_reservations: [],
      user_id: null
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
    },
    getUserRes: function() {
        console.log("getUserRes called");
              database.collection('reservations').get().then((querySnapShot) => {
              querySnapShot.forEach(doc=> {
                if (doc.data().user_id == this.user_id) {
                  let reservation = {};
                  reservation.reservation_id = doc.id;
                  reservation.merchant_name = doc.data().merchant_name;
                  let reservation_date = doc.data().date_reserved.toDate().toDateString();
                  let reservation_time = new Date(doc.data().date_reserved * 1000).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}); 
                  reservation.datetime = reservation_date + " " + reservation_time;
                  reservation.pax = doc.data().pax;
                  this.user_reservations.push(reservation);
                }
              })
            }).catch(function(error) {
              console.log("Error getting documents: ", error);
            })
          },
    cancelReservation: function(res_id){
        database.collection("reservations").doc(res_id).delete().then(function() {
            console.log("Document successfully deleted!");
            alert("Your reservation has been cancelled!")
            location.reload() // Refresh
          }).catch(function(error) {
            console.error("Error deleting reservation: ", error);
          });
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
    firebase.auth().onAuthStateChanged((user) => { // Use arrows so it knows that the context of this is our data()
      if (user) {
        console.log(user.uid);
        this.user_id = user.uid;
        console.log("Getting signed in user")
        this.getUserRes();
      } else {
       console.log("Can't get signed in user")
      }
    })
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

.adjustseats {
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


/*.reservebutton {
  display: block;
  margin-left: auto;
  margin-right: auto;
  font-size : 20px;
  color: white;
  background-color: green;
  border-radius: 10px 10px 10px 10px;
  width: 25%;
  height: 15%;
}*/

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

/*table css for reservation*/
table {
  border-collapse: collapse;
  width:100%;
}

th, td {
  text-align: center;
  padding: 8px;
}

tr:nth-child(even){background-color: #f2f2f2}

th {
  background-color: #36ac3a;
  color: white;
}


</style>