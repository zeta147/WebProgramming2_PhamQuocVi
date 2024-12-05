<template>
    <div class="checkbox_container">
        <p>Additional language: </p>
        <input type="checkbox" id="checkbox_vietnamese" name="language" value="vietnamese" v-model="checkedVietnamese">
        <label for="checkbox_vietnamese">Vietnamese</label><br>
    </div>
    <div>
        <form action="#" @submit.prevent="onSubmit">
            <p v-if="errorsPresent" class="error">Please fill out both fields</p>
            <div class="ui labeled input fluid">
                <div class="ui label">
                    <i class="germany flag"></i>German
                </div>
                <input type="text" placeholder="Enter word..." v-model="this.wordLocal.german" />
            </div>
            <div class="ui labeled input fuild">
                <div class="ui label">
                    <i class="united kingdom flag"></i>English
                </div>
                <input type="text" placeholder="Enter word..." v-model="this.wordLocal.english" />
            </div>
            <div class="ui labeled input fuild" v-if="this.checkedVietnamese">
                <div class="ui label">
                    <i class="vietnam flag"></i>Vietnamese
                </div>
                <input type="text" placeholder="Enter word..." v-model="this.wordLocal.vietnamese" />
            </div>

            <button class="positive ui button">Submit</button>
        </form>
    </div>
</template>

<script>
import { flashMessage } from '@smartweb/vue-flash-message';
export default {
    name: 'word-form',
    props: {
        word: {
            type: Object,
            required: false,
            default: () => {
                return {
                    english: '',
                    german: '',
                    vietnamese: '',
                }
            }
        }
    },
    data() {
        return {
            errorsPresent: true,
            wordLocal: this.word,
            checkedVietnamese: false,
        };
    },
    methods: {
        onSubmit: function () {
            if ((this.word.english === '' || this.word.german === '') && !this.checkedVietnamese) {
                this.errorsPresent = true;
                flashMessage.show({
                    title: 'Warning!',
                    text: 'Please type on missing fields',
                    type: 'warning',
                })
                console.log(this.word.vietnamese.length)
            }
            else if (this.word.english === '' || this.word.german === '' || this.word.vietnamese === ''){
                this.errorsPresent = true;
                flashMessage.show({
                    title: 'Warning!',
                    text: 'Please type on missing fields',
                    type: 'warning',
                })
            }
            else {
                this.$emit('createOrUpdate', this.wordLocal)
            }
        }
    }
};
</script>

<style scoped>

.checkbox_container {
    font-size: large;
}

.checkbox_container > label{
    position: relative;
    left: -40%
}

.checkbox_container > input{
    position: relative;
    left: -20%
}

.checkbox_container > p{
    position: relative;
    left: 0%;
    font-weight: bold;
}



</style>