

<script>

    export default{

        emits:[ "setActiveForm", "setSpinner", "setMessage", "setItemName" ],

        props:{

            activeForm: Boolean,

            item: Object
        },

        methods:{

            formWrapperClicked(e){

                if(e.target == e.currentTarget){

                    this.$emit('setActiveForm', 'none')
                }
            },

            async renameSubmit(e){

                e.preventDefault()

                this.$emit("setSpinner", true)

                const formData = new FormData(e.target)

                const { data, error } = await fetch("/api/rename", {

                    method: "POST",

                    headers:{

                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        item: this.item,

                        name: formData.get("name")
                    })

                }).then(res => res.json())

                this.$emit("setSpinner", false)

                if(error){

                    this.$emit("setMessage", error.message)
                }
                else{

                    this.$emit("setItemName", {

                        item: this.item,

                        name: formData.get("name")
                    })

                    this.$emit("setActiveForm", "none")

                    this.$emit("setMessage", "item renamed")
                }
            }
        }
    }

</script>

<template>
    <div v-if="activeForm == 'rename_item'" class="form-wrapper" @click="formWrapperClicked">
        <form class="form" @submit="renameSubmit">
            <button @click="$emit('setActiveForm', 'none')"><i class="fa-solid fa-x"></i></button>
            <span>Rename Item</span>
            <input type="text" placeholder="Item name" name="name"/>
            <button>Submit</button>
        </form>
    </div>
</template>

