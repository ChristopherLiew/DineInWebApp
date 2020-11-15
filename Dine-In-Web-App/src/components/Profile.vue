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
        <router-link to="/restaurant">Restaurant</router-link>
        <router-link to="/signup">Sign Up</router-link>
        <hr>
        <a href="#" @click="logOut()">Log Out</a>
    </div>

    <div class="content">
      <!-- Can only review past reservations -->
      <h2>Upcoming Reservations</h2>
      <div class="pastreservations">
          <table class="styled-table">
          <thead>
            <tr>
            <th></th>
            <th>Restaurant</th>
            <th>Date</th>
            <th>Pax</th>
            <th>Cancel Reservation</th>
            </tr>
          </thead>
            <tbody>
              <tr v-for="(reservation ,i) in user_reservations" :key="i">
                <th scope="row">{{i + 1}}</th>  
                <td>{{ reservation.merchant_name }}</td> 
                <td>{{ reservation.datetime }}</td> <!-- Format nicely in DOW/ DATE/ TIME -->
                <td>{{ reservation.pax }}</td>
                <td><button @click="cancelReservation(reservation.reservation_id)">Cancel</button></td>
              </tr>
            </tbody>
          </table>
      </div>
      <div class="profilearea">
        <div class="profilecard">
          <h2 v-if="this.loaded == true">Profile of</h2> 
          <h2>{{profileInfo.name.first_name}} {{profileInfo.name.last_name}}</h2>
          <button @click="goToProfileDetails">Edit Profile</button>
          <img v-if="profileInfo.imgURL != null && loaded == true" :src=profileInfo.imgURL alt="Profile Pic">
          <br>
          <br>
      <div>
        <div>
          <input type="file" @change="inputImage" accept="image/*">
        </div>
        <div>
          <p>Progress: {{uploadPct.toFixed()+"%"}}
          <progress id="progress" :value="uploadPct" max="100" ></progress>  </p>
        </div>
          <div v-if="imageData!=null">
            <button @click="setProfileImage">Upload</button>
          </div>
        </div>
        </div>
      </div>
      <!-- Get past reservations -->
      <br>
      <h2>Past Reservations</h2>
      <div class="pastreservations">
          <table class="styled-table">
          <thead>
            <tr>
            <th></th>
            <th>Restaurant</th>
            <th>Date</th>
            <th>Pax</th>
            <th>Leave a Review</th>
            </tr>
          </thead>
            <tbody>
              <tr v-for="(reservation ,i) in user_reservations" :key="i">
                <th scope="row">{{i + 1}}</th>  
                <td>{{ reservation.merchant_name }}</td> 
                <td>{{ reservation.datetime }}</td> <!-- Format nicely in DOW/ DATE/ TIME -->
                <td>{{ reservation.pax }}</td>
                <td><button @click="goToReview(reservation.merchant_id)">Review</button></td> <!-- Go to review form -->
              </tr>
            </tbody>
          </table>
      </div>
    </div>
  </body>

</div>
</template>

<script>
// Functionality
// 1) Get and Update Profile Information from Firebase

import firebase from '../firebase.js';
const database = firebase.firestore();
const storage = firebase.storage();

export default {
  data() {
    return {
      profileInfo: {
        status: "new",
          user_id: '',
          user_name: '',
          imgUrl: '',
          email: '',
          phone_number: '',
          name: {
            first_name: '',
            last_name: '',
            salutation: 'Mr.'
          },
          strikes: 0
        },
      loaded: false, // Triggered when data has sucessfully been pulled after Vue app is mounted
      uploadPct: 0,
      imageData: null,
      user_id: null,
      user_reservations: [],
      past_reservations: []
    }
  },
  methods: {
    getUserRes: function() {
              database.collection('reservations').get().then((querySnapShot) => {
              querySnapShot.forEach(doc=> {
                if (doc.data().user_id == this.user_id && doc.data().date_reserved >= new Date().getTime / 1000) {
                  let reservation = {};
                  reservation.reservation_id = doc.id;
                  reservation.merchant_name = doc.data().merchant_name;
                  reservation.merchant_id = doc.data().merchant_id;
                  let reservation_date = new Date(doc.data().date_reserved * 1000).toDateString()
                  let reservation_time = new Date(doc.data().date_reserved * 1000).toLocaleTimeString('en-SG', {timeZone: 'Asia/Singapore', hour: 'numeric', minute: 'numeric', hour12: true}); 
                  reservation.datetime = reservation_date + " " + reservation_time;
                  reservation.pax = doc.data().pax;
                  this.user_reservations.push(reservation);
                }
              })
            }).catch(function(error) {
              console.log("Error getting documents: ", error);
            })
          },
    getPastUserRes: function() {
              database.collection('reservations').get().then((querySnapShot) => {
              querySnapShot.forEach(doc=> {
                if (doc.data().user_id == this.user_id && doc.data().date_reserved < new Date().getTime / 1000 + 3600) { // Account for dinein time approx 60 mins
                  let reservation = {};
                  reservation.reservation_id = doc.id;
                  reservation.merchant_name = doc.data().merchant_name;
                  reservation.merchant_id = doc.data().merchant_id;
                  let reservation_date = new Date(doc.data().date_reserved * 1000).toDateString()
                  let reservation_time = new Date(doc.data().date_reserved * 1000).toLocaleTimeString('en-SG', {timeZone: 'Asia/Singapore', hour: 'numeric', minute: 'numeric', hour12: true}); 
                  reservation.datetime = reservation_date + " " + reservation_time;
                  reservation.pax = doc.data().pax;
                  this.past_reservations.push(reservation);
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
    // 1) Pull profile information from Firebase
    fetchProfile: function() {
      database.collection('users').where("user_id", "==", this.user_id).get().then((querySnapShot) => {
        querySnapShot.forEach(doc=> {
          console.log("User data =>", doc.data());
          // Document ID
          this.doc_id = doc.id;
          this.profileInfo = doc.data();
          this.loaded = true;
        })
      }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    },
    // 2) Update profile information to Firebase 
    updateProfile: function() {
      database.collection('users').doc(this.doc_id).update(
        this.profileInfo
        ).then(function() {
          console.log("Profile information successfully updated!")
        }).catch(function(error) {
          console.log("Error updating profile information: ", error);
        })
    },
    // 3) Set Profile Image 
    setProfileImage: function() {
        let uploadTask = storage.ref('user_imgs/').child(this.user_id + '/' + `${this.imageData.name}`).put(this.imageData);
        uploadTask.on('state_changed', 
        snapshot => {
          this.uploadPct = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        },
        error => {
          console.log("Error uploading profile picture ", error);
        },
        () => {
          this.uploadPct = 100;
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.profileInfo.imgURL = downloadURL; // Profile Info has image URL and can directly pull with img tag
            this.updateProfile(); // Call on update profile to update downloadURL
            console.log("New profile image available at: ", downloadURL);
          })
        }
      )
    },
    inputImage(event) {
      this.uploadValue=0;
      this.picture=null;
      this.imageData = event.target.files[0];
    },
    goToReview: function(merchant_id) {
      console.log("Going to Review Page")
      this.$router.push({name:'review', params:{user_id: this.user_id, merchant_id: merchant_id}});
    },
    goToProfileDetails: function() {
      this.$router.push({name: 'userdetails'})
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
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user_id = user.uid;
        console.log("Getting signed in user")
        this.fetchProfile();
      } else {
       console.log("Can't get signed in user")
      }
    });
    this.getUserRes();
    this.getPastUserRes();
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

.profilearea {
  width: 30%;
  float: right;
}

.pastreservations {
  width: 70%;
  float: left;
  /*background-color: blue;*/
}

img {
    width: 300px;
    height: auto;
}

.profilecard {
  background-color: whitesmoke;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px 10px 10px 10px;
  max-width: 300px;
  margin: auto;
  text-align: center;
}

.styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
}

.styled-table th,
.styled-table td {
    padding: 12px 15px;
}

.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}

.styled-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
}


</style>
