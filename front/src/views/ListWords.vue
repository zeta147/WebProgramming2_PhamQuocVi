<template>
    <h1>Words</h1>
    <form @submit.prevent="onSubmit">
        <div>
            <label for="language_drop_down_list" style="font-weight: bold;">Language: </label>
            <select id="language_drop_down_list" name="language" v-model="current_language">
                <option value="english" selected>English</option>
                <option value="german">German</option>
                <option value="vietnamese">Vietnamese</option>
            </select>
        </div>
        <br>
        <div class="search_bar_corner">
            <input placeholder="Type to search" id="search_bar" type="search" v-model="searching_word">
            <button id="search_button" @click="searchWord_V2(searching_word)">Search</button>
        </div>
    </form>
    <br>
    <div>
        <div v-if="filtered_words.length === 0">No words yet</div>
        <table v-if="filtered_words.length !== 0" id="ListWords" class="ui celled compact table">
            <thead>
                <tr>
                    <th><i class="united kingdom flag"></i>English</th>
                    <th><i class="germany flag"></i>German</th>
                    <th><i class="vietnam flag"></i>Vietnamese</th>
                    <th colspan="3"></th>
                </tr>
            </thead>
            <tr v-for="(word, i) in filtered_words" :key="i">
                <td>{{ word.english }}</td>
                <td>{{ word.german }}</td>
                <td v-if="word.vietnamese">{{ word.vietnamese }}</td>
                <td v-else style="color: red;">N/A</td>

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
            index: 0,
            filtered_words: [],
            searching_word: '',
            current_language: '',

        };
    },
    async mounted() {
        this.words = await api.getWords();

        if(this.words == null){
            this.filtered_words = [];
        }
        else{
            this.filtered_words = this.words;
        }

    },
    methods: {
        async onDestroy(id) {
            const sure = window.confirm('Are you sure?');
            if (!sure) return;
            await api.deleteWord(id);
            flashMessage.show({
                title: 'Delete:',
                text: 'delete successfully',
                type: 'success',
            });
            const newWords = this.words.filter(word => word._id !== id);
            this.filtered_words = newWords;
        },
        async searchWord_V2(parameter_searching_word) {
            let searching_word_local = parameter_searching_word.trim();
            if(searching_word_local.length < 2){
                flashMessage.show({
                    title: 'Error!',
                    text: 'Minimum 2 charaters to seach',
                    time: 2000,
                    type: 'error',
                    blockClass: 'custom-block-class',
                })
                return this.filtered_words = this.words;
            }

            this.filtered_words = this.words.filter((word) => {
                let current_language_word;
                switch (this.current_language) {
                    case "german":
                        current_language_word = word.german;
                        break;
                    case "vietnamese":
                        current_language_word = word.vietnamese;
                        break;
                    default:
                        current_language_word = word.english;
                        break;
                }
                return current_language_word.includes(searching_word_local) ? word : null;
            })
        },
    }
};
</script>

<style scoped>
input:focus {
    outline: none;
}

#search_bar {
    background-color: white;
    color: #000;
    font-family: 'Times New Roman', Times, serif;
    padding: 5px;
    outline: none;
}

#search_button {
    background-color: black;
    color: white;
    outline-color:black ;
    padding: 5px;
    border-color: white;
}

#search_button:hover{
    background-color: #4c4c4c;
    color: rgb(218, 218, 218);
}

#search_button:active{
    background-color: white;
    color: black
}

</style>
