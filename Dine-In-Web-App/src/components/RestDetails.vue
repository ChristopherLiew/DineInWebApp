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
        <router-link to="/restbackend">Restaurant Management</router-link>
        <router-link to="/restdetails">Restaurant Profile</router-link>
        <router-link to="/signup">Sign Up</router-link>
        <hr>
        <a href="#" @click="logOut()">Log Out</a>
      </div>

      <div class = "content">
          <h2>Restaurant Information</h2>
        <div class="container">
            <form v-if="data_loaded" v-on:submit.prevent="updateResProfile">
                <label for="restaurantname">Name of Restaurant</label>
                <input type="text" id="restaurantname" name="restaurantname" v-model="merchant_data.merchant_name">

                <label for="address">Address</label>
                <input type="text" id="address" name="address" v-model="merchant_data.address">

                <label for="opening">Opening Time</label>
                <input type="time" id="opening" name="opening" v-model="merchant_data.operating_hours.opening">
                <label for="closing">Closing Time</label>
                <input type="time" id="closing" name="closing" v-model="merchant_data.operating_hours.closing">

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
                <br>
                <label for="imgupload">Images of your Restaurant here:</label>
                <hr>
                <br>
                <label for="interiorimg">1. Interior of Store:</label>
                <div>
                  <div>
                    <input type="file" @change="inputImage" accept="image/*" >
                  </div>
                  <div>
                    <p>Progress: {{uploadPct1.toFixed()+"%"}}
                    <progress id="progress" :value="uploadPct1" max="100" ></progress>  </p>
                  </div>
                    <div v-if="imageData!=null">
                      <button type="button" @click="setRestImage('interior')">Upload</button>
                    </div>
                  </div>
                  <img v-if="merchant_data.imgURL.interior != null && loaded == true" :src=merchant_data.imgURL.interior alt="Interior Pic">
                <br>
                <label for="exteriorimg">2. Store Front:</label>
                <div>
                  <div>
                    <input type="file" @change="inputImage" accept="image/*" >
                  </div>
                  <div>
                    <p>Progress: {{uploadPct2.toFixed()+"%"}}
                    <progress id="progress" :value="uploadPct2" max="100" ></progress>  </p>
                  </div>
                    <div v-if="imageData!=null">
                      <button type="button" @click="setRestImage('exterior')">Upload</button>
                    </div>
                  </div>
                  <img v-if="merchant_data.imgURL.exterior != null && loaded == true" :src=merchant_data.imgURL.exterior alt="Exterior Pic">
                <br>
                <label for="foodimg">3. Food Selection:</label>
                <div>
                  <div>
                    <input type="file" @change="inputImage" accept="image/*" >
                  </div>
                  <div>
                    <p>Progress: {{uploadPct3.toFixed()+"%"}}
                    <progress id="progress" :value="uploadPct3" max="100" ></progress>  </p>
                  </div>
                    <div v-if="imageData!=null">
                      <button type="button" @click="setRestImage('food')">Upload</button>
                    </div>
                  </div>
                  <img v-if="merchant_data.imgURL.food != null && loaded == true" :src=merchant_data.imgURL.food alt="Food Pic">
                <br>
                <label for="covidmeasures">COVID measures:</label>
                <hr>
                <br>
                <label for="covidmeasures">Contact Tracing</label>
                <input type="checkbox" id="contacttracing" name="contacttracing" value=True v-model="merchant_data.safety_measures.contact_trace">
                <label for="covidmeasures">Masks Required</label>              
                <input type="checkbox" id="masks" name="masks" value=True v-model="merchant_data.safety_measures.masks">
                <br>
                <label for="covidmeasures">Safe Distancing</label>
                <input type="checkbox" id="safedistancing" name="safedistancing" value=True v-model="merchant_data.safety_measures.safe_distance">
                <label for="covidmeasures">Temperature Screening</label>
                <input type="checkbox" id="temperaturescreening" name="temperaturescreening" value=True v-model="merchant_data.safety_measures.temp_screening">
                <br>
                <br>
                <label for="cuisine">Cuisine</label>
                <select id="cuisine" name="cuisine" v-model="merchant_data.cuisine">
                <option value="japanese">Japanese</option>
                <option value="chinese">Chinese</option>
                <option value="korean">Korean</option>
                <option value="indian">Indian</option>
                <option value="malay">Malay</option>
                <option value="taiwanese">Taiwanese</option>
                <option value="french">French</option>
                <option value="italian">Italian</option>
                <option value="british">British</option>
                </select>
                <br>
                <label for="description">Short Description</label>
                <textarea id="description" name="description" placeholder="tell us about your restaurant" style="height:200px" v-model="merchant_data.description"></textarea>
                <input type="submit" value="Submit"/>
            </form>
        </div>
      </div>
    </body>
  </div>
</template>
<script>
import firebase from '../firebase.js'
const database = firebase.firestore();
const storage = firebase.storage();

export default {
  data() {
      return {  
        data_loaded: false,
        merchant_id: '' , // Test
        doc_id: null,
        merchant_data: {
          status: 'new',
          merchant_id: '',
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
          filledseats: {
            one_seater: null,
            two_seater: null,
            three_seater: null,
            four_seater: null,
            five_seater: null      
          },
          safety_measures: {
            contact_trace: false,
            masks: false,
            safe_distance: false,
            temp_screening: false
          },
          cuisine: 'french',
          description: '',

          imgURL: {
            interior: '',
            exterior: '',
            food: ''
          }
        },
        loaded: false, // Triggered when data has sucessfully been pulled after Vue app is mounted
        uploadPct1: 0,
        uploadPct2: 0,
        uploadPct3: 0,
        imageData: null
      }
    },
    methods: {
      fetchResProfile: function() {
        console.log("Pulling restaurant data")
              database.collection('merchants').where("merchant_id", "==", this.merchant_id).get().then((querySnapShot) => {
              querySnapShot.forEach(doc=> {
                  this.doc_id = doc.id;
                  if (doc.data().status == "new") {
                    this.merchant_data.merchant_id = doc.data().merchant_id;
                  } else {
                    this.merchant_data = doc.data();
                    // Handle UNIXTIME for operating hours
                    let opening = new Date(this.merchant_data.operating_hours.opening * 1000);
                    var opening_min = opening.getMinutes() < 10 ? '0' + opening.getMinutes() : opening.getMinutes();
                    let opening_formatted = opening.getHours() + ":" + opening_min;
                    let closing = new Date(this.merchant_data.operating_hours.closing * 1000);
                    var closing_min = closing.getMinutes() < 10 ? '0' + closing.getMinutes() : closing.getMinutes();
                    let closing_formatted = closing.getHours() + ":" + closing_min
                    this.merchant_data.operating_hours.opening = opening_formatted;
                    this.merchant_data.operating_hours.closing = closing_formatted;
                  }
                }
              )
            }).catch(function(error) {
              console.log("Error getting documents: ", error);
            })
        },
      updateResProfile: function() { 
        this.merchant_data.capacity.five_seater = parseInt(this.merchant_data.capacity.five_seater);
        this.merchant_data.capacity.four_seater = parseInt(this.merchant_data.capacity.four_seater);
        this.merchant_data.capacity.three_seater = parseInt(this.merchant_data.capacity.three_seater);
        this.merchant_data.capacity.two_seater = parseInt(this.merchant_data.capacity.two_seater);
        this.merchant_data.capacity.one_seater = parseInt(this.merchant_data.capacity.one_seater);
        this.merchant_data.capacity.total_seats = this.merchant_data.capacity.five_seater + this.merchant_data.capacity.four_seater + this.merchant_data.capacity.three_seater + this.merchant_data.capacity.two_seater + this.merchant_data.capacity.one_seater;
        this.merchant_data.vacancy = this.merchant_data.capacity;
        // Set 1970/01/01 as 
        this.merchant_data.operating_hours.opening = Math.round(new Date("1970/01/01 " + this.merchant_data.operating_hours.opening + ":00").getTime()/1000);
        this.merchant_data.operating_hours.closing = Math.round(new Date("1970/01/01 " + this.merchant_data.operating_hours.closing + ":00").getTime()/1000);
        this.merchant_data.status = "registered";
        database.collection('merchants').doc(this.doc_id).update(this.merchant_data).then(function() {
          console.log("Updated!")
          alert("Your merchant profile has been updated successfully!");
          location.reload();
          })
        .catch(function(error) {
          console.log("Error updating profile information: ", error);
        });
      },
      // 3) Set Rest Image 
    setRestImage: function(img_type) { // interior, exterior & food
        let uploadTask = storage.ref('rest_imgs/').child(this.merchant_id + '/' + `${this.imageData.name}`).put(this.imageData);
        uploadTask.on('state_changed', 
        snapshot => {
          if (img_type == 'interior') {
            this.uploadPct1 = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          } else if (img_type == 'exterior') {
            this.uploadPct2 = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          } else {
            this.uploadPct3 = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          }
        },
        error => {
          console.log("Error uploading restaurant picture ", error);
        },
        () => {
          this.uploadPct = 100;
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.merchant_data.imgURL[img_type] = downloadURL; // Profile Info has image URL and can directly pull with img tag
            console.log("New restaurant image available at: ", downloadURL);
          })
        }
      )
    },
    inputImage(event) {
      this.uploadValue=0;
      this.picture=null;
      this.imageData = event.target.files[0];
    },
    // Logout
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
    created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.merchant_id = user.uid;
        console.log("Getting signed in user")
        this.fetchResProfile();
      } else {
       console.log("Can't get signed in user")
      }
      this.data_loaded = true;
    });
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
