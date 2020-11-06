<template>
<div>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head>

  <body>
    <div class="sidebar">
      <div class="icon">
        <h2>Dinein</h2>
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
      <div class="info" :style="{'background-image': 'url(https://vuejs.org/images/logo.png)',}">
        <h1>{{ merchant_info.merchant_name }}</h1>
        <p>Address: {{ merchant_info.address }}</p>
        <p>Phone No: {{ merchant_info.contact }}</p>
        <p>Operating Hours: {{ merchant_info.opening_hours }} to {{ merchant_info.closing_hours }}</p>
      </div>

      <!-- Capacity and Rating Cards -->
      <div class="row">
        <div class="column left">
          <div class="stati turquoise">
            <div>
              <img :src="vacancy" alt="..." class="iconDetails" />
              <div style="display: inline-block">
                <b>5/{{ capacity.total }}</b>
                <span>Seats</span>
              </div>
            </div>
          </div>
          <div class="stati turquoise">
            <div>
              <img :src="vacancy" alt="..." class="iconDetails" />
              <div style="display: inline-block">
                <b>{{ getOverallRating }}/5</b>
                <span>Rating</span>
              </div>
            </div>
          </div>

          <!-- Detailed Seats Card -->
          <div class="row">
            <div class="column left1">
              <div class="card">
                <p><i class="fa fa-user"></i></p>
                <p>One-seaters: {{ capacity.one_seater }}</p>
              </div>
              <div class="card">
                <p><i class="fa fa-check"></i></p>
                <p>Two-seaters: {{ capacity.two_seater }}</p>
              </div>
              <div class="card">
                <p><i class="fa fa-smile-o"></i></p>
                <p>Three-seaters: {{ capacity.three_seater }}</p>
              </div>
              <div class="card">
                <p><i class="fa fa-smile-o"></i></p>
                <p>Four-seaters: {{ capacity.four_seater }}</p>
              </div>
              <div class="card">
                <p><i class="fa fa-smile-o"></i></p>
                <p>Five-seaters: {{ capacity.five_seater }}</p>
              </div>
            </div>

            <!-- Safety Measures Card -->
            <div class="column left1">
              <div class="card" v-if="this.safety.masks == true">
                <p><i class="fa fa-user"></i></p>
                <p>Enforces masks</p>
              </div>
              <div class="card" v-if="this.safety.contact_trace == true">
                <p><i class="fa fa-check"></i></p>
                <p>Contact tracing</p>
              </div>
              <div class="card" v-if="this.safety.temp_screen == true">
                <p><i class="fa fa-smile-o"></i></p>
                <p>Temperature screening</p>
              </div>
              <div class="card" v-if="this.safety.safe_distance == true">
                <p><i class="fa fa-smile-o"></i></p>
                <p>Safe distancing</p>
              </div>

            </div>

            <!-- Table of Reviews -->
            <div class="column right1">
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

    <!--
          <div class="row">
            <div class="tablescroll">
              <table>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Safety1</th>
                  <th>Safety2</th>
                  <th>Safety3</th>
                  <th>Safety4</th>
                </tr>
                <tr>
                  <td>17/10/20</td>
                  <td>Griffin</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>17/10/20</td>
                  <td>Louis</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>17/10/20</td>
                  <td>Joes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>17/10/20</td>
                  <td>Cleveland</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>

                <tr>
                  <td>17/10/20</td>
                  <td>Cleveland</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>17/10/20</td>
                  <td>Cleveland</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>17/10/20</td>
                  <td>Cleveland</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>17/10/20</td>
                  <td>Cleveland</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>17/10/20</td>
                  <td>Cleveland</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
              </table>
            </div>
          </div>
          --> 
        </div>
        
        <div class="column right">
          <div class="forms">
            <form action="/action_page.php">
              <h1>Reserve</h1>
              <label for="fname">Name</label>
              <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="Your name.."
              />

              <label for="lname">Number of People</label>
              <input
                type="text"
                id="lname"
                name="lastname"
                placeholder="Your last name.."
              />

              <label for="birthday">Birthday:</label>
              <input type="date" id="birthday" name="birthday" />
              <br />
              <br />

              <img :src="seats" />
              <br />
              <br />

              <label for="country">Seats</label>
              <select id="country" name="country">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>

              <input type="submit" value="Submit" />
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
      merchant_id: "1HUVGeQ9pEcXfUhEBv8nhYaT1fn2", //need to figure out how to fix this such that i get the uid of the person logged in
      merchant_info: {
        merchant_name: "",
        address: "",
        contact: null,
        opening_hours: "",
        closing_houurs: ""
      },
      capacity: {},
      safety: {
        masks: false,
        contact_trace: false,
        temp_screen: false,
        safe_distance: false
      },
      reviewslist: [],
      summed_rating: null,
      num_reviewers: null,
    }
  },

  methods: {

    //ensure it's the merchant, else ask them to log in
    updateMerchantID: function() {
      var mer = firebase.auth().currentUser;
      if (mer) {
        console.log("merchant is logged in");
        this.merchant_id = mer.uid;
      } else {
        alert("Please sign in!");
      }
    },

    //get merchant information from firestore, then update all merchant-related info
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
          //Safety Measures
          this.safety.masks = doc.data().safety.masks;
          this.safety.contact_trace = doc.data().safety.contact_trace;
          this.safety.temp_screen = doc.data().safety.temperature_screening;
          this.safety.safe_distance = doc.data().safety.safe_distancing;
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
          var review = {};

          db.collection("users")
          .where("user_id", "==", doc.data().user_id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(user => {
              review["user_name"] = user.data().user_name;
              review["rating"] = doc.data().rating;
              review["review_text"] = doc.data().review;
              review["date"] = doc.data().date_reviewed.toDate().toDateString();
              console.log(review["date"]);
              this.reviewslist.push(review);
              
              this.summed_rating += review["rating"];
            })
          })
        })
      })
    },
  },

  computed: {
    //Calculate overall rating out of 5
    getOverallRating: function() {
      return Number(this.summed_rating / this.num_reviewers).toFixed(1);
    }
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

.fa {
  font-size: 50px;
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