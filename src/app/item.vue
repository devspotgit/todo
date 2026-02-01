

<script>

    export default{

        emits: [ "setActiveForm", "setItem", "setCurrentItem" ],

        props:{

            item: Object
        },

        methods:{

            renameItem(){

                this.$emit("setCurrentItem", this.item)

                this.$emit("setActiveForm", "rename_item")
            }
        }
    }

</script>


<template>
    <div class="item">
        <button :class="item.selected ? 'selected':''" @click="$emit('setItem', item)"></button>
        <span>{{ item.name }}</span>
        <span :class="item.status == 'complete' ? 'item-complete' : 'item-active'">{{ item.status }}</span>
        <button>
            <i class="fa-solid fa-ellipsis-vertical"></i>
            <div class="item-menu">
                <button @click="renameItem">Rename</button>
            </div>
        </button>
        <span>{{ item.name }}</span>
    </div>    
</template>

