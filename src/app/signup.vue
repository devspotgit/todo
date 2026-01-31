


<script>

    export default {

        emits: [ "setActiveForm", "setSpinner", "setMessage" ],

        props:{

            activeForm: Boolean
        },

        methods:{

            formWrapperClicked(e){

                if(e.target == e.currentTarget){

                    this.$emit('setActiveForm', 'none')
                }
            },

            async signupSubmit(e){

                e.preventDefault()

                this.$emit("setSpinner", true)

                const formData = new FormData(e.target)

                const { error, data } = await fetch("/api/signup", {

                    method: "POST",

                    headers:{

                        "Content-Type": "application/json"
                    },

                    body:JSON.stringify(Object.fromEntries(formData.entries()))

                }).then(res => res.json())

                this.$emit("setSpinner", false)

                if(error){

                    this.$emit("setMessage", error.message)
                }
                else{

                    this.$emit("setMessage", "account created, login now")

                    this.$emit("setActiveForm", "login")
                }
            }
        }
    }

</script>

<template>
    <div v-if="activeForm == 'signup'" class="form-wrapper" @click="formWrapperClicked">
        <form class="form" @submit="signupSubmit">
            <button @click="$emit('setActiveForm', 'none')"><i class="fa-solid fa-x"></i></button>
            <span>Sign up</span>
            <input type="text" placeholder="Email" name="email"/>
            <input type="password" placeholder="Password" name="password"/>
            <button>Submit</button>
            <span>Already have an account, <button @click="$emit('setActiveForm', 'login')">Login</button></span>
        </form>
    </div>
</template>

