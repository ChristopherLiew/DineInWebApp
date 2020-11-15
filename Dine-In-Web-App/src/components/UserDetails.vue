<template>
  <div>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
      <div class = "content">
        <h2>User Information</h2>
        <div v-if="data_loaded" class="container">
            <form v-on:submit.prevent="updateUserProfile">
                <label for="salutation">Salutation</label>
                <select id="salutation" name="salutation" v-model="user_data.name.salutation">
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mdm.">Mdm.</option>
                <option value="Others">Others</option>
                </select>

                <label for="firstname">First Name</label>
                <input type="text" id="firstname" name="firstname" v-model="user_data.name.first_name">

                <label for="lastname">Last Name</label>
                <input type="text" id="lastname" name="lastname" v-model="user_data.name.last_name">

                <label for="mobilenumber">Mobile Number</label>
                <input type="text" id="mobilenumber" name="mobilenumber" v-model="user_data.phone_number">
                <br>
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
//const storage = firebase.storage();

export default {
  data() {
      return {  
        data_loaded: false,
        user_id: '' , // Test
        doc_id: null,
        user_data: {
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
        }
      }
    },
    methods: {
      fetchUserProfile: function() {
        console.log("Pulling user data")
              database.collection('users').where("user_id", "==", this.user_id).get().then((querySnapShot) => {
              querySnapShot.forEach(doc=> {
                // Have to pull individually as some fields do not exist in the document yet
                  this.doc_id = doc.id;
                  if (doc.data().status == "new") {
                    this.user_data.user_id = doc.data().user_id;
                    this.user_data.user_name = doc.data().user_name;
                    this.user_data.email = doc.data().email;
                  } else {
                    this.user_data = doc.data();
                  }
                }
              )
            }).catch(function(error) {
              console.log("Error getting documents: ", error);
            })
      },
      updateUserProfile: function() {
        this.user_data.status = "registered";
        database.collection('users').doc(this.doc_id).update(this.user_data).then(function() {console.log("Updated!")})
        .catch(function(error) {
          console.log("Error updating profile information: ", error);
        });
        alert("Your user profile has been updated successfully!");
        this.$router.push({name: "profile"})
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
    created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user_id = user.uid;
        console.log("Getting signed in user")
        this.fetchUserProfile();
        this.data_loaded = true;
      } else {
       console.log("Can't get signed in user")
      }
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
