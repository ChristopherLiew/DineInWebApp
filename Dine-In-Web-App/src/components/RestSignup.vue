<template>
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
        <router-link to="/submitrestaurant">Submit restaurant</router-link>
        <router-link to="/signup">Sign Up</router-link>
      </div>
      <div class = "content">
          <h2>Restaurant Information</h2>
        <div class="container">
            
            <form>
                <label for="restaurantname">Name of Restaurant</label>
                <input type="text" id="restaurantname" name="restaurantname" v-model="merchant_data.merchant_name">

                <label for="address">Address</label>
                <input type="text" id="address" name="address" v-model="merchant_data.address">

                <label for="opening">Opening Time</label>
                <input type="text" id="opening" name="opening" v-model="merchant_data.operating_hours.opening">
                <label for="closing">Closing Time</label>
                <input type="text" id="closing" name="closing" v-model="merchant_data.operating_hours.closing">

                <label for="contact">Contact Number</label>
                <input type="text" id="contact" name="contact" v-model="merchant_data.contact">

                <label for="oneseater">How many 1-seaters</label>
                <input type="text" id="oneseater" name="oneseater" v-model="merchant_data.capacity.one_seater">
                <label for="twoseater">How many 2-seaters</label>
                <input type="text" id="twoseater" name="twoseater" v-model="merchant_data.capacity.two_seater">
                <label for="threeseater">How many 3-seaters</label>
                <input type="text" id="threeseater" name="threeseater" v-model="merchant_data.capacity.three_seater">
                <label for="fourseater">How many 4-seaters</label>
                <input type="text" id="fourseater" name="fourseater" v-model="merchant_data.capacity.four_seater">
                <label for="fiveseater">How many 5-seaters</label>
                <input type="text" id="fiveseater" name="fiveseater" v-model="merchant_data.capacity.five_seater">
                <br>
                <label for="cuisine">COVID measures:</label>
                <hr>
                <label for="vehicle1">Contact Tracing</label>
                <input type="checkbox" id="contacttracing" name="contacttracing" value=True v-model="merchant_data.safety_measures.contact_trace">
                <label for="vehicle2">Masks Required</label>              
                <input type="checkbox" id="masks" name="masks" value="Car" v-model="merchant_data.safety_measures.masks">
                <br>
                <label for="vehicle3">Safe Distancing</label>
                <input type="checkbox" id="safedistancing" name="safedistancing" value="Boat" v-model="merchant_data.safety_measures.safe_distance">
                <label for="vehicle3">temperature screening</label>
                <input type="checkbox" id="temperaturescreening" name="temperaturescreening" value="monkey" v-model="merchant_data.safety_measures.temp_screening">
                <br>
                <br>
                

                <label for="cuisine">Cuisine</label>
                <select id="cuisine" name="cuisine" v-model="merchant_data.cuisine">
                <option value="japanese">Japanese</option>
                <option value="chinese">Chinese</option>
                <option value="french">French</option>
                <option value="western">Western</option>
                </select>
                <br>
                <label for="description">Short Description</label>
                <textarea id="description" name="description" placeholder="tell us about your restaurant" style="height:200px" v-model="merchant_data.description"></textarea>
                <input type="submit" value="Submit" @click="updateResProfile">
            </form>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import firebase from '../firebase.js'
const database = firebase.firestore();
//const storage = firebase.storage();

export default {
  data() {
      return {  
        merchant_id: '' , // Test
        doc_id: null,
        merchant_data: {
          merchant_id: null,
          merchant_name: '',
          address: '',
          operating_hours: {
            closing: '',
            opening: ''
          },
          contact: null,
          capacity: {
            five_seater: 0,
            four_seater: 0,
            three_seater: 0,
            two_seater: 0,
            one_seater: 0,
            total_seats: 0
          },
          safety_measures: {
            contact_trace: false,
            masks: false,
            safe_distance: false,
            temp_screening: false
          },
          cuisine: 'french',
          description: '',
        }
      }
    },
    methods: {
      fetchResProfile: function() {
        console.log("Pulling restaurant data")
              this.data_loaded = true;
              database.collection('merchants').where("merchant_id", "==", this.merchant_id).get().then((querySnapShot) => {
              querySnapShot.forEach(doc=> {
                  this.merchant_data = doc.data();
                  this.doc_id = doc.id;
                }
              )
            }).catch(function(error) {
              console.log("Error getting documents: ", error);
            })
      },
      updateResProfile: function() { // BUG: can only update when we click on submit with cmd (i.e. open in new tab)
        this.merchant_data.capacity.five_seater = parseInt(this.merchant_data.capacity.five_seater);
        this.merchant_data.capacity.four_seater = parseInt(this.merchant_data.capacity.four_seater);
        this.merchant_data.capacity.three_seater = parseInt(this.merchant_data.capacity.three_seater);
        this.merchant_data.capacity.two_seater = parseInt(this.merchant_data.capacity.two_seater);
        this.merchant_data.capacity.one_seater = parseInt(this.merchant_data.capacity.one_seater);
        this.merchant_data.capacity.total_seats = this.merchant_data.capacity.five_seater + this.merchant_data.capacity.four_seater + this.merchant_data.capacity.three_seater + this.merchant_data.capacity.two_seater + this.merchant_data.capacity.one_seater
        database.collection('merchants').doc(this.doc_id).update(this.merchant_data)
        .catch(function(error) {
          console.log("Error updating profile information: ", error);
        });
        alert("Your merchant profile has been updated successfully!");
        
      }
    },
    created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.merchant_id = user.uid;
        console.log("Getting signed in user")
        this.fetchResProfile();
      } else {
       console.log("Can't get signed in user")
      }
    });
    this.fetchResProfile();
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

input[type=checkbox] {
  margin: 5px 0px;
  width: 200px;
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
