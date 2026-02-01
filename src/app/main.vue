

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

                }, 5000)
            },

            setItem(item){

                const selectedItem = this.itemList.find(_item => _item == item)

                selectedItem.selected = !selectedItem.selected
            },

            setItemName({ item, name }){

                const _item = this.itemList.find( __item => __item == item)

                _item.name = name
            },

            deleteSelected(items){

                this.itemList = this.itemList.filter(item => {
                    
                    if(items.find(_item => item == _item)) return false

                    else return true
                })
            },

            setSelectedActive(items){

                items.forEach(item => item.status = "active")
            },

            setSelectedComplete(items){

                items.forEach(item => item.status = "complete")
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
        @set-spinner="(val) => spinner = val"
    />

    <Login 
        :active-form="activeForm" 
        @set-active-form="(form) => activeForm = form"
        @set-message="setMessage"
        @set-spinner="(val) => spinner = val"
        @set-user="(val) => user = val"
        @set-item-list="(items) => itemList = items"
    />

    <AddItem 
        :active-form="activeForm" 
        @set-active-form="(form) => activeForm = form"
        @set-message="setMessage"
        @set-spinner="(val) => spinner = val"
        @add-item="(item) => itemList.push(item)"
    />

    <RenameItem 
        :active-form="activeForm" 
        :item="currentItem"
        @set-active-form="(form) => activeForm = form"
        @set-item-name="setItemName"
        @set-message="setMessage"
        @set-spinner="(val) => spinner = val"
    />

    <Home 
        :user = "user"
        :active-category="activeCategory"
        :item-list="activeCategory == 'all' ? itemList : activeCategory == 'active' ? itemList.filter(item => item.status == 'active') : itemList.filter(item => item.status == 'complete')"
        @set-active-category="(category) => activeCategory = category"
        @set-active-form="(form) => activeForm = form"
        @set-current-item="(item) => currentItem = item"
        @set-item="setItem"
        @set-user="(val) => user = val"
        @set-item-list="(val) => itemList = val"
        @set-message="setMessage"
        @set-spinner="(val) => spinner = val"
        @delete-selected="deleteSelected"
        @set-selected-active="setSelectedActive"
        @set-selected-complete="setSelectedComplete"
    />

</template>




