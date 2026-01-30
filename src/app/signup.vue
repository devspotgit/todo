


<script>

</script>

<template>
    <div v-if="form == 'signup'" class="form-wrapper">
        <form class="form">
            <button @click="activeForm = 'none'"><i class="fa-solid fa-x"></i></button>
            <span>Sign up</span>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Submit</button>
            <span>Already have an account, <button @click="activeForm = 'login'">Login</button></span>
        </form>
    </div>
</template>

