<template>
  <div>
    <b-form @submit="sendMessage" align="center">
      <br />
      <br />
      <b-row>
        <b-col md="6">
          <b-button variant="primary" v-show="loading">
            <b-spinner small type="grow"></b-spinner>
            Sending Message...
          </b-button>
          <b-form-group id="input-group-1" label="Message header:">
            <b-form-input
              id="input-1"
              v-model="selectedItem.header"
              type="text"
              placeholder="Enter header"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <b-form-group id="input-group-2" label="Message content:">
            <b-form-textarea
              id="textarea"
              v-model="selectedItem.messageContent"
              placeholder="Enter content..."
              rows="3"
              max-rows="6"
              required
            ></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <div>
            <b-table
              selectable
              id="my-table"
              responsive="sm"
              select-mode="range"
              :fields="fields"
              striped
              hover
              :items="items"
            >
              <template v-slot:cell(actions)="row">
                <b-form-checkbox
                  v-model="row.item.check"
                  @input="onCheck($event, row.index, row.item)"
                ></b-form-checkbox>
              </template>
            </b-table>
            <b-pagination
              v-model="currentPage"
              :total-rows="items.length"
              :per-page="perPage"
              aria-controls="my-table"
              align="center"
            ></b-pagination>
          </div>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col md="2"> </b-col>
        <b-col md="2">
          <b-button type="submit" variant="primary">Send</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';
// import { mdbSpinner } from 'mdbvue';
export default {
  //   components: {
  //   mdbSpinner,
  // },
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      loading: false,
      selectedItem: {
        header: '',
        messageContent: '',
        customersPhones: [],
        CustomerMessages: [],
      },
      fields: [
        {
          key: 'name',
          sortable: false,
          Label: 'Customer Name',
        },
        {
          key: 'phoneNumber',
          sortable: false,
          Label: 'Phone number',
        },
        { key: 'actions' },
      ],
      items: [],
    };
  },
  mounted() {
    this.getCustomers();
  },
  methods: {
    getCustomers() {
      axios
        .get('https://localhost:7097/api/Customer')
        .then((response) => {
          this.items = response.data;
        })
        .catch(() => {});
    },
    async sendMessage() {
      if (this.selectedItem.CustomerMessages.length < 1) {
        alert('You must choose one customer at least');
        return;
      } else {
        if (this.loading) return;
        this.loading = true;
        setTimeout(() => {
          axios
            .post('https://localhost:7097/api/Message', this.selectedItem)
            .then(() => {
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
              alert('Some error has occured');
            });
        }, 5000);
      }
    },
    onCheck(value, index, item) {
      const customer = this.selectedItem.CustomerMessages.find(
        (i) => i.id === item.id
      );
      if (!customer)
        this.selectedItem.CustomerMessages.push({
          customerId: item.id,
          customerPhone: item.phoneNumber,
          customerDto: {
            ...item,
          },
        });
    },
  },
};
</script>
