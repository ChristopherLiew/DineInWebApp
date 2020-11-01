<template>
    <div class="signup container"> 
        <form @submit.prevent="signup" class="card-panel">
            <h2 class="center pink-text">Create Account</h2>
            <div class="field">
                <label for="email">Email:</label>
                <input type="email" name="email" v-model="email">
            </div>
            <div class="field">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password">
            </div>
            <div class="field">
                <label for="alias">Alias:</label>
                <input type="text" name="alias" v-model="alias">
            </div>
            <p class="red-text center" v-if="feedback">{{feedback}}</p>
            <div class="field center">
                <button class="btn pink">Sign Up</button>
            </div>    


        </form>

    


    </div>

    
</template>


<script>

</script>

<style>
.signup{
    max-width: 500px;
    margin-top: 60px;
    padding-bottom: 7px;
    
}
.signup h2{
    font-size:2.4em;
}
.signup .field{
    margin-bottom: 16px;

}



</style>