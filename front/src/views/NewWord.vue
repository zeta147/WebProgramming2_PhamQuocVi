<template>
    <div>
        <h1>New Word</h1>
        <word-form @createOrUpdate="createOrUpdate"></word-form>
    </div>
</template>
<script>
import { flashMessage } from '@smartweb/vue-flash-message';
import WordForm from '@/components/WordForm.vue';
import { api } from '@/helpers/helpers';

export default {
    name: 'new-word',
    components:{
        'word-form': WordForm
    },
    methods:{
        createOrUpdate: async function(word){
            const res = await api.createWord(word);
            // this.flash('Word created', 'success');
            flashMessage.show({
            text: 'Create successfully',
            type: 'success',
            })
            this.$router.push(`/words/${res._id}`);
        }
    }
}
</script>