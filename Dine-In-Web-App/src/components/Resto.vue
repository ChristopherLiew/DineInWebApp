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
      <router-link to="/">Home</router-link>
      <router-link to="/profile">Profile</router-link>
      <router-link to="/map">Map</router-link>
      <router-link to="/search">Search</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/restaurant">Restaurant</router-link>
    </div>

    <div class="content">
      <!-- Restaurant Info Card -->
      <div class="headerbar" :style="{'background-image': 'url(https://vuejs.org/images/logo.png)',}">
        <h1>{{ merchant_info.merchant_name }}</h1>
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
                  <span>Avg Rating</span>
                </div>
              </div>
              <div class="stati turquoise">
                <div style="display: inline-block">
                  <b>{{ num_reviewers }}</b>
                  <span>No. of Reviewers</span>
                </div>
              </div>

              <!-- Safety Measures Cards -->
              <div class="card" v-if="this.safety.masks == true">
                <p>Enforces masks</p>
              </div>
              <div class="card" v-if="this.safety.contact_trace == true">
                <p>Contact tracing</p>
              </div>
              <div class="card" v-if="this.safety.temp_screen == true">
                <p>Temperature screening</p>
              </div>
              <div class="card" v-if="this.safety.safe_distance == true">
                <p>Safe distancing</p>
              </div>

            </div>
            
            <div class="column right1">

              <div class="stati turquoise">
                <div style="display: inline-block">
                  <b>/{{ getTotalSeatCapacity }}</b>
                  <span>Seats Available Now</span>
                </div>
              </div>

              <!-- Detailed Seats Card -->
              <div class="card">
                <p>One-seaters: /{{ capacity.one_seater }}</p>
              </div>
              <div class="card">
                <p>Two-seaters: /{{ capacity.two_seater }}</p>
              </div>
              <div class="card">
                <p>Three-seaters: /{{ capacity.three_seater }}</p>
              </div>
              <div class="card">
                <p>Four-seaters: /{{ capacity.four_seater }}</p>
              </div>
              <div class="card">
                <p>Five-seaters: /{{ capacity.five_seater }}</p>
              </div>
            </div>           
          </div>

          <div class="row">
            <!-- Table of Reviews -->
            <div class="ex3" id="reviews_table">
              <div class="testimonials" v-for="review in reviewslist" :key="review.number">
                <div class="iconDetails"><img :src="person2"/></div>
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
          <div class="forms">
            <form @submit.prevent="checkReservationForm">
              <h1>Reserve</h1>
              <label for="reservation">Reservation Date and Time </label>
              <input type="datetime-local" id="reservation" name="reservation" v-model="reservation_datetime"/>
              <br/>
              <br/>

              <label for="seats">Desired seat types</label>
              <select id="seats" name="seats" v-model="seat_type_chosen">
                <option value="1">One-seater</option>
                <option value="2">Two-seater</option>
                <option value="3">Three-seater</option>
                <option value="4">Four-seater</option>
                <option value="5">Five-seater</option>
              </select>
              <br/>
              <br/>

              <input type="submit" value="Submit"/>
            </form>
          </div>
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
      //Merchant information to be displayed
      merchant_id: "XSUFuBfW2LhMy5RcQIxZ9uiSvS73", //need to figure out how to pull this from the search page, i.e. when user clicks on the merchant from the filter page
      merchant_info: {
        merchant_name: "",
        address: "",
        contact: null,
        opening_hours: "",
        closing_houurs: ""
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
      seat_type_chosen: null
    }
  },

  methods: {  

    //Get merchant information from firestore, then update all merchant-related info
    fetchMerchantInfo: function() {
      db.collection("merchants")
      .where("merchant_id", "==", this.merchant_id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          console.log("Merchant =>", doc.data());
          //Restaurant Info Page
          this.merchant_info.merchant_name = doc.data().merchant_name;
          this.merchant_info.address = doc.data().address;
          this.merchant_info.contact = doc.data().contact;
          this.merchant_info.opening_hours = doc.data().operating_hours.opening;
          this.merchant_info.closing_hours = doc.data().operating_hours.closing;
          //Capacities
          this.capacity.total = doc.data().capacity.total_seats;
          this.capacity.one_seater = doc.data().capacity.one_seater;
          this.capacity.two_seater = doc.data().capacity.two_seater;
          this.capacity.three_seater = doc.data().capacity.three_seater;
          this.capacity.four_seater = doc.data().capacity.four_seater;
          this.capacity.five_seater = doc.data().capacity.five_seater;
        })
      })

      //Reviews and Ratings
      db.collection("reviews")
      .where("merchant_id", "==", this.merchant_id)
      .get()
      .then((querySnapshot) => {
        this.num_reviewers = querySnapshot.size;
        querySnapshot.forEach(doc => {
          console.log("Review =>", doc.data());
          let review = {};

          db.collection("users")
          .where("user_id", "==", doc.data().user_id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(user => {
              review["user_name"] = user.data().user_name;
            })
          })

          review["rating"] = doc.data().rating;
          review["review_text"] = doc.data().review;
          review["date"] = doc.data().date_reviewed.toDate().toDateString();
          this.reviewslist.push(review);
          
          this.summed_rating += review["rating"];
        })
      })
    },

    //Validate reservation form and save data to firestore if valid
    checkReservationForm: function() {
      if (!this.seat_type_chosen) {
        alert("Please tell us which seats you'd like")
      }
      if (!this.reservation_datetime) {
        alert("Please tell us when you're coming")
      } else {
        var chosen_date = new Date(this.reservation_datetime);
        var today = new Date();
        var max_date = this.addDays(today, 14);

        if (chosen_date < today || chosen_date > max_date) {
          console.log("Max date: ", max_date);
          alert("Please choose a valid reservation date, in between today and two weeks from now");
        } else {
          console.log("Chosen date and seat: ", chosen_date, " and ", this.seat_type_chosen);
          console.log("Max date: ", max_date);

          let reserver_name = "";

          db.collection("users")
          .where("user_id", "==", this.user_id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(user => {
              reserver_name = user.data().user_name;
              console.log("reserver name: ", reserver_name);
            })
          });

          db.collection("reservations")
          .add({
            date_reserved: chosen_date,
            pax: Number(this.seat_type_chosen),
            merchant_id: this.merchant_id,
            user_id: this.user_id,
            merchant_name: this.merchant_info.merchant_name,
            user_name: reserver_name
          });
          alert("Reservation successful! Be there or be square :)");
        }
      }
    },

    addDays: function(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
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
  },

  created() {
    //Ensure it's the user, else ask them to log in //how come i'm signed in after clicking away and going back again lmao
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        this.user_id = user.uid;
        console.log("User is signed in: ", this.user_id);
      } else {
        alert("Please sign in!");
      }
    })
  },
  
  mounted() {
    this.fetchMerchantInfo();
  },

  props: {
    vacancy: {
      type: String,
      default: "img/icon/table.png",
      description: "vacancy",
    },
    person2: {
      type: String,
      default: "img/restimage/person2.jpg",
      description: "vacancy",
    },
    person3: {
      type: String,
      default: "img/restimage/person3.jpg",
      description: "vacancy",
    },
    seats: {
      type: String,
      default: "img/restimage/seats.jpg",
      description: "vacancy",
    },
    restopic1: {
      type: String,
      default: "img/restimage/restopic1.jpg",
      description: "vacancy",
    }
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