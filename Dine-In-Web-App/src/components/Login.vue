<template>
    <div class="login container">
        <form  @submit.prevent="login" class="card-panel">
            <h2 class="center pink-text">Welcome!</h2>
            <div class="field">
                <label for="email">Email:</label>
                <input type="email" name="email" v-model="email">
            </div>
            <div class="field">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password">
            </div>

            <p v-if="feedback" class="red-text center">{{feedback}}</p>
            <div class="field center-align">
                <button class="btn pink">Login</button>
            </div>
        </form>



    </div>
</template>


<script>

</script>


<style>
.login{
    max-width:400px;
    margin-top:60px;
}
.login h2{
    font-size: 2.4em;
}

.login .field{
    margin-bottom: 16px;
}

</style>