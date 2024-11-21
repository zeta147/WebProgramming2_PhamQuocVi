import {createRouter, createWebHistory} from 'vue-router'
import ListWords from './views/ListWords.vue';
import NewWord from './views/NewWord.vue';
import ShowWord from './views/ShowWord.vue';
import EditWord from './views/EditWord.vue';
import TestWord from './views/TestWord.vue';

const routes = [
    {   
        path: '/',
        redirect: '/words'
    },
    {
        path: '/words',
        name: 'words',
        component: ListWords
    },
    {
        path: '/words/new',
        name: 'new-word',
        component: NewWord
    },
    {
        path: '/words/:id',
        name: 'show',
        component: ShowWord
    },
    {
        path: '/words/:id/edit',
        name: 'edit',
        component: EditWord
    },
    {
        path: '/test',
        name: 'test',
        component: TestWord
    },
    // {
    //     path: '/about',
    //     name: 'about',
    //     component: AboutWord
    // }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;




