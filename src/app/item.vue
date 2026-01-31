

<script>

    export default{

        emits: [ "setActiveForm", "setItem", "setCurrentItem" ],

        props:{

            item: Object
        },

        data(){

            return{

                itemMenuHidden: false
            }
        },

        methods:{

            renameItem(){

                this.$emit("setCurrentItem", item)

                this.$emit('setActiveForm', 'rename_item')
            }
        }
    }

</script>


<template>
    <div class="item">
        <button @click="$emit('setItem', item)"></button>
        <span>{{ item.name }}</span>
        <span :class="item.status == 'complete' ? 'item-complete' : 'item-active'">{{ item.status }}</span>
        <button @click="itemMenuHidden = !itemMenuHidden"><i class="fa-solid fa-ellipsis-vertical"></i></button>
        <div v-if="itemMenuHidden" class="item-menu">
            <button @click="renameItem">Rename</button>
        </div>
    </div>    
</template>

