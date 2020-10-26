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
      <router-link to="/">Home</router-link>
      <router-link to="/profile">Profile</router-link>
      <router-link to="/map">Map</router-link>
      <router-link to="/search">Search</router-link>
      <router-link to="/login">Login</router-link>
    </div>

    <div class="content">
      <h2>Home Page</h2>
      <p>This example use media queries to transform the sidebar to a top navigation bar when the screen size is 700px or less.</p>
      <p>We have also added a media query for screens that are 400px or less, which will vertically stack and center the navigation links.</p>
      <h3>Resize the browser window to see the effect.</h3>
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
      merchantInfo: {
        imgURL: null
      },
      merchant_id: 1, // Should be passed as a prop from Login Page. Upon Log In, Auth should return user_id and update parent before passing to profile
      loaded: false, // Triggered when data has sucessfully been pulled after Vue app is mounted
      uploadPct: 0,
      imageData: null,
    }
  },
  methods: {
    // 1) Pull profile information from Firebase
    fetchMerchant: function() {
      database.collection('merchants').where("merchant_id", "==", this.merchant_id).get().then((querySnapShot) => {
        querySnapShot.forEach(doc=>{
          console.log("Merchant data =>", doc.data());
          // Document ID
          this.doc_id = doc.id;
          // Merchant Profile Data
          this.merchantInfo.merchant_name = doc.data().merchant_name;
          this.merchantInfo.address = doc.data().address;
          this.merchantInfo.merchant_rating = doc.data().merchant_rating;
          // Operating Info 
          this.merchantInfo.opening_hours = doc.data().opening_hours;
          this.merchantInfo.closing_hours = doc.data().closing_hours;
          // Profile Image URL
          this.merchantInfo.carousel_imgURL = doc.data().carousel_imgURL;
          // Data loaded sucessfully
          this.loaded = true;
        })
      }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    },
    // THIS SECTION SHOULD EVENTUALLY GO INTO RESTAURANT BACKEND !!!
    updateMerchantProfile: function() {
      database.collection('merchants').doc(this.doc_id).update(
        this.merchantInfo
        ).then(function() {
          console.log("Merchant information successfully updated!")
        }).catch(function(error) {
          console.log("Error updating Merchant information: ", error);
        })
    },
    setMerchantImage: function() {
        let uploadTask = storage.ref(`${this.imageData.name}`).put(this.imageData);
        uploadTask.on('state_changed', 
        snapshot => {
          this.uploadPct = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        },
        error => {
          console.log("Error uploading Merchant picture ", error);
        },
        () => {
          this.uploadPct = 100;
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.merchantInfo.carousel_imgURL = downloadURL; // Profile Info has image URL and can directly pull with img tag
            this.updateProfile(); // Call on update profile to update downloadURL
            console.log("New Merchant image available at: ", downloadURL);
          })
        }
      )
    },
    inputImage(event) {
      this.uploadValue=0;
      this.picture=null;
      this.imageData = event.target.files[0];
    },
  },
  // Lifecycle Hooks 
  created() {
    this.fetchMerchant()
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

</style>

