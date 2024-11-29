<template>
  <div>
    <h1>Test</h1>
    <div class="checkbox_container" v-if="!startTesting">
      <p>Additional language to test: </p>
      <input type="checkbox" id="checkbox_vietnamese" name="language" value="vietnamese" v-model="checkVietnamese">
      <label for="checkbox_vietnamese">Vietnamese</label><br>
      <button class="start_test_button" @click="StartTheTest()">Start the test</button>
    </div><br>
    <button class="reset_test_button" @click="ResetTheTest()">Reset the test</button><br>
    
    <!-- <div v-if="filtered_words.length < 5">
      <p style="color: red; font-weight: bold; ">You need to enter at least five words to begin the test</p>
    </div> -->

    <div v-if="filtered_words.length >= 5 && startTesting">
      <vocab-test :checkVietnamseLocal="checkVietnamese" :testWords="filtered_words"></vocab-test>
    </div>
    
  </div>
</template>

<script>
import { api } from '../helpers/helpers';
import VocabTest from '../components/VocabTest.vue';
import { flashMessage } from '@smartweb/vue-flash-message';

export default {
  name: 'TestWord',
  components: {
    'vocab-test': VocabTest
  },
  data() {
    return {
      words: [],
      checkVietnamese: false,
      startTesting: false,
      filtered_words: [],
    };
  },
  async mounted() {
    this.words = await api.getWords();
    this.filtered_words = this.words;
  },
  methods: {
    async StartTheTest() {
      this.CheckVietnameseWord();
      if (this.filtered_words.length >= 5)
        this.startTesting = true;
      else{
        flashMessage.show({
          title:"Warning!",
          text: "You need to enter at least five words to begin the test",
          type: "warning",
          time: 5000,
        })
      }
    },

    async ResetTheTest() {
      this.startTesting = false;
    },

    async CheckVietnameseWord() {
      // console.log(this.checkVietnamese)
      if (this.checkVietnamese) {
        this.filtered_words = this.words.filter((word) => {
          return word.vietnamese == '' ? word : null;
        })
      }
      else {
        this.filtered_words = this.words;
      }
    },
  }
};
</script>

<style scoped>
.checkbox_container {
  font-size: large;
}

.checkbox_container>label {
  position: relative;
  left: -40%
}

.checkbox_container>p {
  position: relative;
  left: 0%;
  font-weight: bold;
}

input#checkbox_vietnamese {
  position: relative;
  left: -20%
}

.start_test_button {
  background-color: rgb(10, 186, 10);
  color: white;
  outline: none;
  border-radius: 10px;
  border: solid, 1px;
  margin: 5px;
  font-size: medium;
}

.start_test_button:hover {
  background-color: rgb(58, 199, 100);
  color: black;
  border-color: black;
  border: solid, 1px;
}

.start_test_button:active {
  background-color: rgb(255, 255, 255);
  color: black;
  border-color: black;
  border: solid, 1px;
  ;
}

.reset_test_button {
  background-color: rgb(10, 92, 186);
  color: white;
  outline: none;
  border-radius: 10px;
  border: solid, 1px;
  margin: 5px;
  font-size: medium;
}

.reset_test_button:hover {
  background-color: rgb(62, 145, 197);
  color: black;
  border-color: black;
  border: solid, 1px;
}

.reset_test_button:active {
  background-color: rgb(255, 255, 255);
  color: black;
  border-color: black;
  border: solid, 1px;
  ;
}
</style>