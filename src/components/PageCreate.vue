<template>
  <div class="header">
    <h1>Create Page</h1>
    <a href="/" class="home-button">Home</a>
  </div>
  <br>
  <div class="page-form">
    <form @submit.prevent="submitForm" class="form-container">
      <div class="form-group">
        <label for="parent_id">Parent ID:</label>
        <input type="number" id="parent_id" v-model="newPageData.parent_id">
      </div>

      <div class="form-group">
        <label for="slug">Slug:</label>
        <input type="text" id="slug" v-model="newPageData.slug" required>
      </div>

      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="newPageData.title" required>
      </div>

      <div class="form-group">
        <label for="content">Content:</label>
        <textarea id="content" v-model="newPageData.content" required></textarea>
      </div>

      <p v-if="message" :class="messageTypeClass">{{ message }}</p>

      <button type="submit" class="submit-button" style="margin-right: 10px;">Create Page</button>
      
      <button type="button" @click="clearForm" class="clear-button">Clear</button>
    </form>
  </div>
</template>

<style scoped> @import '@/assets/custom.css'; </style>

<script>
import axios from 'axios';
import { getToken, getPages } from '../constants/endpoints';

export default {
  data() {
    return {
      page: {
        content: {
          title: 'Add Page | CMS'
        }
      },
      newPageData: {
        parent_id: null,
        slug: '',
        title: '',
        content: '',
      },
      message: '',
      messageType: '',
    };
  },
  mounted() {
    document.title = this.page.content.title;
  },
  computed: {
    // Compute the message type class based on messageType
    messageTypeClass() {
      return this.messageType === 'success' ? 'success-message' : 'error-message';
    },
  },
  methods: {
    async submitForm() {
      try {
        const tokenResponse = await axios.get(getToken);
        
        if (tokenResponse.status === 200) {
          const csrfToken = tokenResponse.data;

          axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
          const response = await axios.post(getPages, this.newPageData);

          this.message = response.data.message;
          this.messageType = 'success';

          this.clearForm();
        } else {
          console.error('Failed to retrieve CSRF token');
          this.message = 'Failed to retrieve CSRF token. Please try again later';
          this.messageType = 'error';
        }
      } catch (error) {
        console.error('Error creating page:', error);
        this.message = 'Error creating page. Please try again later.';
        this.messageType = 'error';
      }
    },
    clearForm() {
      this.newPageData = {
        parent_id: null,
        slug: '',
        title: '',
        content: '',
      };
    },
  },
};
</script>