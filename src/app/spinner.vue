

<script>

    export default{

        props:{

            spinner: Boolean
        }
    }

</script>

<template>
    <div class="spinner" v-if="spinner">
        <span><i class="fa-solid fa-spinner"></i></span>
    </div>
</template>

