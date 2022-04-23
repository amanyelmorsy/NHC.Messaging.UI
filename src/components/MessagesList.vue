<template>
  <div>
    <b-modal ref="customer-modal" id="bv-modal" hide-footer>
      <template #modal-title> Customers </template>
      <div class="d-block text-center">
        <b-table
          selectable
          responsive="sm"
          select-mode="range"
          :fields="columns"
          striped
          hover
          :items="customers">
        </b-table>
      </div>
      <b-button class="mt-3" block @click="$bvModal.hide('bv-modal')"
        >Close</b-button>
    </b-modal>
    <b-row>
      <b-col md="6">
        <div>
          <b-table
             selectable
              id="message-table"
              responsive="sm"
              select-mode="range"
              :fields="fields"
              striped
              hover
              :items="items"
          >
            <template v-slot:cell(actions)="row">
              <b-button variant="info" @click="loadCustomers(row.item)"
                >View Customers</b-button
              >
            </template>
          </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="items.length"
            :per-page="perPage"
            aria-controls="message-table"
            align="center"
          ></b-pagination>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      perPage: 4,
      currentPage: 1,
      fields: [
        {
          key: 'header',
          sortable: false,
          Label: 'Message header',
        },
        {
          key: 'messageContent',
          sortable: false,
          Label: 'Message content',
        },
        { key: 'actions' },
      ],
      columns: [
        {
          key: 'name',
          sortable: false,
          Label: 'Message header',
        },
        {
          key: 'phoneNumber',
          sortable: false,
          Label: 'Message content',
        },
        {
          key: 'messageStatus',
          sortable: false,
          Label: 'Message Status',
        },
      ],
      items: [],
      customers: [],
    };
  },
  mounted() {
    this.getMessages();
  },
  methods: {
    getMessages() {
      axios
        .get('https://localhost:7097/api/Message')
        .then((response) => {
          this.items = response.data;
        })
        .catch(() => {});
    },
    loadCustomers(item) {
      const message = this.items.find((i) => i.id === item.id);
      this.customers = message.customers;
      this.$refs['customer-modal'].show();
    },
  },
};
</script>
