<template>
    <div class="container">
        <p 
            @click="showPictures = !showPictures"
            :class="{active : !showPictures, picture__trigger : true}">Не показывать картинки</p>
        <div class="table">
            <SingleBook :book="topRow" @triggerModal="modalTriggered = true"></SingleBook>
            <SingleBook 
                v-for="book in books" 
                :key="book.id" 
                :book="book"
                :showPictures="showPictures"
                @deleteFromBase="deleteBook"
                
                ></SingleBook>
                <label for="pageSize" class="size-changer">
                    Количество записей на странице:
                    <input 
                        v-model="size" 
                        id="pageSize" 
                        type="number"
                        @input="validateSize"
                        @blur="getPage(currentPage)"
                        @keyup.enter="getPage(currentPage)">
                </label>
        </div>
        <ThePagination 
            :length="Number(tableLength)" 
            :currentPage="currentPage"
            :size="Number(size)"
            @changePage="getPage"></ThePagination>
        <InsertModal 
            :modalTriggered="modalTriggered"
            @modalClose="modalTriggered = false"
            @insert="insertBook"
            ></InsertModal>
    </div>
</template>

<script>
import axios from 'axios'
import SingleBook from '@/components/SingleBook'
import ThePagination from '@/components/ThePagination/ThePagination'
import InsertModal from '@/components/InsertModal'
export default {
    data() {
        return {
            topRow: {
                id: 'id',
                title: 'Название',
                author: 'Автор',
                date: 'Дата',
                rowTop: true
            },
            currentPage: 1,
            showPictures: true,
            size: 10,
            modalTriggered: false
        }
    },
    components: {
        SingleBook,
        ThePagination,
        InsertModal
    },
    created() {
        axios.post('/books/get/1', {size: this.size})
            .then(res => {
                this.$store.dispatch('setBooks', res.data)
            })
        axios.get('/books')
            .then(res => {
                this.$store.dispatch('setLength', res.data[0]['COUNT(id)'])
            })
    },
    methods: {
        getPage(item) {
            this.validateSize()
            if (this.currentPage <= 0) return this.currentPage = 1
            if (this.currentPage >= this.tableLength / this.size + 1) return this.currentPage = this.tableLength / this.size
            this.currentPage = item
            axios.post(`/books/get/${this.currentPage}`, { size: this.size })
            .then(res => {
                this.$store.dispatch('setBooks', res.data)
            })
        },
        validateSize() {
            if (this.size < 0) this.size = 0
            if (this.size > this.tableLength) this.size = this.tableLength
        },
        deleteBook(id) {
            axios.delete(`/books/${id}`)
                .then(() => {
                    this.getPage(this.currentPage)
                })
        },
        insertBook (data) {
            axios.post('/books', data )
                .then(res => {
                    this.getPage(this.currentPage)
                })
        }
    },
    computed: {
        books() {
            return this.$store.getters.books
        },
        tableLength() {
            return this.$store.getters.tableLength
        }
    }
}
</script>

<style scoped> 
    .container {
        width: 1350px;
        margin: 0 auto;
    }
    .table {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        border-radius: 5px;
        border: 1px solid #2e962e;
        position: relative;
    }
    .picture__trigger {
        color: #000;
        opacity: .7;
        cursor: pointer;
        transition: all .2s ease-in-out;
    }
    .picture__trigger.active {
        color:coral;
    }
    .size-changer {
        position: absolute;
        right: 10px;
        bottom: -50px;
    }
    .size-changer input {
        width: 30px;
        height: 30px;
        text-align: center;
    }
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
    }
</style>

