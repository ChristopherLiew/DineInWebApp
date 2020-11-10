<template>
<div>
      <Dropdown
        :options="options"
        v-on:selected="getSelection" 
        v-on:filter="filteredMerchants"
        :disabled="false"
        name="dine_in_search"
        :maxItem="5"
        placeholder="Find a restaurant">
      </Dropdown>
</div>
</template>

<script type="text/javascript">
import firebase from '../firebase.js'
import Dropdown from 'vue-simple-search-dropdown';
const database = firebase.firestore();

export default {
  data() {
    return {
      options : []
    }
  },
  components: {
      Dropdown
    },
  methods: {
      fetchAllMerchants: function() {
      database.collection('merchants').get().then((querySnapShot) => {
        querySnapShot.forEach(doc=>{
          let merchant = {}
          merchant.name = doc.data().merchant_name;
          merchant.id = doc.data().merchant_id;
          this.options.push(merchant);
        })
       }).catch(function(error) {
        console.log("Error loading merchant info: ", error);
      });
    },

    getSelection: function(selection) {      
      console.log(selection.name + ' has been selected');
      if (selection.name != undefined) {
        this.$router.push({name: 'restaurant', params: {id: selection.id}})
      }
    },
    filteredMerchants: function(search) { // Filter options array based on search
      return this.options.filter((x) => {
        return x.name.match(search);
      })
    }
  },

  created() {
    this.fetchAllMerchants();
  },
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

