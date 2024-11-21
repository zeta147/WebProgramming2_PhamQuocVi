<template>
    <form @submit.prevent="onSubmit">
        <div>
            <label for="language_drop_down_list" style="font-weight: bold;">Language: </label>
            <select id="language_drop_down_list" name="language" v-model="current_language">
                <option value="english">English</option>
                <option value="german">German</option>
                <option value="vietnamese">Vietnamese</option>
            </select>
        </div>
        <br>
        <div class="search_bar_corner">
            <input placeholder="Type to search" 
                    id="search_bar" 
                    type="search" 
                    v-model="searching_word">
            <button id="search_button" @click="searchWord(searching_word)">Search</button>
        </div>
    </form>
    <br>
    <!-- <div v-if="words.length > 0 ">{{ words }}</div> -->
    <div>
        <h1>Words</h1>
        <div v-if="words.length === 0"></div>
        <table v-if="words.length !== 0" id="ListWords" class="ui celled compact table">
            <thead>
                <tr>
                    <th>English</th>
                    <th>German</th>
                    <th>Vietnamese</th>
                    <th colspan="3"></th>
                </tr>
            </thead>
            <tr v-if="filtered_words.length == 0" v-for="(word, i) in words" :key="i">
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


            <tr v-if="filtered_words.length > 0" v-for="(word, i) in filtered_words" :key="i">
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
    <!-- <div>
        {{ filtered_words }}
    </div> -->
</template>


<script>
import { flashMessage } from '@smartweb/vue-flash-message';
import { api } from '../helpers/helpers';

export default {
    name: 'ListWords',
    data() {
        return {
            words: [],
            index: 0,
            filtered_words: [],
            searching_word: '',
            current_language: '',
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
        },
        async searchWord(parameter_searching_word){
            this.filtered_words = [];
            this.index = 0;
            for(var row = 0; row < this.words.length; row++){
                var word = this.words[row];
                var current_language_word;

                switch (this.current_language){
                    case "english":
                        current_language_word = word.english;
                        break;
                    case "german":
                        current_language_word = word.german;
                        break;
                    case "vietnamese":
                        current_language_word = word.vietnamese;
                        break;
                    default:
                        current_language_word = word.english;
                        break
                }

                if(current_language_word.includes(parameter_searching_word)){
                    this.filtered_words[this.index++] = word;
                }
            }
        }
    }
};
</script>

<style scoped>

input:focus{
    outline: none;
}
#search_bar {
    background-color: white;
    color: #000;
    font-family: 'Times New Roman', Times, serif;
    padding: 5px;
    outline: none;
}

/* .corner {
    background-color: white;
    border-radius: 25px;
    border: 2px solid #000;
} */

#search_button{
    background-color: black;
    color: white;
    outline: none;
    padding: 5px;
    border-color: white;

}
</style>
