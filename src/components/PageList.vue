<template>
  <div>
    <div class="header">
      <h1>Page List</h1>
      <a href="/add" class="add-button">[ + ] Add New Page</a>
    </div>
    <br>
    <table ref="pageTable" class="display responsive" style="width: 100%;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; max-width: 30px; text-align: right;">ID</th>
          <th style="border: 1px solid #ddd; text-align: left;">Title</th>
          <th style="border: 1px solid #ddd; max-width: 120px; text-align: center;">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in tableData" :key="row.id">
          <td style="border: 1px solid #ddd; max-width: 30px; text-align: right;">{{ row.id }}</td>
          <td style="border: 1px solid #ddd; text-align: left;">
            <a :href="'/' + row.link" target="_blank" style="text-decoration:none">{{ row.title }}</a>
          </td>
          <td style="border: 1px solid #ddd; text-align: center;">
            <a :href="`${row.id}/edit`" class="edit-button">Edit</a>
            <button class="delete-button" @click="deleteRow(row.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>{{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage * entriesPerPage >= totalCount">Next</button>
    </div>
  </div>
</template>

<style scoped> @import '@/assets/custom.css'; </style>

<script>
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net';
import { getPages } from '../constants/endpoints';

export default {
  data() {
    return {
      currentPage: 1,
      entriesPerPage: 10,
      totalCount: 0,
      dataTable: null,
      tableData: [],
    };
  },
  created() {
    // Fetch table data from the API and initialize DataTable after the component is mounted
    this.fetchTableData();
  },
  methods: {
    fetchTableData() {
      axios
        .get(getPages, {
          params: {
            limit: this.entriesPerPage, 
            offset: (this.currentPage - 1) * this.entriesPerPage,
          },
        })
        .then((response) => {
          this.tableData = response.data.data;
          this.totalCount = response.data.count;
          
          // Check if DataTable is already initialized, and destroy it if it is
          if (this.dataTable) {
            this.dataTable.destroy();
          }
          
          // Initialize DataTable after the component is mounted and data is loaded
          this.$nextTick(() => {
            this.initDataTable();
          });
        })
        .catch((error) => {
          console.error('Error fetching pages:', error);
        });
    },
    initDataTable() {
      const self = this;

      this.dataTable = $(this.$refs.pageTable).DataTable({
        lengthChange: true, 
        lengthMenu: [10, 25, 50],
        pageLength: this.entriesPerPage, 
        columnDefs: [
          { width: '30px', targets: 0 },
          { width: 'auto', targets: 1 },
          { width: '120px', targets: 2 },
        ],
      });

      this.dataTable.on('length.dt', function (e, settings, len) {
        self.entriesPerPage = len;
        self.fetchTableData();
      });
    },
    nextPage() {
      if ((this.currentPage + 1) * this.entriesPerPage <= this.totalCount) {
        this.currentPage++;
        this.fetchTableData();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchTableData();
      }
    },
    deleteRow(id) {
      console.log(`Delete button clicked for row with ID ${id}`);
      if (confirm('Are you sure you want to delete this item?')) {
        // If the user clicks OK, proceed with the deletion
        axios
          .delete(`${getPages}/${id}`) // Replace with your delete API endpoint
          .then((response) => {
            // If the deletion is successful, refresh the table
            console.log(response);
            this.fetchTableData();
          })
          .catch((error) => {
            console.error(`Error deleting item with ID ${id}:`, error);
          });
      }
    },
  },
};
</script>