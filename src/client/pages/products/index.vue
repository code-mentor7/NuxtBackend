<template>
  <v-container fluid>
    <v-layout
      justify-center
      align-center>
      <v-flex xs11>
        <v-toolbar
          flat
          dark>
          <v-toolbar-title>
            <v-tooltip top>
              <v-btn
                slot="activator"
                flat
                color="primary"
                @click="clickCreate">
                <v-icon>add</v-icon>
                CREATE
              </v-btn>
              <span>Create Product</span>
            </v-tooltip>
          </v-toolbar-title>
          <!-- <v-divider
                    class="mx-2"
                    inset
                    vertical
                ></v-divider> -->
          <v-spacer/>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            no-results-text="Boh"
            hide-details
          />
        </v-toolbar>
        <!-- <v-toolbar
          flat
          dense>
          <v-toolbar-title>

            <v-btn-toggle
              v-model="productFilter"
              exclusive
              class="transparent">
              <v-tooltip top>
                <v-btn
                  slot="activator"
                  flat
                  color="green"
                  @click="clickActiveFilter">
                  ACTIVE
                </v-btn>
                <span>Filter for active product</span>
              </v-tooltip>
              <v-divider
                class="mx-2"
                vertical
              />
              <v-tooltip top>
                <v-btn
                  slot="activator"
                  flat
                  color="grey"
                  @click="clickInactiveFilter">
                  INACTIVE
                </v-btn>
                <span>Filter for inactive product</span>
              </v-tooltip>
            </v-btn-toggle>

          </v-toolbar-title>

        </v-toolbar> -->
        <v-data-table
          :must-sort="true"
          :pagination.sync="pagination"
          :total-items="productsCount"
          :loading="loading"
          :headers="headers"
          :items="products"
          :rows-per-page-items="itemPerRow"
          class="elevation-10"
        >
          <v-progress-linear
            slot="progress"
            color="cyan accent-1"
            height="5"
            indeterminate/>
          <template
            slot="items"
            slot-scope="props">
            <td>
              <v-avatar
                :tile="true"
                size="60px"
                color="grey lighten-4"
              >
                <img
                  :src="props.item.primary_image_id | cloudinaryImageUrl"
                  alt="avatar">
              </v-avatar>
            </td>
            <td>{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.sku }}</td>
            <td class="text-xs-center">{{ props.item.inventory }}</td>
            <td class="text-xs-center">
              <span v-if="!props.item.disabled">
                <v-chip
                  color="green"
                  text-color="white">Active</v-chip>
              </span>
              <span v-if="props.item.disabled">
                <v-chip
                  color="grey"
                  text-color="white">Inactive</v-chip>
              </span>
            </td>
            <td class="text-xs-center">{{ props.item.updated_at }}</td>
            <td class="justify-center layout px-0">
              <v-icon
                class="mr-2 "
                @click="editItem(props.item._id)"
              >
                edit
              </v-icon>
              <v-icon
                v-if="!props.item.disabled"
                class="red--text"
                @click="setProdState(props.item._id, props.item.disabled, 'disable')"
              >
                close
              </v-icon>
              <v-icon
                v-if="props.item.disabled"
                class="green--text"
                @click="setProdState(props.item._id, props.item.disabled, 'enable')"
              >
                done
              </v-icon>
            </td>
          </template>
          <!-- <v-alert slot="no-results" :value="true" color="warning" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert> -->
        </v-data-table>
        <!-- <v-card>
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        no-results-text="Boh"
                        hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                    :must-sort=true
                    :pagination.sync="pagination"
                    :total-items="totalCount"
                    :loading="loading"
                    :headers="headers"
                    :items="products"
                    :rows-per-page-items="itemPerRow"
                    class="elevation-10"
                >
                    <v-progress-linear slot="progress" color="light-blue accent-2" height="5" indeterminate></v-progress-linear>
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-center">{{ props.item.sku }}</td>
                        <td class="text-xs-center">{{ props.item.inventory }}</td>
                        <td class="text-xs-center">
                            <span v-if="!props.item.disabled">
                                <v-chip color="green" text-color="white">Active</v-chip>
                            </span>
                            <span v-if="props.item.disabled">
                                <v-chip color="secondary" text-color="white">Inactive</v-chip>
                            </span>
                        </td>
                        <td class="text-xs-center">{{ props.item.updated_at }}</td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="warning" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert>
                </v-data-table>
            </v-card> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import { Counts } from "meteor/natestrauser:publish-performant-counts"
// import { Products } from "/imports/collections/products"
// import { Merchants } from "/imports/collections/merchant"
// import { Roles } from "meteor/alanning:roles"
import { mapState } from "vuex"
import _ from "lodash"
export default {
  async fetch ({ app, store, redirect, route }) {
    try {
      const getData = app.$axios.$post("/api/products", {
        search: "",
        filter: {
          disabled: false
        }
      })
      const getCount = app.$axios.$post("/api/products/count", {
        search: "",
        filter: {
          disabled: false
        }
      })
      let promiseArr = [
        getData,
        getCount
      ]

      let products = []
      let productsCount = 0
      await Promise.all(promiseArr)
        .then((promiseResultArray) => {
          products = promiseResultArray[0]
          productsCount = promiseResultArray[1]
        })
      app.store.dispatch("products/setProducts", products)
      app.store.dispatch("products/setProductsCount", productsCount)
    }
    catch (err) {
      console.log("&&&", err)
    }
  },
  data () {
    let defaultData = {
      dialog: false,
      headers: [
        {
          text: "",
          sortable: false
        },
        {
          text: "Product Name",
          align: "left",
          value: "name"
        },
        {
          text: "SKU",
          align: "center",
          value: "sku"
        },
        {
          text: "Inventory",
          align: "center",
          value: "inventory"
        },
        {
          text: "Status",
          align: "center",
          sortable: false,
          value: "disabled"
        },
        {
          text: "Last updated",
          align: "center",
          value: "updated_at"
        },
        {
          text: "Actions",
          align: "center",
          sortable: false
        }
      ],
      search: null,
      itemPerRow: [10, 25, 50],
      pagination: { sortBy: "updated_at", descending: true },
      loading: false,
      limit: 10,
      sortBy: "updated_at",
      sorting: -1,
      sortObj: {},
      skip: 0,
      query: {},
      selector: {},
      searchValue: "",
      isActiveFilter: false,
      isInactiveFilter: false,
      productFilter: []
    }
    return defaultData
  },
  computed: {
    ...mapState({
      products: state => state.products.products,
      productsCount: state => state.products.productsCount
    })
    // merchantId () {
    //     let merchantId = -1;
    //     if(this.merchant){
    //         merchantId = this.merchant._id;
    //     }
    //     return merchantId;
    // },
  },
  watch: {
    pagination: {
      handler () {
        this.getDataFromApi()
      },
      deep: true
    },
    search (val) {
      let queryObj = {}
      this.searchValue = val
      this.debouncedSearch()
    }
  },
  created: function () {
    this.debouncedSearch = _.debounce(this.updateSearch, 700)
  },
  mounted: function () {
    // this.query = { merchant_id: this.merchantData._id }
    // console.log("this.userIsAdmin", this.userIsAdmin)
    // this.selector = { merchant_id: this.merchantData._id }
    // if (!this.userIsAdmin) {
    //   // this.query.created_by = Meteor.userId()
    //   // this.selector.created_by = Meteor.userId()
    // }
    // this.sortObj[this.sortBy] = this.sorting
    // console.log("mounted merchant id: ", this.merchantData._id)
    // this.$subscribe("getProducts", () => [this.query, { sort: this.sortObj, skip: this.skip, limit: this.limit }])
    // this.$subscribe("getProductsCount", () => [this.query])
    // this.$subscribe('getProducts', () => [{merchant_id: this.merchantId}, {sort: {updated_at: -1}, limit: 5}]);
  },
  methods: {
    clickActiveFilter () {
      this.selector = { ...this.selector, disabled: false }
      this.isActiveFilter = !this.isActiveFilter
      if (this.isActiveFilter === false) {
        delete this.selector.disabled
      }
      else {
        this.isInactiveFilter = false
      }
      this.updateSearch()
    },
    clickInactiveFilter () {
      this.selector = { ...this.selector, disabled: true }
      this.isInactiveFilter = !this.isInactiveFilter
      if (this.isInactiveFilter === false) {
        delete this.selector.disabled
      }
      else {
        this.isActiveFilter = false
      }
      this.updateSearch()
    },
    getDataFromApi () {
      const { sortBy, descending, page, rowsPerPage } = this.pagination
      this.sortBy = sortBy
      this.sorting = -1
      this.skip = rowsPerPage * (page - 1) || 0
      if (!descending) {
        this.sorting = 1
      }
      this.sortObj = {}
      this.sortObj[this.sortBy] = this.sorting
      this.limit = rowsPerPage || 0
    },
    updateSearch () {
      let orArr = []
      this.headers.forEach((head) => {
        if (head.value) {
          let queryObj = {}
          queryObj[head.value] = { $regex: this.searchValue, $options: "i" }
          orArr.push(queryObj)
        }
      })
      this.query = { ...this.selector, $or: orArr }
    },
    editItem (itemId) {
      this.$router.push({ name: "productEdit", params: { id: itemId } })
    },
    setProdState (id, state, type) {
      let _type = this.$options.filters.capitalize(type)
      let color = type === "enable" ? "green" : "red"
      this.$root.$confirm(`${_type} Product`, "Are you sure?", { color }).then((confirm) => {
        if (confirm) {
          this.setLoading(true)
          // Meteor.call("updateProduct", { _id: id }, { disabled: !state }, (err, res) => {
          //   this.setLoading(false)
          //   let message = `Product ${type}d.`
          //   let messageType = "success"
          //   if (err || res == 0) {
          //     message = `Failed to ${type} product.`
          //     messageType = "error"
          //   }

          //   this.setupSnackbar({
          //     show: true,
          //     text: message,
          //     type: messageType
          //   })
          // })
        }
      })
    },
    clickCreate () {
      this.$router.push({ name: "ProductCreate" })
    }
  }
  // meteor: {
  //   // merchant () {
  //   //     return Merchants.findOne({ user_ids: { $in: [Meteor.userId()]} });
  //   // },
  //   products () {
  //     this.totalCount = Counter.get("countGetProducts")
  //     let prod = Products.find(this.query, { sort: this.sortObj, limit: this.limit })
  //     console.log(this.totalCount, new Date().getTime() - this.time, this.$subReady.getProducts)
  //     return prod
  //   },
  //   userIsAdmin () {
  //     return Roles.userIsInRole(Meteor.userId(), ["admin"], "backend")
  //   }
  // }

}
</script>
