<template>
  <div id="app" style="align='center'">
    <img alt="Vue logo" src="./assets/logo.png" />
    <b-card no-body>
      <b-row>
        <b-col>
          <navbar></navbar>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <router-view />
        </b-col>
      </b-row>
    </b-card>
    <div></div>
  </div>
</template>

<script>
import navbar from '@/components/MessagingNavbar.vue';
export default {
  name: 'App',
  components: {
    navbar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@import './scss/style.scss';
</style>
