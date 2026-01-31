

<script>

    import Login from "./login.vue"

    import Signup from "./signup.vue"

    import Spinner from "./spinner.vue"

    import AddItem from "./add_item.vue"

    import Home from "./home.vue"

    import RenameItem from "./rename_item.vue"

    import Message from "./message.vue"


    export default {

        props:{

            data: Object
        },
        
        data(){

            return {

                activeForm: "",

                message: "",

                spinner: false,

                itemList: this.data.itemList,

                user: this.data.user,

                activeCategory: "all",

                currentItem: null
            }
        },

        components:{

            Spinner,

            Signup,

            Login,

            AddItem,

            Home,

            RenameItem,

            Message
        },

        methods:{

            setMessage(mes){

                this.message = mes

                setTimeout(() => {

                    this.message = ""

                }, 6000)
            }
        }
    }
</script>


<template>

    <Spinner 
        :spinner="spinner"
    />

    <Message 
        :class="message ? 'mes-anim' : ''" :message="message"
    />

    <Signup 
        :active-form="activeForm" 
        @set-active-form="(form) => activeForm = form"
        @set-message="setMessage"
    />

    <Login 
        :active-form="activeForm" 
        @set-active-form="(form) => activeForm = form"
    />

    <AddItem 
        :active-form="activeForm" 
        @set-active-form="(form) => activeForm = form"
    />

    <RenameItem 
        :active-form="activeForm" 
        @set-active-form="(form) => activeForm = form"
    />

    <Home 
        :active-category="activeCategory"
        :item-list="activeCategory == 'all' ? itemList : activeCategory == 'active' ? itemList.filter(item => item.status == 'active') : itemList.filter(item => item.status == 'complete')"
        @set-active-category="(category) => activeCategory = category"
        @set-active-form="(form) => activeForm = form"
        :user="data.user"
    />

    



</template>




