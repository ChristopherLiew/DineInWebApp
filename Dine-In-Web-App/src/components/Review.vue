<template v-if="data_loaded">
  <div>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
      <div class = "content">
          <h2>Review</h2>
        <div class="container">
            <form action="/action_page.php">
                <label for="fname"><strong>You are writing a review for:</strong></label>
                <input type="text" id="fname" name="firstname" v-if="data_loaded" v-model.lazy="review_data.merchant_name">
                <p><strong>This restaurant adhered to:</strong></p>
                <!-- Put it safety measures in a table? -->
                <label for="vehicle1">Contact Tracing</label>
                <input type="checkbox" id="vehicle1" name="vehicle1" v-if="review_data.safety" v-model.lazy="review_data.safety.contact_trace">
                <label for="vehicle1">Mask Wearing</label>
                <input type="checkbox" id="vehicle2" name="vehicle2" v-if="review_data.safety" v-model.lazy="review_data.safety.masks">
                <br>
                <label for="vehicle1">Safe Distancing</label>
                <input type="checkbox" id="vehicle3" name="vehicle3" v-if="review_data.safety" v-model.lazy="review_data.safety.safe_distance">
                <label for="vehicle1">Temperature Screening</label>
                <input type="checkbox" id="vehicle4" name="vehicle4" v-if="review_data.safety" v-model.lazy="review_data.safety.temp_screen">
                <br>
                <br>
                <label for="lname"><strong>Rating:</strong></label>
                <select id="rating" name="rating" v-if="data_loaded" v-model.lazy="review_data.rating">
                <option value=1>1 Star</option>
                <option value=2>2 Star</option>
                <option value=3>3 Star</option>
                <option value=4>4 Star</option>
                <option value=5>5 Star</option>
                </select>
                <br>
                <label for="subject"><strong>Comments:</strong></label>
                <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px" v-model="review_data.review"></textarea>
                <input @click="updateReview" type="submit" value="Submit">
            </form>
        </div>
      </div>

    </body>
  </div>
</template>

<script>
// Review logic:
// 1) Get review matching user_id and merchant_id (merchant_id and user_id has to be passed via router to this component)
// 2) Update doc if review exists else create new review
import firebase from '../firebase.js'
const database = firebase.firestore();

export default {
  data() {
    return {
      merchant_id: '',
      user_id: '',
      review_id: '',
      review_data: {
        date_reviewed: {
          nanoseconds: 0,
          seconds: Math.floor(Date.now() / 1000)
        },
        merchant_id: '',
        merchant_name: '', // Should we pull from merchant collection instead seems weird for us to ask the user to input merchant name.
        rating: '',
        review: '',
        safety: {
          contact_trace: false,
          masks: false,
          safe_distance: false,
          temp_screen: false
        },
        user_id: ''
      },
      data_loaded: false
    }
  },
  methods: {
    getReview: function() {
              console.log("Pulling review data")
              this.data_loaded = true;
              database.collection('reviews').where("user_id", "==", this.user_id).where("merchant_id", "==", this.merchant_id).get().then((querySnapShot) => {
              querySnapShot.forEach(doc=> {
                  this.review_data = doc.data();
                  this.review_id = doc.id;
                  console.log(doc.id, doc.data());
                }
              )
            }).catch(function(error) {
              console.log("Error getting documents: ", error);
            })
          },
    updateReview: function() { 
      // Update date_reviewed
      // Convert rating to interger
      this.review_data.rating = parseInt(this.review_data.rating);
      if (this.review_id == '') { // Create if not exists
      // Set merchant and user ID
      this.review_data.merchant_id = this.merchant_id;
      this.review_data.user_id = this.user_id;
      // TBD add date reviewed
        database.collection('reviews').doc(this.user_id + Math.floor(Math.random() * 100001)).set(this.review_data)
        .then(function() {
          console.log("Document successfully written!");
          })
        .catch(function(error) {
          console.error("Error writing document: ", error);
          }); 
        alert("Your review has been submitted successfully!")
      } else {
        database.collection('reviews').doc(this.review_id).update(this.review_data);
        alert("Your review has been submitted successfully!")
      }
      this.$router.push({name: "profile"});
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
      console.log("Hello world");
      this.merchant_id = this.$route.params.merchant_id;
      this.user_id = this.$route.params.user_id;
      this.getReview();
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

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.timing {
  float: left;
  width: 50%;
  /*padding-right: 10%;*/
}

/* Clear floats after the columns */
.timingrow:after {
  content: "";
  display: table;
  clear: both;
}

.registerrestaurant {
  float: left;
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
