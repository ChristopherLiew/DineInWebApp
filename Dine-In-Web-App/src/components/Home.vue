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
    </div>

    <div class="content">
      <div class="overallcontainer">
        <div class="headerimage">
          <p>image goes here</p>
        </div>
        <div class="carousel">
          <div class="restaurantcard">
          </div>
        </div>
        <div class="carousel">
          <p>image goes here</p>
        </div>
        <div class="carousel">
          <p>image goes here</p>
        </div>
      </div>
    </div>
  </body>

</div>
</template>
<script>
// Functionality
// 1) Search bar (See: https://codepen.io/trevoreyre/pen/JjGxLEm)
//    - Dropdown with suggestions?
//    - Get link to restaurant page
// 2) Carousel with Links + Pull Image/Caption/etc. from Firebase
// 3) Logged In vs Non-Logged In state trigger

export default {
  
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
  /*background-image: linear-gradient( rgb(78, 223, 78), rgb(85, 199, 228));*/
}

.overallcontainer {
  grid-template-columns: 40px 50px auto;
  grid-template-rows: 25% 1400 px auto;
}

.restaurantcard {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 5px;
  text-align: center;
  background-color: #444;
  color: white;
}

.headerimage{
  outline-color: coral;
  background-image:'url(https://vuejs.org/images/logo.png)';
}

.carousel{
  outline-color: coral;
}

</style>

