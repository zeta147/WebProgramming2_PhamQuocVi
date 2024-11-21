<template>
    <div>
        <div class="search_bar_corner">
            <input placeholder="Type to search" id="search_bar" type="text" v-model="searching_word">
            <button @click="">Search</button>
        </div>
    </div>
    <br>
    <div>
        <h1>Words</h1>
        <div v-if="words.length === 0">No words yet</div>
        <table v-if="words.length !== 0" id="ListWords" class="ui celled compact table">
            <thead>
                <tr>
                    <th>English</th>
                    <th>German</th>
                    <th>Vietnamese</th>
                    <th colspan="3"></th>
                </tr>
            </thead>
            <tr v-for="(word, i) in words" :key="i">
                <td>{{ word.english }}</td>
                <td>{{ word.german }}</td>
                <td>{{ word.vietnamese }}</td>

                <td width="75" class="center aligned">
                    <router-link :to="{ name: 'show', params: { id: word._id } }">Show</router-link>
                </td>

                <td width="75" class="center aligned">
                    <router-link :to="{ name: 'edit', params: { id: word._id } }">Edit</router-link>
                </td>

                <td width="75" class="center aligned" @click.prevent="onDestroy(word._id)">
                    <a :href="`/words/${word._id}`">Destroy</a>
                </td>
            </tr>
        </table>
    </div>
</template>


<script>
import { flashMessage } from '@smartweb/vue-flash-message';
import { api } from '../helpers/helpers';

export default {
    name: 'ListWords',
    data() {
        return {
            words: [],
            searching_word: '',
        };
    },
    async mounted() {
        this.words = await api.getWords();
    },
    methods: {
        async onDestroy(id) {
            const sure = window.confirm('Are you sure?');
            if (!sure) return;
            await api.deleteWord(id);
            // this.flash('Word deleted successfully!', 'success');
            flashMessage.show({
                text: 'delete successfully',
                type: 'error',
            })
            const newWords = this.words.filter(word => word._id !== id);
            this.words = newWords;
        }
    }
};
</script>

<style scoped>
#searching_bar {
    background-color: white;
    font-family: 'Times New Roman', Times, serif;
    outline: none;
    padding: 20px;
}

.corner {
    background-color: white;
    border-radius: 25px;
    border: 2px solid #000;
}
</style>
