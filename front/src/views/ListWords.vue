<template>
    <div>
        <h1>Words</h1>
        <table id="ListWords" class="ui celled compact table">
            <thead>
                <tr>
                    <th>English</th>
                    <th>German</th>
                    <th colspan="3"></th>
                </tr>
            </thead>
            <tr v-for="(word, i) in words" :key="i">
                <td>{{ word.english }}</td>
                <td>{{ word.german }}</td>

                <td width="75" class="center aligned">
                    <router-link :to="{name: 'show', params:{id: word._id}}">Show</router-link>
                </td>

                <td width="75" class="center aligned">
                    <router-link :to="{name: 'edit', params:{id: word._id}}">Edit</router-link></td>

                <td width="75" class="center aligned" @click.prevent="onDestroy(word._id)">
                    <a :href="`/words/${word._id}`">Destroy</a></td>
            </tr>
        </table>
    </div>
</template>


<script>
import { flashMessage } from '@smartweb/vue-flash-message';
import { api } from '../helpers/helpers';

export default {
    name: 'ListWords',
    data(){
        return {
            words: []
        };
    },
    async mounted(){
        this.words = await api.getWords();
    },
    methods:{
        async onDestroy(id){
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

