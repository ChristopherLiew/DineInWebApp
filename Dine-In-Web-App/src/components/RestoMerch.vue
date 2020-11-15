<template>
<div>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head>

  <body>
    <div class="sidebar">
      <div class="icon">
        <h2>DineIn</h2>
      </div>
        <router-link :to="{ name: 'restaurantmerch', params: {id: this.merchant_id}}">My Restaurant</router-link>
        <router-link to="/restbackend">Restaurant Management</router-link>
        <router-link to="/restdetails">Restaurant Profile</router-link>
        <hr>
        <div v-if="user_id == null">
        <router-link to="/login">Log In</router-link>
        </div>
        <div v-if="user_id">
        <a href="#" @click="logOut()">Log Out</a>
    </div>
    </div>

    <div class="content">
      <!-- Restaurant Info Card -->
      <div class="headerbar" :style="{'background-image': 'url(https://vuejs.org/images/logo.png)',}">
        <h1>{{ merchant_info.merchant_name }}</h1>
        <p>{{ merchant_info.description }}</p>
        <p>Address: {{ merchant_info.address }}</p>
        <p>Phone No: {{ merchant_info.contact }}</p>
        <p>Operating Hours: {{ merchant_info.opening_hours }} to {{ merchant_info.closing_hours }}</p>
      </div>

      <div class="row">
        <div class="column left">
          <div class="row">
            <div class="column left1">
              
              <!-- Overall Rating Card -->
              <div class="stati turquoise">
                <div style="display: inline-block">
                  <b>{{ getOverallRating }}/5</b>
                  <span>Overall Rating</span>
                </div>
              </div>
              <div class="stati turquoise">
                <div style="display: inline-block">
                  <b>{{ getSafetyScore }}%</b>
                  <span>Safety Adherence</span>
                </div>
              </div>

              <!-- Safety Measures Card -->
              <div class="card">
                <p>Contact Tracing: {{ getContactTrace }}%</p>
              </div>
              <div class="card">
                <p>Compulsory Masks: {{ getMasks }}%</p>
              </div>
              <div class="card">
                <p>Safe Distancing: {{ getSafeDistance }}%</p>
              </div>
              <div class="card">
                <p>Temperature Screening: {{ getTempScreen }}%</p>
              </div>
            </div>
        
            <div class="column right1">

              <div class="stati turquoise">
                <div style="display: inline-block">
                  <b>{{ num_reviewers }}</b>
                  <span>No. of Reviewers</span>
                </div>
              </div>
              <div class="stati turquoise">
                <div style="display: inline-block">
                  <b>{{ getTotalSeatVacancy }}/{{ getTotalSeatCapacity }}</b>
                  <span>Seats Available Now</span>
                </div>
              </div>

              <!-- Detailed Seats Card -->
              <div class="card">
                <p>One-seaters: {{ getOneSeaterVacancy }}/{{ capacity.one_seater }}</p>
              </div>
              <div class="card">
                <p>Two-seaters: {{ getTwoSeaterVacancy }}/{{ capacity.two_seater }}</p>
              </div>
              <div class="card">
                <p>Three-seaters: {{ getThreeSeaterVacancy }}/{{ capacity.three_seater }}</p>
              </div>
              <div class="card">
                <p>Four-seaters: {{ getFourSeaterVacancy }}/{{ capacity.four_seater }}</p>
              </div>
              <div class="card">
                <p>Five-seaters: {{ getFiveSeaterVacancy }}/{{ capacity.five_seater }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <!-- Table of Reviews -->
            <div class="ex3" id="reviews_table">
              <div class="testimonials" v-for="review in reviewslist" :key="review.number">
                <div>
                  <p>{{ review.user_name }} rated {{ review.rating }}/5 stars.</p>
                  <p>{{ review.date }}</p>
                  <p>{{ review.review_text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Reservation Form -->
        <div class="column right">
              <img :src="merchant_info.image" alt="Exterior image of Restaurant"><br><br>
        </div>
      </div>
    </div>
  </body>
</div>
</template>

<script>
import firebase from '../firebase.js'
const db = firebase.firestore();

export default {
  data() {
    return {
      //Authenticated user
      user_id: null,
      user_name: null,
      //Merchant information to be displayed
      merchant_id: "", 
      merchant_info: {
        merchant_name: "",
        address: "",
        contact: null,
        opening_hours: "",
        closing_hours: "",
        image: "",
        description: "",
      },
      filledseats: {
        one_seater: null,
        two_seater: null,
        three_seater: null,
        four_seater: null,
        five_seater: null      
      },
      walkins: {
        one_seater: null,
        two_seater: null,
        three_seater: null,
        four_seater: null,
        five_seater: null,
      },
      capacity: {
        one_seater: null,
        two_seater: null,
        three_seater: null,
        four_seater: null,
        five_seater: null
      },
      safety: {
        masks: false,
        contact_trace: false,
        temp_screen: false,
        safe_distance: false
      },
      reviewslist: [],
      //Computed values
      summed_rating: null,
      num_reviewers: null,
      //Reservation form
      reservation_datetime: null,
      seat_type_chosen: null,
      //Safety cards
      summed_contacttrace: null,
      summed_masks: null,
      summed_safedistance: null,
      summed_tempscreen: null,
      //Operating hours in milliseconds
      opening_hours_millisec: null,
      closing_hours_millisec: null
    }
  },
  methods: {  

    //Get merchant information from firestore, then update all merchant-related info
    fetchMerchantInfo: function() {
      if (this.merchant_id) {
        db.collection("merchants")
        .where("merchant_id", "==", this.merchant_id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(doc => {
            //Restaurant Info Page
            this.merchant_info.merchant_name = doc.data().merchant_name;
            this.merchant_info.address = doc.data().address;
            this.merchant_info.contact = doc.data().contact;
            this.merchant_info.opening_hours = new Date(doc.data().operating_hours.opening * 1000).toLocaleTimeString('en-SG', {timeZone: 'Asia/Singapore', hour: 'numeric', minute: 'numeric', hour12: true});
            this.merchant_info.closing_hours = new Date(doc.data().operating_hours.closing * 1000).toLocaleTimeString('en-SG', {timeZone: 'Asia/Singapore', hour: 'numeric', minute: 'numeric', hour12: true});
            this.opening_hours_millisec = doc.data().operating_hours.opening * 1000;
            this.closing_hours_millisec = doc.data().operating_hours.closing * 1000;
            this.merchant_info.image = doc.data().imgURL.exterior;
            this.merchant_info.cuisine = doc.data().cuisine;
            this.merchant_info.description = doc.data().description;
            //Capacities
            this.capacity.one_seater = doc.data().capacity.one_seater;
            this.capacity.two_seater = doc.data().capacity.two_seater;
            this.capacity.three_seater = doc.data().capacity.three_seater;
            this.capacity.four_seater = doc.data().capacity.four_seater;
            this.capacity.five_seater = doc.data().capacity.five_seater;
            //Walk Ins
            this.filledseats.one_seater += doc.data().walk_ins.one_seater;
            this.filledseats.two_seater += doc.data().walk_ins.two_seater;
            this.filledseats.three_seater += doc.data().walk_ins.three_seater;
            this.filledseats.four_seater += doc.data().walk_ins.four_seater;
            this.filledseats.five_seater += doc.data().walk_ins.five_seater;
          })
        })

        //Reviews and Ratings and Safety Scores
        db.collection("reviews")
        .where("merchant_id", "==", this.merchant_id)
        .get()
        .then((querySnapshot) => {
          this.num_reviewers = querySnapshot.size;
          
          querySnapshot.forEach(doc => {
            let review = {};
            review["user_name"] = doc.data().user_name;
            review["user_id"] = doc.data().user_id;
            review["rating"] = doc.data().rating;
            review["review_text"] = doc.data().review;
            review["date"] = new Date(doc.data().date_reviewed * 1000).toDateString();

            this.reviewslist.push(review);
            this.summed_rating += review["rating"];

            this.summed_contacttrace += doc.data().safety.contact_trace;
            this.summed_masks += doc.data().safety.masks;
            this.summed_safedistance += doc.data().safety.safe_distance;
            this.summed_tempscreen += doc.data().safety.temp_screen;
          })
        })

        //Update vacancy per seat type
        db.collection("reservations")
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
      }
    },

    //Validate reservation form and save data to firestore if valid
    checkReservationForm: function() {

      // Ensure all fields filled in
      if (!this.seat_type_chosen) {
        alert("Please tell us which seats you'd like!")
      }
      if (!this.reservation_datetime) {
        alert("Please tell us when you're coming!")
      } else {  

      // Ensure valid datetime: 7 day window
      var chosen_date = new Date(this.reservation_datetime).getTime() / 1000;
      var today = new Date().getTime() / 1000;
      var max_date = this.addDays(today, 7);
      if (chosen_date < today || chosen_date > max_date) {
        alert("Please choose a valid reservation date, in between today and one week from now");
      } else {

        // Ensure valid datetime: Within operating hours
        var chosendate_midnight = Number((new Date(new Date(this.reservation_datetime).setHours(0,0,0,0)).getTime() / 1000).toFixed(0))
        var opening = this.opening_hours_millisec + chosendate_midnight;
        var closing = this.closing_hours_millisec + chosendate_midnight;
        var beyond_operatinghours = chosen_date <= opening || chosen_date >= closing;
        console.log("beyond? ", beyond_operatinghours);
        if (beyond_operatinghours) {
          alert("Please choose a timing within the restaurant's operating hours! :) The shop owners are human, and require rest.")
        } else {

        // Ensure seats are available during selected datetime
        db.collection("reservations") //I want the resevations where reservation datetime >= valid chosen date and reservation datetime < valid chosen date + 2.5h (give 2.5h leeway for eating)
        .where("date_reserved", ">=", chosen_date)
        .where("date_reserved", "<", max_date)
        .get()
        .then((querySnapshot) => {
          let seattype = this.seat_type_chosen.split(",")[0];
          let expectedFilledOne = 0;
          let expectedFilledTwo = 0;
          let expectedFilledThree = 0;
          let expectedFilledFour = 0;
          let expectedFilledFive = 0;
          querySnapshot.forEach(doc => {
            //within the timeframe of consideration (all confirmed reservations between chosen date and chosen date + 2.5h), calculate capacity per seat_type
            if (seattype == "one_seater") {
              expectedFilledOne += doc.data().seat_type == "one_seater";
            } else if (seattype == "two_seater") {
              expectedFilledTwo += doc.data().seat_type == "two_seater";
            } else if (seattype == "three_seater") {
              expectedFilledThree += doc.data().seat_type == "three_seater";
            } else if (seattype == "four_seater") {
              expectedFilledFour += doc.data().seat_type == "four_seater";
            } else {
              expectedFilledFive += doc.data().seat_type == "five_seater";
            }
          })
          if (seattype == "one_seater" && this.filledseats.one_seater + expectedFilledOne >= this.capacity.one_seater) {
            alert("Sorry, we're expecting one-seaters to be filled during your chosen timing. Try a different date, time, or seating choice.")
          } else if (seattype == "two_seater" && this.filledseats.two_seater + expectedFilledTwo >= this.capacity.two_seater) {
            alert("Sorry, we're expecting two-seaters to be filled during your chosen timing. Try a different date, time, or seating choice.")
          } else if (seattype == "three_seater" && this.filledseats.three_seater + expectedFilledThree >= this.capacity.three_seater) {
            alert("Sorry, we're expecting three-seaters to be filled during your chosen timing. Try a different date, time, or seating choice.")
          } else if (seattype == "four_seater" && this.filledseats.four_seater + expectedFilledFour >= this.capacity.four_seater) {
            alert("Sorry, we're expecting four-seaters to be filled during your chosen timing. Try a different date, time, or seating choice.")
          } else if (seattype == "five_seater" && this.filledseats.five_seater + expectedFilledFive >= this.capacity.five_seater) {
            alert("Sorry, we're expecting five-seaters to be filled during your chosen timing. Try a different date, time, or seating choice.")
          } else {

            // Reservation Successful!
            db.collection("reservations")
            .add({
              date_reserved: chosen_date,
              pax: Number(this.seat_type_chosen.split(",")[1]),
              seat_type: this.seat_type_chosen.split(",")[0],
              merchant_id: this.merchant_id,
              user_id: this.user_id,
              merchant_name: this.merchant_info.merchant_name,
              user_name: this.user_name
            });
            alert("Reservation successful! Be there or be square :)");
          }
        })
      }}}
      location.reload();
    },

    //Add a given number of days to a given datetime
    addDays: function(date, days) {
      return date + days * 24 * 3600;
    },

    //Add a given number of minutes to a given datetime
    addMinutes: function(date, minutes) {
      return date + minutes * 60;
    },

    getUserName: function() {
       db.collection("users")
       .where("user_id", "==", this.user_id)
       .get()
       .then((querySnapshot) => {
         querySnapshot.forEach(doc => {
          this.user_name = doc.data().user_name;
         })
       })
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
    //Calculate overall rating out of 5
    getOverallRating: function() {
      return Number(this.summed_rating / this.num_reviewers).toFixed(1);
    },

    //Calculate sum of seat capacities possible
    getTotalSeatCapacity: function() {
      return Number(this.capacity.one_seater + this.capacity.two_seater * 2 + this.capacity.three_seater * 3 + this.capacity.four_seater * 4 + this.capacity.five_seater * 5);
    },

    //Calculate seat vacancies per seat type and in total, in real time
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
    },
    getTotalSeatVacancy: function() {
      return Number(this.getOneSeaterVacancy + this.getTwoSeaterVacancy * 2 + this.getThreeSeaterVacancy * 3 + this.getFourSeaterVacancy * 4 + this.getFiveSeaterVacancy * 5);
    },

    //Calculate adherence to each safety measure
    getContactTrace: function() {
      return Number((this.summed_contacttrace * 100 / this.num_reviewers).toFixed(1));
    },
    getMasks: function() {
      return Number((this.summed_masks * 100 / this.num_reviewers).toFixed(1));
    },
    getSafeDistance: function() {
      return Number((this.summed_safedistance * 100 / this.num_reviewers).toFixed(1));
    },
    getTempScreen: function() {
      return Number((this.summed_tempscreen * 100 / this.num_reviewers).toFixed(1));
    },

    //Calculate overall adherence to safety in percentage
    getSafetyScore: function() {
      return Number(((this.getContactTrace + this.getMasks + this.getSafeDistance + this.getTempScreen) / 4).toFixed(1));
    }
  },

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        this.user_id = user.uid;
        this.merchant_id = this.$route.params.id;
        this.fetchMerchantInfo();
        this.getUserName();        
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

table {
  overflow: auto;
  height: 200px;
}

div.ex3 {
  width: auto;
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
  float: left;
  height: 70px;
  width: 70px;
}

.headerbar {
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
  background-color: #4caf50;
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
  background-image: linear-gradient(rgb(78, 223, 78), rgb(85, 199, 228));
}

.stati {
  background: #fff;
  height: 4em;
  padding: 1em;
  margin: 1em 0;

  margin-right: 1.96em;
  -webkit-transition: margin 0.5s ease, box-shadow 0.5s ease; /* Safari */
  transition: margin 0.5s ease, box-shadow 0.5s ease;
  -moz-box-shadow: 0px 0.2em 0.4em rgb(0, 0, 0, 0.8);
  -webkit-box-shadow: 0px 0.2em 0.4em rgb(0, 0, 0, 0.8);
  box-shadow: 0px 0.2em 0.4em rgb(0, 0, 0, 0.8);
  display: inline-block;
  vertical-align: top;
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

.testimonials {
  border: 2px solid #ccc;
  background-color: #eee;
  border-radius: 10px;
  padding: 5px;
  margin: 7px 0;
  width: 115%;
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
  width: 100%;
  border-radius: 50%;
}

/* Increase the font-size of a span element */
.testimonials span {
  font-size: 20px;
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
@media screen and (max-width: 300px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 10px;
  }
}

/* Style the counter cards */
.card {
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.2);
  padding: 4px;
  text-align: center;
  background-color: #444;
  color: white;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

th {
  background-color: #4caf50;
  color: white;
}

input[type="text"],
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="submit"] {
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}

.forms {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>