<template>
    <div class="pagination">
        <div class="pagination_left">
            <a 
                href=""
                @click.prevent="$emit('changePage', currentPage - 1)"
                >Предидущая</a>
        </div>
        <div class="pages">
            <div 
            :class="{box : true, active : currentPage === item, hidden : item - currentPage > 2 || item - currentPage < -2}" 
            v-for="item in paginationBoxes" 
            :key="item" 
            v-text="item"
            @click="$emit('changePage', item)"
            >
            </div>
        </div>
        <div class="pagination_right">
            <a 
                href=""
                @click.prevent="$emit('changePage', currentPage + 1)"
                >Следующая</a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        length: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            default: 1
        },
        size: {
            type: Number,
            default: 10
        }
    },
    computed: {
        paginationBoxes () {
            return Math.ceil(this.length / this.size)
        }
    }
}
</script>

<style scoped>
    .pagination {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin: 60px auto;
        user-select: none;
    }
    .pages {
        display: flex;
    }

    .pagination_left, .pagination_right {
        width: 20%;
        
    }

    .pagination a {
        display: block;
        text-decoration: none;
        color: #000;
        padding: 0 20px;
        line-height: 44px;
        border: 1px solid #2e962e;
        border-radius: 2px;
    }
    .pagination a:hover, .pagination a:active, .box:hover, .active {
        background-color: #2e962e;
        color: #fff;
        transition: all .1s;
        cursor: pointer;
    }

    .box {
        display: flex;
        padding: 10px;
        border: 1px solid #2e962e;
        width: 25px;
        justify-content: center;
    }
    .hidden {
        display: none;
    }

</style>
