import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'semantic-ui-css/semantic.css';
import VueFlashMessage from'@smartweb/vue-flash-message';
import '@smartweb/vue-flash-message';


const app = createApp(App);
app.use(router);
app.use(VueFlashMessage, {
    messageOptions: {
        timeout: 2000,
        pasuseOnInteract: true,
    }
});
app.mount('#app');



