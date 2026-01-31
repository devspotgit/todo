


<script>

    export default{

        emits:[ "setActiveForm", "setSpinner", "setMessage", "addItem" ],

        props:{

            activeForm: Boolean
        },

        methods:{

            formWrapperClicked(e){

                if(e.target == e.currentTarget){

                    this.$emit('setActiveForm', 'none')
                }
            },

            async addItemSubmit(e){

                e.preventDefault()

                this.$emit("setSpinner", true)

                const formData = new FormData(e.target)

                const { error, data } = await fetch("/api/add-item", {

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

                    this.$emit("addItem", data)

                    this.$emit("setMessage", "item added")

                    this.$emit("setActiveForm", "none")
                }
            }
        }
    }

</script>

<template>
    <div v-if="activeForm == 'add_item'" class="form-wrapper" @click="formWrapperClicked">
        <form class="form" @submit="addItemSubmit">
            <button @click="this.$emit('setActiveForm', 'none')"><i class="fa-solid fa-x"></i></button>
            <span>Add Item</span>
            <input type="text" placeholder="Item name" name="name" />
            <button>Submit</button>
        </form>
    </div>
</template>

