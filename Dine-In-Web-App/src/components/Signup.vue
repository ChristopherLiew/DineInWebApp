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
        <h2>Create Account</h2>
        <div class="signupcontainer">
            <form class="card-panel">
                <label for="email">Email:</label>
                <div class="field">
                    <span><input type="email" name="email" v-model="email"></span>
                </div>
                <label for="password">Password:</label>
                <div class="field"> 
                    <span><input type="password" name="password" v-model="password"></span>
                </div>
                <label for="username">Username:</label>
                <div class="field">
                    <span><input type="text" name="username" v-model="username"></span>
                </div>
                <br>
                <button class="register">Sign Up</button> 
            </form>
            </div>
        </div>

    </body>
  </div>
</template>

<script>
import slugify from 'slugify';
import db from '@/firebase/init';
import firebase from 'firebase';
import functions from 'firebase/functions'

export default {
    name: 'Signup',
    data(){
        return{
            email:null,
            password:null,
            alias:null,
            feedback:null,
            slug:null
            
        }
    },
    methods: {
        signup(){
            if(this.alias && this.email && this.password){
                if(this.password.length<8){
                    this.feedback = "Password length must be 8 characters or more"
                } else if(this.password.length > 16){
                    this.feedback= "Password must be no more than 16 characters"
                } else{
                this.feedback = null
                this.slug = slugify(this.alias,{
                    replacement:'-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower:true
                })
                let checkAlias = firebase.functions().httpsCallable('checkAlias');
                checkAlias({slug: this.slug}).then(result => {
                    console.log(result)
                    if(!result.data.unique){
                        this.feedback = 'This alias already exists'
                    } else {
                        // //new function
                        // let createUser = firebase.functions().httpsCallable('createUser');
                        // createUser({slug: this.slug, email: this.email, password: this.password, alias: this.alias})
                        // .then(result => {
                        //     this.$router.push({name: 'AddressBar'})
                        // })

                        //new try using a new function
                        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(cred => {
                            let makeUser = firebase.functions().httpsCallable('makeUser');
                            console.log('Logged in')
                            makeUser({slug: this.slug, alias: this.alias, user_id: cred.user.uid})
                        }).then(() => {
                                this.$router.push({name: 'AddressBar'})
                            })
                    }
                    })
                }
            } else {  
                this.feedback= "You must enter all fields"
            }
            
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

.signupcontainer {
  border: 2px solid #ccc;
  background-color: #eee;
  padding: 5px;
  border-radius: 10px 10px 10px 10px;
  margin-top: 10px;
  height:20%;
  width: 20%;
  margin: auto;

}

.register {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
  height: 20%;
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
