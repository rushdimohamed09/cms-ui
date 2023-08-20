<template>
  <div class="header">
    <h1>Update Page</h1>
    <a href="/" class="home-button">Home</a>
  </div>
  <br>
  <div class="page-form" v-if="!invalidPageId">
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

      <button type="submit" class="submit-button" style="margin-right: 10px;">Update Page</button>
    </form>
  </div>
  <div v-else>
    <p class="error-message">Invalid Page ID Encountered</p>
  </div>
</template>

<style scoped> @import '@/assets/custom.css'; </style>

<script>
import axios from 'axios';
import { getPages, getToken } from '../constants/endpoints';

export default {
  data() {
    return {
      page: {
        content: {
          title: 'Edit Page | CMS'
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
      invalidPageId: false,
    };
  },
  computed: {
    // Compute the message type class based on messageType
    messageTypeClass() {
      return this.messageType === 'success' ? 'success-message' : 'error-message';
    },
  },
  created() {
    document.title = this.page.content.title;
    // Extract the page ID from the URL
    const url = new URL(window.location.href);
    const pathnameParts = url.pathname.split('/');
    this.pageId = pathnameParts[pathnameParts.length - 2]; 

    // Make an Axios call to fetch data for the page with this ID
    this.fetchPageData();
  },
  methods: {
     fetchPageData() {
      axios.get(`${getPages}/${this.pageId}`)
        .then((response) => {
          console.log('Fetched Page Data:', response.data);

          const { parent_id, slug, title, content } = response.data;
          this.newPageData = {
            parent_id,
            slug,
            title,
            content,
          };
        })
        .catch((error) => {
          console.error('Error fetching page data:', error);
          this.invalidPageId = true;
        });
    },
    async submitForm() {
      try {
        const tokenResponse = await axios.get(getToken);
        
        if (tokenResponse.status === 200) {
          const csrfToken = tokenResponse.data;

          axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
          const response = await axios.put(`${getPages}/${this.pageId}`, this.newPageData);

          this.message = response.data.message;
          this.messageType = 'success';
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
  },
};
</script>