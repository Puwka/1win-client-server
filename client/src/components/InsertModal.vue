<template>
    <div class="modal-overflow" @submit.prevent="emitInsert" v-if="modalTriggered" @click.self="$emit('modalClose')">
        <div class="modal">
            <form class="insert">
                <input type="text" placeholder="author" v-model="author">
                <input type="text" placeholder="title" v-model="title">
                <input type="text" placeholder="date" v-model="date">
                <input type="text" placeholder="image" v-model="image">
                <textarea name="" id="" cols="30" rows="10" placeholder="description" v-model="description"></textarea>
                <button type="submit" class="insert__submit">Добавить</button>
                <button class="insert__clear">Очистить</button>
            </form> 
        </div>
    </div>
</template>

<script>
export default {
    props: {
        modalTriggered: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            author: '',
            image: '',
            date: '',
            title: '',
            description: ''
        }
    },
    methods: {
        emitInsert() {
            let data = {
                author: this.author,
                image: this.image,
                date: this.date,
                title: this.title,
                description: this.description
            }
            this.$emit('insert', data)
        }
    }
}
</script>

<style scoped>
.modal-overflow {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: rgba(0,0,0,0.7);
}
.modal {
    box-sizing: border-box;
    display: flex;
    background-color: #fff;
    justify-content: center;
    padding: 20px;
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
}
.insert {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.insert input {
    display: flex;
    width: 100%;
    padding: 5px 10px;
    margin: 20px;
}
.insert textarea {
    width: 100%;
    padding: 5px 10px;
    margin: 20px;
    resize: none
}
.insert button {
    display: flex;
    padding: 10px;
    margin: 10px;
    outline: none;
    border: none;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
}
.insert__submit {
    background-color: #2e962e;
    
}
.insert__clear {
    background-color: #bd2c2c;
}

</style>
