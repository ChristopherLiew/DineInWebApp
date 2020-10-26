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
        <p class="description">Search for the restaurant of your dreams lol.</p>
        <input class="message-type-area" placeholder="Gimme Food!" type="text" v-model="search">
      <ul>
        <li v-for="result in filteredMerchants" :key="result.doc_id"> <!-- filteredMerchants is a filtered array of results-->
          {{result.merchant_id}}. {{result.merchant_name}}
        </li>
      </ul>
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
      search: '',
      results: [],
    }
  },
  methods: {
      fetchAllMerchants: function() {
      database.collection('merchants').get().then((querySnapShot) => {
        querySnapShot.forEach(doc=> {
          // Doc ID
          let merchant = {}
          merchant.doc_id = doc.id;
          merchant.merchant_id = doc.data().merchant_id
          merchant.merchant_name = doc.data().merchant_name;
          // Merchant link (TB Refined)
          // merchant.page_link = doc.merchant_pg_link
          this.results.push(merchant);
        })
      }).catch(function(error) {
        console.log("Error loading merchant info: ", error);
    });
    }
  },
  created() {
    this.fetchAllMerchants();
},
  computed: { // Use computed so that it changes when our search query changes
    // Filters merchant results array search
    filteredMerchants: function() {
      return this.results.filter((merchant) => {
        return merchant.merchant_name.match(this.search);
      })
    }
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

img {
    width: 300px;
    height: auto;
}
[v-cloak] {
  display: none;
}
.message-box {
  padding: 0px 4em;
}
.message-type-area {
  padding: 6px 6px;
  width: 30em;
}
.message-box-lists .message-box-title {
  margin: 30px 0px 20px;
}
.message-lists {
  border-collapse: collapse;
  width: 100%;
}
.message-lists td {
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  padding: 8px 6px;
}
.message-lists tr:hover {
  background: #efefef;
}
</style>

