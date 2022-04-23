import Vue from 'vue';
import Router from 'vue-router';
import sendMessage from '@/components/SendMessage.vue';
import messagesList from '@/components/MessagesList.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: sendMessage,
      name: 'sendMessage',
    },
    {
      path: '/messagesList',
      component: messagesList,
      name: 'messageList',
    },
  ],
});
