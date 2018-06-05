<template>
    <div 
        :class="{row : true, row_top : book.rowTop}" 
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
        @mousemove="findPosition">
        <div class="cell" v-text="book.id"></div>
        <div class="cell" v-text="book.title"></div>
        <div class="cell" v-text="book.date"></div>
        <div class="cell" v-text="book.author"></div>
        <img 
            :src="book.image" 
            alt="" 
            :class="{image : true, active : hovered && showPictures}"
            :style="style">
            <div class="delete" @click="$emit('deleteFromBase', book.id)" v-if="!book.rowTop">X</div>
            <div class="add" @click="$emit('triggerModal')" v-else>+</div>
    </div>
</template>

<script>
export default {
    props: ['book', 'showPictures'],
    data() {
        return {
            hovered: false,
            style: '',
        }
    },
    methods: {
        findPosition(e) {
            this.style = `top: ${e.clientY - 150}px; left: ${e.clientX - 350}px`
        }
    }

}
</script>

<style scoped>
    .row {
        display: flex;
        justify-content: space-around;
        flex: 1 1 100%;
        padding: 10px;
        border-bottom: 1px solid #eee;
        position: relative;
    }
    .row * {
        display: flex;
        width: 20%;
        flex-wrap: wrap;
        text-overflow: ellipsis;
        justify-content: center;
        align-items: center;
    }
    .row_top {
        background-color: #eee;
        font-weight: bold;
    }
    .image {
        display: none;
        z-index: 2;
    }
    .active {
        display: block;
        position: fixed;
    }
    .delete {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: auto;
        cursor: pointer;
    }
    .add {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        width: auto;
        cursor: pointer;
        background-color: #20991c;
        color: #fff;
        font-size: 20px;
        width: 30px;
        height: 30px;
    }
    .add:hover {
        background-color: hsl(118, 78%, 42%);
    }
</style>

