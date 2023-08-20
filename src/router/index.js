import { createRouter, createWebHistory } from 'vue-router';
import PageList from '../components/PageList.vue';
import PageCreate from '../components/PageCreate.vue';
import PageEdit from '../components/PageEdit.vue';
import PageContent from '../components/PageContent.vue';

const routes = [
  { path: '/', component: PageList },
  { path: '/add', component: PageCreate },
  { path: '/:id/edit', component: PageEdit, props: true, },
  { path: '/:link(.*)', component: PageContent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;