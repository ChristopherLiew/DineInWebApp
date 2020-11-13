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
      <h2>My Reservations</h2>
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
       <td><button @click="cancelReservation(reservation.reservation_id)">X</button></td>
       <td><button>Review</button></td> <!-- Go to review form -->
    </tr>
   </tbody>
</table>
    </div>
  </body>
</div>
</template>

<script>
// Generate table based on past reservations for a given user's past reservations in the reservations collection
// FUNCTIONS:
// 1) Getter -> Pull all reservations belonging to a given user
// 2) V-FOR to loop over and create table
// 3) Review button -> Review Page
// 4) 
import firebase from '../firebase.js';
const database = firebase.firestore();

export default {
    data() {
      return {
        user_reservations: [],
        user_id: null
      }
    },
    methods: {
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

.column {
  float: left;
  padding: 10px;
 
}

.left {
  width: 60%;
}

.right {
  width: 37%;
}

.left1 {
  width: 46%;
}

.right1 {
  width: 48%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

table{
   overflow:auto;
   height:200px;
   
}

div.ex3 {
  width:auto;
  height: 410px;
  overflow: auto;
}

div.tablescroll {
  
  height: 300px;
  overflow: auto;
}
body {
  margin: 0;
  font-family: "Lato", sans-serif;
}

.iconDetails {
    float:left; 
    height:70px;
    width:70px;	
} 

.info {
    background-image: restopic1;
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  width: 100%;
  padding: 20px;
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
  height: auto;
  background-image: linear-gradient( rgb(78, 223, 78), rgb(85, 199, 228));
}

.stati{
    background: #fff;
    height: 4em;
    padding:1em;
    margin:1em 0; 
    
    margin-right:1.96em;
        -webkit-transition: margin 0.5s ease,box-shadow 0.5s ease; /* Safari */
        transition: margin 0.5s ease,box-shadow 0.5s ease; 
    -moz-box-shadow:0px 0.2em 0.4em rgb(0, 0, 0,0.8);
    -webkit-box-shadow:0px 0.2em 0.4em rgb(0, 0, 0,0.8);
    box-shadow:0px 0.2em 0.4em rgb(0, 0, 0,0.8);
    display:inline-block;
    vertical-align:top;

}
.stati:hover{ 
 
  -moz-box-shadow:0px 0.4em 0.5em rgb(0, 0, 0,0.8); 
-webkit-box-shadow:0px 0.4em 0.5em rgb(0, 0, 0,0.8); 
box-shadow:0px 0.4em 0.5em rgb(0, 0, 0,0.8); 
}

.stati div{
  
  display: block;
  
}
.stati div b {
  font-size:2em;
  width: 100%;
  float:right;
  text-align:right;
  display: block;
}
.stati div span {
  font-size:1.2em;
  width: 100%;
  color: rgb(0, 0, 0,0.8); 
  display: block;
  float:right;
  text-align:right;

}

.stati.bg-turquoise { background: rgb(26, 188, 156); color:white;} 


.testimonials {
  border: 2px solid #ccc;
  background-color: #eee;
  border-radius: 10px;
  padding: 5px;
  margin: 7px 0;
  width:115%;
  
}

/* Clear floats after containers */
.testimonials::after {
  content: "";
  clear: both;
  display: table;
}

/* Float images inside the container to the left. Add a right margin, and style the image as a circle */
.testimonials img {
  float: left;
  width:100%;
  border-radius: 50%;
}

/* Increase the font-size of a span element */
.testimonials span {
  font-size: 20px;
}


/* Float four columns side by side */
.column2 {
    float: left;
    width: 35%;
    padding: 0 5px;
    margin-left:20px;
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

/* Style the counter cards */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 5px;
  text-align: center;
  background-color: #444;
  color: white;
  
}

.cards {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
 
  background-color: white;
  color: black;
}

.fa {font-size:50px;}


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

input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

.forms {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}


</style>

