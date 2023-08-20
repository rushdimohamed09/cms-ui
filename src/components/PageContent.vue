<template>
  <div>
    <div class="header">
      <h1>Page Content</h1>
      <a href="/" class="home-button">Home</a>
    </div>
    <br>
    <div v-if="page.content">
      <h2>{{ page.content['title'] }}</h2>
      <p>{{ page.content['content'] }}</p>
      
    </div>
    <div v-else>
      <h2>{{ page }}</h2>
      <p>Page not found</p>
    </div>
  </div>
</template>

<style scoped> @import '@/assets/custom.css'; </style>

<script>
import axios from 'axios';
import {getPageContent} from '../constants/endpoints';

export default {
  data() {
    return {
      page: {},
    };
  },
  created() {
    console.log('PageContent component created');
    this.fetchPage();
  },
  methods: {
    fetchPage() {
      const link = this.$route.params.link;
      axios.get(`${getPageContent}?link=${link}`)
        .then((response) => {
          this.page = response.data;
        })
        .catch((error) => {
          this.page = `Error fetching page ${link}:`;
          console.error(`Error fetching page ${link}:`, error);
        });
    },
  },
};
</script>
