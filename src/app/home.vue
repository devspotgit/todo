

<script>



</script>


<template>
    <div class="home">
        <div class="header">
            <a href="/">TODO</a>
            <button><i class="fa-solid fa-ellipsis-vertical"></i></button>
            <div class="header-menu">
                <button @click="activeForm='login'" v-if="!user">Login</button>
                <button v-if="user">Logout</button>
                <button @click="activeForm='add_item'" v-if="user">Add Item</button>
            </div>
        </div>
        <div class="categories">
            <button>All</button>
            <button>Completed</button>
            <button>Active</button>
        </div>
        <div class="control">
            <button>Delete</button>
            <button>Set as complete</button>
            <button>Set as Active</button>
            <button>Rename</button>
        </div>
        <div class="list">
        
        </div>
        <div class="empty-list">

        </div>
    </div>
</template>