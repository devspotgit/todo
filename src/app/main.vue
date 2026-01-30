

<script>
    export default {

        props:{

            data: Object
        },
        
        data(){

            return {

                activeForm: "none",

                message: "",

                spinner: false,

                itemList: this.data.itemList,

                user: this.data.user,

                activeCategory: "all",

                selectedItem: []
            }
        },

        methods:{

        }
    }
</script>


<template>
    
</template>




