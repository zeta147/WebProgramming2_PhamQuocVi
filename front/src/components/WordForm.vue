<template>
    <form action="#" @submit.prevent="onSubmit">
        <p v-if="errorsPresent" class="error">Please fill out both fields</p>
        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="germany flag"></i>German
            </div>
            <input type="text" placeholder="Enter word..." v-model="this.wordLocal.german"/>
        </div>
        <div class="ui labeled input fuild">
            <div class="ui label">
                <i class="united kingdom flag"></i>English
            </div>
            <input type="text" placeholder="Enter word..." v-model="this.wordLocal.english"/>
        </div>

        <button class="positive ui button">Submit</button>
    </form>
</template>

<script>
export default {
    name: 'word-form',
    props: {
        word: {
            type: Object,
            required: false,
            default:() => {
                return {
                    english: '',
                    german: '',
                }
            }
        }
    },
    data(){
        return{
            errorsPresent: true,
            wordLocal: this.word
        };
    },
    methods:{
        onSubmit: function(){
            // console.log(`English: ${this.wordLocal.english}`);
            // console.log(`German: ${this.wordLocal.german}`);
            if(this.word.english === '' || this.word.german === ''){
                this.errorsPresent = true;
            }
            else{
                this.$emit('createOrUpdate', this.wordLocal)
            }
        }
    }
};
</script>