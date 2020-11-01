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
      </div>

      <div class="content">
        <div id="map"></div>
      </div>
    </body>
  </div>
</template>
<script>
// Functionality
// 1) ??? TBD ??? Entirely via maps API?

export default {
  name: "GMap",
  data() {
    return {
      lat: 1.352,
      lng: 103.812507,
    };
  },
  // methods: {
  //   renderMap() {
  //     new google.maps.Map(document.getElementById("map"), {
  //       center: { lat: this.lat, lng: this.lng },
  //       zoom: 12,
  //       maxZoom: 15,
  //       minZoom: 3,
  //       streetViewControl: false,
  //     });
  //   },
  // },
  // mounted() {
  //   this.renderMap();
  // },
};
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
  height: 1000px;
  background-image: linear-gradient(rgb(78, 223, 78), rgb(85, 199, 228));
}
</style>

