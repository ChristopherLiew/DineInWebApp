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
        <router-link to="/map">Map</router-link>
        <router-link to="/submitrestaurant">Submit restaurant</router-link>
        <router-link to="/usersignup">Sign Up</router-link>
      </div>
      <div class = "content">
          <h2>Restaurant Information</h2>
        <div class="container">
            
            <form onsubmit="sendrestaurantdetails">
                <label for="restaurantname">Name of Restaurant</label>
                <input type="text" id="restaurantname" name="restaurantname">

                <label for="address">Address</label>
                <input type="text" id="address" name="address">

                <label for="opening">Opening Time</label>
                <input type="text" id="opening" name="opening" >
                <label for="closing">Closing Time</label>
                <input type="text" id="closing" name="closing" >

                <label for="contact">Contact Number</label>
                <input type="text" id="contact" name="contact">

                <label for="oneseater">How many 1-seaters</label>
                <input type="text" id="oneseater" name="oneseater">
                <label for="twoseater">How many 2-seaters</label>
                <input type="text" id="twoseater" name="twoseater">
                <label for="threeseater">How many 3-seaters</label>
                <input type="text" id="threeseater" name="threeseater">
                <label for="fourseater">How many 4-seaters</label>
                <input type="text" id="fourseater" name="fourseater">
                <label for="fiveseater">How many 5-seaters</label>
                <input type="text" id="fiveseater" name="fiveseater">

                <label for="cuisine">COVID measures</label>
                <br><br>
                <label for="vehicle1">Contact Tracing</label>
                <input type="checkbox" id="contacttracing" name="contacttracing" value=True>
                <label for="vehicle2">Masks Required</label>              
                <input type="checkbox" id="masks" name="masks" value="Car">
                <label for="vehicle3">Safe Distancing</label>
                <input type="checkbox" id="safedistancing" name="safedistancing" value="Boat">
                <label for="vehicle3">temperature screening</label>
                <input type="checkbox" id="temperaturescreening" name="temperaturescreening" value="monkey">
                <br>
                <br>
                

                <label for="cuisine">Cuisine</label>
                <select id="cuisine" name="cuisine">
                <option value="japanese">Japanese</option>
                <option value="chinese">Chinese</option>
                <option value="french">French</option>
                </select>
                <br>
                <label for="description">Short Description</label>
                <textarea id="description" name="description" placeholder="tell us about your restaurant" style="height:200px"></textarea>

                <input type="submit" value="Submit" @click="sendrestaurantdetails">
            </form>
        </div>
      </div>

    </body>
  </div>
</template>

<script>
// import QuantityCounter from '../components/QuantityCounter.vue'
import firebase from '../firebase.js'
const database = firebase.firestore();
//const storage = firebase.storage();

export default {
  data() {
      return { //presumes that id is passed
        user_id: null 
      }
    },
    methods: {
      sendrestaurantdetails: function() {
        //var documentID;
        console.log("make contact");
        database.collection("merchants").add({
          merchant_name: document.getElementById('restaurantname').value,
          address: document.getElementById('address').value,
          contact: document.getElementById('contact').value,
          cuisine: document.getElementById('cuisine').value,
          operating_hours: {
            opening: document.getElementById('opening').value,
            closing: document.getElementById('closing').value
          },
          safety_measures: {
            contact_trace: document.getElementById('contacttracing').value,
            masks: document.getElementById('masks').value,
            safe_distance: document.getElementById('safedistancing').value,
            temp_screening: document.getElementById('temperaturescreening').value
          }
          // capacity: {
          //   one_seater: document.getElementById('oneseater').value
          // }
        })
        //.then(function(doc){
          //documentID = doc.id;
          //console.log("save contact");
        //})
        .catch(function() {
           console.log("Error writing basic info");
        });
        console.log("saved basic info");
      }
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
