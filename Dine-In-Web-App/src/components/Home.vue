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
      <div class="accountbar">
        <button class="login">Login</button>
        <button class="signup">Sign Up</button>
      </div>
      <div class="content">

        <div
          class="info"
          :style="{
            'background-image': 'url(https://vuejs.org/images/logo.png)',
          }"
        >
          <h1>What shall we explore today?</h1>
        </div>
        <div class="row">
          <h1>Japanese Food</h1>
          <div class="cards">
            <div class="card">
              <img
                class="card-img-top"
                src="https://placekitten.com/g/200/200"
                alt="Card image cap"
                height="100"
                width="100"
                style="border-radius: 0.6rem"
              />
              <div class="card-block">
                <h4 class="card-title">Name</h4>
                <p class="card-text">Some quick example text to build</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
            <div class="card">
              <img
                class="card-img-top"
                src="https://placekitten.com/g/200/200"
                alt="Card image cap"
                height="100"
                width="100"
                style="border-radius: 0.6rem"
              />
              <div class="card-block">
                <h4 class="card-title">Name</h4>
                <p class="card-text">Some quick example text to build</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
            <div class="card">
              <img
                class="card-img-top"
                src="https://placekitten.com/g/200/200"
                alt="Card image cap"
                height="100"
                width="100"
                style="border-radius: 0.6rem"
              />
              <div class="card-block">
                <h4 class="card-title">Name</h4>
                <p class="card-text">Some quick example text to build</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
            <div class="card">
              <img
                class="card-img-top"
                src="https://placekitten.com/g/200/200"
                alt="Card image cap"
                height="100"
                width="100"
                style="border-radius: 0.6rem"
              />
              <div class="card-block">
                <h4 class="card-title">Name</h4>
                <p class="card-text">Some quick example text to build</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
            <div class="card">
              <img
                class="card-img-top"
                src="https://placekitten.com/g/200/200"
                alt="Card image cap"
                height="100"
                width="100"
                style="border-radius: 0.6rem"
              />
              <div class="card-block">
                <h4 class="card-title">Name</h4>
                <p class="card-text">Some quick example text to build</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
            <div class="card">
              <img
                class="card-img-top"
                src="https://placekitten.com/g/200/200"
                alt="Card image cap"
                height="100"
                width="100"
                style="border-radius: 0.6rem"
              />
              <div class="card-block">
                <h4 class="card-title">Name</h4>
                <p class="card-text">Some quick example text to build</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <h1>Japanese Food</h1>
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
  height: auto;
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
.accountbar {
  height: auto;
}

.login {
  float: right;
  background-color: blue; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
}

.signup {
  float: right;
  background-color: blue; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
}
/* Style the counter cards */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 5px;
  text-align: center;
  background-color: white;
  width: 20rem;
  display: inline-block;
}

.cards {
  padding: 16px;
  overflow: scroll;
  white-space: nowrap;
}

::-webkit-scrollbar {
  width: 0px; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}
</style>

