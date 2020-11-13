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
            <h2>Update your current vacancies</h2> <!--pass name over-->
            <div class="seats">
                <div class="vacancies">
                    <div class="tabletype">
                        <p>No. of One Seater Tables available</p>
                    </div>
                    <div class="available seats">
                        <p>{{this.vacancy.one_seater}}</p>
                    </div>
                    <input type="text" id="one_seaters" name="one_seaters" v-model="edited_vacancy.one_seater">
                    <!-- <div class="adjustments">
                        <button class="adjustseats" @click="minusSeat(1)">-</button>
                        <button class="adjustseats" @click="addSeat(1)">+</button>
                    </div> -->
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
                    <tr v-for="(reservation ,i) in restaurant_reservations" :key="i">
                    <th scope="row">{{i + 1}}</th>  
                    <td>{{ reservation.user_name }}</td> 
                    <td>{{ reservation.datetime }}</td> <!-- Format nicely in DOW/ DATE/ TIME -->
                    <td>{{ reservation.pax }}</td>
                    <td><button @click="cancelReservation(reservation.reservation_id)">Cancel Reservation</button></td>
                    <td><button @click="blackListUser(reservation.user_id)">Customer No Show</button></td>
                    </tr>
                </tbody>
                </table>
            </div>
            <button @click="updateResVacancy()"> Update </button>
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
// 4) Add in separate local variables i/e duplicate vacancy, v-model current input to that duplicate and upon update -> update document with the duplicate

import firebase from '../firebase.js'
const database = firebase.firestore();

export default {
  data() {
    return {
      email: null,
      password: null,
      restaurant_reservations: [],
      merchant_id: null,
      vacancy: {
        five_seater: 0,
        four_seater: 0,
        three_seater: 0,
        two_seater: 0,
        one_seater: 0,
        total_seats: 0
      },
      edited_vacancy: {
        five_seater: 0,
        four_seater: 0,
        three_seater: 0,
        two_seater: 0,
        one_seater: 0,
        total_seats: 0
      },
      capacity: {
        five_seater: 0,
        four_seater: 0,
        three_seater: 0,
        two_seater: 0,
        one_seater: 0,
        total_seats: 0
      }
    }
  },
  methods: {
    // TBD:
    // 1) Increment & Decrement (Check if it is larger than max)
    // Get latest vacancy status
    getResVacancy: function() {
        console.log("Pulling restaurant vacancy data")
              database.collection('merchants').where("merchant_id", "==", this.merchant_id).get().then((querySnapShot) => {
              querySnapShot.forEach(doc=> {
                  this.doc_id = doc.id;
                  if (doc.data().status == "new") {
                    this.merchant_id = doc.data().merchant_id;
                  } else {
                    this.vacancy = doc.data().vacancy;
                    this.capacity = doc.data().capacity;
                  }
                }
              )
            }).catch(function(error) {
              console.log("Error getting restaurant capacity data: ", error);
            })
        },
    // Update vacancies
    updateResVacancy: function() { 
        this.edited_vacancy.five_seater = parseInt(this.edited_vacancy.five_seater);
        this.edited_vacancy.four_seater = parseInt(this.edited_vacancy.four_seater);
        this.edited_vacancy.three_seater = parseInt(this.edited_vacancy.three_seater);
        this.edited_vacancy.two_seater = parseInt(this.edited_vacancy.two_seater);
        this.edited_vacancy.one_seater = parseInt(this.edited_vacancy.one_seater);
        this.edited_vacancy.total_seats = this.edited_vacancy.five_seater + this.edited_vacancy.four_seater + this.edited_vacancy.three_seater + this.edited_vacancy.two_seater + this.edited_vacancy.one_seater;
        database.collection('merchants').doc(this.doc_id).update({"vacancy": this.edited_vacancy}).then(function() {
          console.log("Updated!")
          })
        .catch(function(error) {
          console.log("Error updating vacancy data: ", error);
        });
        alert("Your merchant profile has been updated successfully!");
      },
    // Get Reservations
    getRestRes: function() {
              database.collection('reservations').get().then((querySnapShot) => {
              console.log("Getting all reservations for merchant")
              querySnapShot.forEach(doc=> {
                if (doc.data().merchant_id == this.merchant_id) {
                  let reservation = {};
                  reservation.reservation_id = doc.id;
                  reservation.user_name = doc.data().user_name;
                  reservation.user_id = doc.data().user_id;
                  let reservation_date = doc.data().date_reserved.toDate().toDateString();
                  let reservation_time = new Date(doc.data().date_reserved * 1000).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}); 
                  reservation.datetime = reservation_date + " " + reservation_time;
                  reservation.pax = doc.data().pax;
                  this.restaurant_reservations.push(reservation);
                }
              })
            }).catch(function(error) {
              console.log("Error getting documents: ", error);
            })
          },
    // Allow owner to cancel reservations + send notifs???
    cancelReservation: function(res_id){
        database.collection("reservations").doc(res_id).delete().then(function() {
            console.log("Document successfully deleted!");
            alert("You have cancelled this reservation!")
            location.reload() // Refresh
          }).catch(function(error) {
            console.error("Error deleting reservation: ", error);
          });
    },
    blackListUser: function(user_id) {
      database.collection('users').where('user_id', '==', user_id).get().then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          var user_doc_id = doc.id;
          var num_strikes = doc.data().strikes + 1;
          // Increase strike count by 1
          database.collection('users').doc(user_doc_id).update({"strikes": num_strikes}).then(function() {
          console.log("Striked!")
          })
        .catch(function(error) {
          console.log("Error striking user! : ", error);
        });
        alert("User given a strike!");
        })
      })
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
        this.merchant_id = user.uid;
        console.log("Getting signed in user")
        this.getRestRes();
        this.getResVacancy();
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