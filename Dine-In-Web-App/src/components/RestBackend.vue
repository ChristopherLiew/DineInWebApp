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
        <router-link :to="{ name: 'restaurantmerch', params: {id: this.merchant_id}}">My Restaurant</router-link>
        <router-link to="/restbackend">Restaurant Manager</router-link>
        <router-link to="/restdetails">Restaurant</router-link>
        <hr>
        <a href="#" @click="logOut()">Log Out</a>
    </div>

      <div class="content">
        <div class="form">
            <h2>Update the current number of Walk Ins</h2> <!--pass name over-->
            <div class="seatupdatearea">
              <div class="seats">
                  <div class="vacancies">
                      <div class="tabletype">
                          <p>No. of One Seater Tables available</p>
                      </div>
                      <div class="availableseats">
                          <p>{{getOneSeaterVacancy}}</p>
                      </div>
                      <label>Current Number of Walk Ins</label>
                      <input type="text" id="one_seaters" name="one_seaters" class="one_seaters" v-model="walk_ins.one_seater" placeholder="Update here">
                  </div>
                  <div class="vacancies">
                      <div class="tabletype">
                          <p>No. of Two Seater Tables available</p>
                      </div>
                      <div class="availableseats">
                          <p>{{getTwoSeaterVacancy}}</p>
                      </div>
                      <label>Current Number of Walk Ins</label>
                      <input type="text" id="two_seaters" name="two_seaters" class="two_seaters" v-model="walk_ins.two_seater" placeholder="Update here">
                  </div>
                  <div class="vacancies">
                      <div class="tabletype">
                          <p>No. of Three Seater Tables available</p>
                      </div>
                      <div class="availableseats">
                          <p>{{getThreeSeaterVacancy}}</p>
                      </div>
                      <label>Current Number of Walk Ins</label>
                      <input type="text" id="three_seaters" name="three_seaters" class="three_seaters" v-model="walk_ins.three_seater" placeholder="Update here">
                  </div>
                  <div class="vacancies">
                      <div class="tabletype">
                          <p>No. of Four Seater Tables available</p>
                      </div>
                      <div class="availableseats">
                          <p>{{getFourSeaterVacancy}}</p>
                      </div>
                      <label>Current Number of Walk Ins</label>
                      <input type="text" id="four_seaters" name="four_seaters" class="four_seaters" v-model="walk_ins.four_seater" placeholder="Update here">
                  </div>
                  <div class="vacancies">
                      <div class="tabletype">
                          <p>No. of Five Seater Tables available</p>
                      </div>
                      <div class="availableseats">
                          <p>{{getFiveSeaterVacancy}}</p>
                      </div>
                      <label>Current Number of Walk Ins</label>
                      <input type="text" id="five_seaters" name="five_seaters" class="five_seaters" v-model="walk_ins.five_seater" placeholder="Update here">
                  </div>
              </div>
              <button class="updatebutton" @click="updateResVacancy()"> Update </button>
              <br>
            </div>
            
            <br>
            <h2>Upcoming Reservations</h2>
            <div class="reservationlist">
                <table>
                    <thead>
                    <tr>
                    <th></th>
                    <th>Restaurant</th>
                    <th>Date</th>
                    <th>Pax</th>
                    <th>Cancel Reservation</th>
                    <th>Blacklist User</th>
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
            <!-- Add in Past Reservations -->
        </div>
      
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
      doc_id: null,
      email: null,
      password: null,
      restaurant_reservations: [],
      merchant_id: null,
      filledseats: {
        five_seater: 0,
        four_seater: 0,
        three_seater: 0,
        two_seater: 0,
        one_seater: 0,
        total_seats: 0
      },
      walk_ins: {
        five_seater: 0,
        four_seater: 0,
        three_seater: 0,
        two_seater: 0,
        one_seater: 0
      },
      current_walk_ins: {
        five_seater: 0,
        four_seater: 0,
        three_seater: 0,
        two_seater: 0,
        one_seater: 0
      },
      capacity: {
        five_seater: 0,
        four_seater: 0,
        three_seater: 0,
        two_seater: 0,
        one_seater: 0,
        total_seats: 0
      },
      update: false
    }
  },
  watch: {
    update: function() {
      this.update = true;
      location.reload();
    }
  },
  methods: {
    getResCapacity: function() {
        console.log("Pulling restaurant vacancy data")
              database.collection('merchants').where("merchant_id", "==", this.merchant_id).get().then((querySnapShot) => {
              querySnapShot.forEach(doc=> {
                    this.doc_id = doc.id;
                  if (doc.data().status == "new") {
                    this.merchant_id = doc.data().merchant_id;
                  } else {
                    this.capacity = doc.data().capacity;
                    this.walk_ins = doc.data().walk_ins;
                    this.current_walk_ins = doc.data().walk_ins;
                  }
                }
              )
            }).catch(function(error) {
              console.log("Error getting restaurant capacity data: ", error);
            })
        },
    // Validate vacancy updates
    validateUpdates(update_val, current_val, max_val) {
      if (parseInt(update_val) - current_val > max_val) {
        alert("You are full! Number of walk ins cannot exceed: " + max_val);
        return current_val
      } 
      else {
          return parseInt(update_val)
      }
    },
    // Update vacancies
    updateResVacancy: function() {
      this.walk_ins.five_seater = this.validateUpdates(this.walk_ins.five_seater, this.current_walk_ins.five_seater ,this.capacity.five_seater - this.filledseats.five_seater);
      this.walk_ins.four_seater = this.validateUpdates(this.walk_ins.four_seater, this.current_walk_ins.four_seater, this.capacity.four_seater - this.filledseats.four_seater);
      this.walk_ins.three_seater = this.validateUpdates(this.walk_ins.three_seater, this.current_walk_ins.three_seater, this.capacity.three_seater - this.filledseats.three_seater);
      this.walk_ins.two_seater = this.validateUpdates(this.walk_ins.two_seater, this.current_walk_ins.two_seater,  this.capacity.two_seater - this.filledseats.two_seater);
      this.walk_ins.one_seater = this.validateUpdates(this.walk_ins.one_seater, this.current_walk_ins.one_seater, this.capacity.one_seater - this.filledseats.one_seater);
        let vm = this;
        database.collection('merchants').doc(this.doc_id).update({"walk_ins": this.walk_ins}).then(function() {
        alert("Your merchant profile has been updated successfully!");
        vm.update = true;
        })
        .catch(function(error) {
          console.log("Error updating vacancy data: ", error);
          });
    },
    getRestRes: function() {
              database.collection('reservations').get().then((querySnapShot) => {
              console.log("Getting all reservations for merchant")
              querySnapShot.forEach(doc=> {
                if (doc.data().merchant_id == this.merchant_id && doc.data().date_reserved >= new Date().getTime() / 1000) {
                  let reservation = {};
                  reservation.reservation_id = doc.id;
                  reservation.user_name = doc.data().user_name;
                  reservation.user_id = doc.data().user_id;
                  let reservation_date = new Date(doc.data().date_reserved * 1000).toDateString()
                  let reservation_time = new Date(doc.data().date_reserved * 1000).toLocaleTimeString('en-SG', {timeZone: 'Asia/Singapore', hour: 'numeric', minute: 'numeric', hour12: true}); 
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
    getResVacancy: function() {
      database.collection("reservations")
        .where("merchant_id", "==", this.merchant_id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(doc => { //vacancy = capacity - capacity of (reservations with datetimes > today - 20min AND today < reservation datetime + 30min AND status != "completed" and status != "no-show" and status != "cancelled")
            var chosen_date = doc.data().date_reserved;
            var today = Number((new Date().getTime() / 1000).toFixed(0));
            var upcoming = chosen_date >= this.addMinutes(today, -20) && chosen_date <= today;
            var ongoing = chosen_date >= today && chosen_date <= this.addMinutes(today, 40);
            if (upcoming || ongoing) {
              this.filledseats.one_seater += doc.data().seat_type == "one_seater";
              this.filledseats.two_seater += doc.data().seat_type == "two_seater";
              this.filledseats.three_seater += doc.data().seat_type == "three_seater";
              this.filledseats.four_seater += doc.data().seat_type == "four_seater";
              this.filledseats.five_seater += doc.data().seat_type == "five_seater";
            }
          })
        })

        database.collection("merchants")
        .where("merchant_id", "==", this.merchant_id)
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach(doc => {
              this.filledseats.one_seater += doc.data().walk_ins.one_seater;
              this.filledseats.two_seater += doc.data().walk_ins.two_seater;
              this.filledseats.three_seater += doc.data().walk_ins.three_seater;
              this.filledseats.four_seater += doc.data().walk_ins.four_seater;
              this.filledseats.five_seater += doc.data().walk_ins.five_seater;
          })
        })
    },
    //Add a given number of days to a given datetime
    addDays: function(date, days) {
      return date + days * 24 * 3600;
    },
    //Add a given number of minutes to a given datetime
    addMinutes: function(date, minutes) {
      return date + minutes * 60;
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
  },
  computed: {
     getOneSeaterVacancy: function() {
      return Number(this.capacity.one_seater - this.filledseats.one_seater);
    },
    getTwoSeaterVacancy: function() {
      return Number(this.capacity.two_seater - this.filledseats.two_seater);
    },
    getThreeSeaterVacancy: function() {
      return Number(this.capacity.three_seater - this.filledseats.three_seater);
    },
    getFourSeaterVacancy: function() {
      return Number(this.capacity.four_seater - this.filledseats.four_seater);
    },
    getFiveSeaterVacancy: function() {
      return Number(this.capacity.five_seater - this.filledseats.five_seater);
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
        this.getResCapacity();
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





.seatupdatearea {
  margin-left: auto;
  margin-right: auto;

}

.vacancies {
  padding: 2px;
  text-align: center;
  background-color: white;
  width: 14rem;
  display: inline-block;
  margin: 2rem;
  border-radius: 10px 10px 10px 10px;
}

.seats {
  margin-left: auto;
  margin-right: auto;
}

.tabletype {
  text-align: center;
  font-weight: bold;
}

.availableseats {
  text-align: center;
  font-weight: bold;
  font-size: 250%;
}

.one_seaters, .two_seaters, .three_seaters, .four_seaters, .five_seaters {
  text-align: center; 
}



.updatebutton {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height:50px;
  border-color: #FFF3E1;
  
  
  background-color:#FFF3E1;
}

.updatebutton:active {
  background-color: greenyellow;
}
/*.adjustseats {
  background-color: whitesmoke;
  border: none;
  color: black;
  padding: 16px;
  margin: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
}*/


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
  height:90%;
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

tr:nth-child(even){background-color: #FFF3E1}

th {
  background-color:#B26F68;
  color: white;
}


</style>