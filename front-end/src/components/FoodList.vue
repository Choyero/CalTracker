<template>
    <div class="wrapper">
        <div class="item-display" v-for="item in items" :key="item._id">
            <h1>{{item.description}}</h1>
        </div>
    </div>
</template>


<script>
export default {
    name: 'FoodList',
    props: {
        items: Array,
    },
}
</script>