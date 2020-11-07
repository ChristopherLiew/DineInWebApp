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
        <router-link to="/signup">Sign Up</router-link>
      </div>
      <div class = "content">
          <h2>Restaurant Information</h2>
        <div class="container">
            
            <form action="/action_page.php">
                <label for="fname">Name of Restaurant</label>
                <input type="text" id="fname" name="firstname">

                <label for="lname">Address</label>
                <input type="text" id="lname" name="lastname">
                <br>
                <label for="subject">Subject</label>
                <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px"></textarea>

                <input type="submit" value="Submit">
            </form>
        </div>
      </div>

    </body>
  </div>
</template>

<script>
// import QuantityCounter from '../components/QuantityCounter.vue'

export default {};
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

li{

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
