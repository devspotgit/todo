
<script>

    export default {

        emits: [ "setActiveForm", "setSpinner", "setMessage", "setUser", "setItemList" ],

        props:{

            activeForm: Boolean
        },

        methods:{

            formWrapperClicked(e){

                if(e.target == e.currentTarget){

                    this.$emit('setActiveForm', 'none')
                }
            },
    
            async loginSubmit(e){
    
                e.preventDefault()

                this.$emit("setSpinner", true)
    
                const formData = new FormData(e.target)

                const { data, error } = await fetch("/api/login", {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(Object.fromEntries(formData.entries()))

                }).then(res => res.json())

                this.$emit("setSpinner", false)

                if(error){

                    this.$emit("setMessage", error.message)
                }
                else{

                    this.$emit("setUser", data.user)

                    this.$emit("setItemList", data.itemList)

                    this.$emit("setActiveForm", "none")
                }
            }
        }
    }

</script>

<template>
    <div  v-if="activeForm == 'login'" class="form-wrapper" @click="formWrapperClicked">
        <form class="form" @submit="loginSubmit">
            <button @click="$emit('setActiveForm', 'none')"><i class="fa-solid fa-x"></i></button>
            <span>Login</span>
            <input type="text" placeholder="Email" name="email"/>
            <input type="password" placeholder="Password" name="password" />
            <button>Submit</button>
            <span>Don't have an account yet, <button @click="$emit('setActiveForm', 'signup')">Sign up</button></span>
        </form>
    </div>
</template>


