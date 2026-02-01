

<script>

    import Item from "./item.vue"

    export default{

        emits:[ "setCurrentItem", "setActiveForm", "setSpinner", "setMessage", "setUser", "deleteSelected", "setActiveCategory", "setSelectedActive", "setSelectedComplete", "setItem", "setItemList" ],

        props:{

            user: String,

            activeCategory: String,

            itemList: Array
        },

        components:{

            Item
        },

        methods:{

            async logout(){

                this.$emit("setSpinner", true)

                const { error, data } = await fetch("/api/logout", {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({})

                }).then(res => res.json())

                this.$emit("setSpinner", false)

                if(error){

                    this.$emit("setMessage", error.message)
                }
                else{

                    this.$emit("setUser", null)

                    this.$emit("setItemList", [])

                    this.$emit("setMessage", "user logout")
                }
            },

            async deleteSelected(){

                this.$emit("setSpinner", true)
                
                const selectedItems = this.itemList.filter(item => item.selected == true)

                const { error, data } = await fetch("/api/delete-item", {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(

                        {
                            items: selectedItems
                        }    
                    )

                }).then(res => res.json())

                this.$emit("setSpinner", false)

                if(error){

                    this.$emit("setMessage", error.message)
                }
                else{

                    this.$emit("deleteSelected", selectedItems)

                    this.$emit("setMessage", "item deleted")
                }
            },

            async setSelectedActive(){

                this.$emit("setSpinner", true)

                const selectedItems = this.itemList.filter(item => item.selected == true)

                const { error, data } = await fetch("/api/set-active", {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(

                        {
                            items: selectedItems
                        }    
                    )

                }).then(res => res.json())

                this.$emit("setSpinner", false)

                if(error){

                    this.$emit("setMessage", error.message)
                }
                else{

                    this.$emit("setSelectedActive", selectedItems)

                    this.$emit("setMessage", "item set active")
                }
            },

            async setSelectedComplete(){

                this.$emit("setSpinner", true)

                const selectedItems = this.itemList.filter(item => item.selected == true)

                const { error, data } = await fetch("/api/set-complete", {

                    method: "POST",

                    headers:{

                        "Content-Type": "application/json" 
                    },

                    body: JSON.stringify(

                        {
                            items: selectedItems
                        }    
                    )

                }).then(res => res.json())

                this.$emit("setSpinner", false)

                if(error){

                    this.$emit("setMessage", error.message)
                }
                else{

                    this.$emit("setSelectedComplete", selectedItems)

                    this.$emit("setMessage", "item set complete")
                }
            } 
        }
    }

</script>


<template>
    <div class="home">
        <div class="header">
            <a href="/">TODO</a>
            <button>
                <i class="fa-solid fa-ellipsis-vertical"></i>
                <div class="header-menu">
                    <button @click="$emit('setActiveForm', 'login')" v-if="!user">Login</button>
                    <button v-if="user" @click="logout">Logout</button>
                    <button @click="$emit('setActiveForm', 'add_item')" v-if="user">Add Item</button>
                </div>
            </button>
        </div>
        <div class="categories">
            <button :class="activeCategory == 'all' ? 'active-category': ''" @click="$emit('setActiveCategory', 'all')">All</button>
            <button :class="activeCategory == 'complete' ? 'active-category': ''" @click="$emit('setActiveCategory', 'complete')">Completed</button>
            <button :class="activeCategory == 'active' ? 'active-category': ''" @click="$emit('setActiveCategory', 'active')">Active</button>
        </div>
        <div class="control" v-if="itemList.filter(item => item.selected == true).length != 0">
            <button @click="deleteSelected">Delete</button>
            <button @click="setSelectedComplete">Set complete</button>
            <button @click="setSelectedActive">Set active</button>
        </div>
        <div class="list" v-if="itemList.length != 0">
            <Item 
                v-for="item in itemList" 
                :key="item._id"
                :item="item" 
                @set-item="(item) => $emit('setItem', item)"  
                @set-active-form="(form) => $emit('setActiveForm', form)" 
                @set-current-item="(item) => $emit('setCurrentItem', item)"
            />
        </div>
        <div class="empty-list" v-if="itemList.length == 0">
            <span>No items found</span>
        </div>
    </div>
</template>

