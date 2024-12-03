<template>
    <div v-if="hasWord">
        <h1>Edit Word</h1>
        <word-form @createOrUpdate="createOrUpdate" :word="this.word"></word-form>
    </div>
</template>

<script>
import { flashMessage } from '@smartweb/vue-flash-message';
import WordForm from '../components/WordForm.vue';
import { api } from '../helpers/helpers';

export default {
    name: 'EditWord',
    components: {
        'word-form': WordForm
    },
    data: function () {
        return {
            word: {},
            hasWord: false
        };
    },
    async mounted() {
        console.log("test");
        this.word = await api.getWord(this.$route.params.id);
        this.hasWord = true;
        console.log(this.word);
    },
    methods: {
        createOrUpdate: async function (word) {
            await api.updateWord(word);
            flashMessage.show({
                title: 'Successful!',
                text: 'Update successfully',
                type: 'success',
            })
            this.$router.push(`/words/${word._id}`);
        },
    }
};


</script>