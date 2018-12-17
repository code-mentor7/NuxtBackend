<template>
  <v-form @submit.prevent="submit">
    <v-container
      class="pt-0 "
      fluid
      grid-list-lg>
      <v-layout
        row
        wrap>
        <!--  Basic Details Start  -->
        <v-flex xs12>
          <v-expansion-panel
            v-model="expandBasicD"
            expand>
            <v-expansion-panel-content>
              <div
                slot="header"
                class="primary--text font-weight-bold">{{ $t('basic_details') | capitalize }}</div>
              <v-card class="v-form">
                <v-container class="pt-0 ">
                  <v-layout
                    row
                    wrap>
                    <v-flex
                      xs12
                      sm12
                      md6>
                      <v-text-field
                        v-model.trim="product.name"
                        :error-messages="$helpers.checkError('name', validationProps, $v.product)"
                        :label="$t('name')"
                        name="name"
                        type="text"
                        @input="$v.product.name.$touch()"/>
                      <v-text-field
                        v-model.trim="product.sku"
                        :error-messages="$helpers.checkError('sku', validationProps, $v.product, 'tour ID')"
                        :label="$t('sku')"
                        name="sku"
                        type="text"
                        @input="$v.product.sku.$touch()"/>
                      <v-text-field
                        v-model.trim="product.location_to_be_display"
                        :error-messages="$helpers.checkError('location_to_be_display', validationProps, $v.product, 'display Location')"
                        :label="$t('location_to_be_display')"
                        name="location_to_be_display"
                        type="text"
                        @input="$v.product.location_to_be_display.$touch()"/>
                      <v-text-field
                        v-model.trim="product.duration"
                        :label="$t('duration')"
                        name="duration"
                        placeholder="3 days 2 nights"
                        type="text"/>
                      <v-menu
                        ref="addOnDatePicker"
                        :close-on-content-click="false"
                        v-model="addOnDatePicker"
                        :nudge-right="40"
                        :return-value.sync="product.tour_addons_expiration_date"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="product.tour_addons_expiration_date"
                          :label="$t('tour_addons_expiration_date')"
                          prepend-icon="event"
                          readonly
                        />
                        <v-date-picker
                          v-model="product.tour_addons_expiration_date"
                          color="primary"
                          @input="$refs.addOnDatePicker.save(product.tour_addons_expiration_date)"
                        />
                      </v-menu>
                      <v-textarea
                        v-model.trim="product.notes"
                        :label="$t('notes')"
                        :no-resize="true"
                        :hint="$t('internal_notes')"
                        :persistent-hint="true"
                        name="notes"
                        clearable
                        counter
                      />
                      <v-checkbox
                        v-model="product.disabled"
                        :label="$t('disabled')"
                        color="primary"
                      />
                    </v-flex>
                    <v-flex
                      xs12
                      sm12
                      md6>
                      <no-ssr placeholder="Loading...">
                        <quill
                          v-model="product.description"
                          :label="$t('description')"/>
                        <quill
                          v-model="product.highlights"
                          :label="$t('highlights')"/>
                        <quill
                          v-model="product.includes"
                          :label="$t('remarks')"/>
                          <!-- <h-t-m-l-editor
                          :label="$t('description')"
                          :data="product.description"
                          :id="'js-editor-description'"
                        /> -->
                          <!-- <h-t-m-l-editor
                          :label="$t('highlights')"
                          :data="product.highlights"
                          :id="'js-editor-highlights'"
                        />
                        <h-t-m-l-editor
                          :label="$t('remarks')"
                          :data="product.includes"
                          :id="'js-editor-includes'"
                        /> -->
                      </no-ssr>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>

        </v-flex>
        <!--  Basic Details End  -->

        <!-- Inventory Start -->
        <v-flex xs12>
          <v-expansion-panel
            v-model="expandInventory"
            expand>
            <v-expansion-panel-content>
              <div
                slot="header"
                class="primary--text font-weight-bold">{{ $t('inventory') | capitalize }}</div>
              <v-card class="v-form">
                <v-container class="pt-0 ">
                  <v-layout
                    row
                    wrap>
                    <v-flex
                      xs12
                      sm6
                      md4>
                      <v-text-field
                        :label="$t('inventory')"
                        :error-messages="$helpers.checkError('inventory', validationProps, $v.product)"
                        v-model.number="product.inventory"
                        type="number"
                        name="inventory"
                        @input="$v.product.inventory.$touch()"
                      />
                    </v-flex>
                    <v-flex
                      xs12
                      sm6
                      md4>
                      <v-text-field
                        :label="$t('min_pax')"
                        v-model.number="product.min_pax"
                        type="number"
                      />
                    </v-flex>
                    <v-flex
                      xs12
                      sm6
                      md4>
                      <v-text-field
                        v-model.number="product.max_pax"
                        :label="$t('max_pax')"
                        type="number"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <!-- Inventory End -->

        <!-- Fees Start -->
        <v-flex xs12>
          <v-expansion-panel
            v-model="expandFees"
            expand>
            <v-expansion-panel-content>
              <div
                slot="header"
                class="primary--text font-weight-bold">{{ $t('fees') | capitalize }}</div>
              <v-card class="v-form">
                <v-container class="pt-0">
                  <v-layout
                    row
                    wrap>
                    <v-flex
                      xs12
                      sm6
                      md4>
                      <v-text-field
                        :label="$t('cost')"
                        v-model.number="product.cost"
                        type="number"
                      />
                      <v-text-field
                        :label="$t('handling_fee')"
                        v-model.number="product.handling_fee"
                        type="number"
                      />
                    </v-flex>
                    <v-flex
                      xs12
                      sm6
                      md4>
                      <v-text-field
                        :label="$t('adult_selling_price')"
                        :error-messages="$helpers.checkError('adult_selling_price', validationProps, $v.product, 'Selling Price (Adult)')"
                        v-model.number="product.adult_selling_price"
                        type="number"
                        name="adult_selling_price"
                        @input="$v.product.adult_selling_price.$touch()"
                      />
                      <v-text-field
                        :label="$t('adult_promotion_price')"
                        v-model.number="product.adult_promotion_price"
                        type="number"
                      />
                    </v-flex>
                    <v-flex
                      xs12
                      sm6
                      md4>
                      <v-text-field
                        v-model.number="product.kid_selling_price"
                        :error-messages="$helpers.checkError('kid_selling_price', validationProps, $v.product, 'Selling Price (Kid)')"
                        :label="$t('kid_selling_price')"
                        type="number"
                        name="kid_selling_price"
                        @input="$v.product.kid_selling_price.$touch()"
                      />
                      <v-text-field
                        :label="$t('kid_promotion_price')"
                        v-model.number="product.kid_promotion_price"
                        type="number"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <!-- Fees End -->

        <!-- Purchase Discount Start -->
        <v-flex xs12>
          <v-expansion-panel
            v-model="expandPurchaseDiscount"
            expand>
            <v-expansion-panel-content>
              <div
                slot="header"
                class="primary--text font-weight-bold">{{ $t('purchase_discount') | capitalize }}</div>
              <v-card class="v-form">
                <v-container class="pt-0">
                  <p class="orange--text text--accent-4">{{ $t('purchase_discount_example') }}:<br> {{ $t('pd_ex_1') }}, <br>
                    {{ $t('pd_ex_2') }} <br>
                    {{ $t('pd_ex_3') }} <br>
                    {{ $t('pd_ex_4') }} <br>
                    {{ $t('pd_ex_5') }} <br>
                    {{ $t('pd_ex_6') }} <br>
                    {{ $t('pd_ex_7') }} <br>
                  </p>
                  <v-layout
                    row
                    wrap>
                    <v-flex
                      xs12
                      sm6
                      md6>
                      <v-card>
                        <v-list one-line>
                          <v-subheader class="font-weight-bold">
                            {{ $t('adult_purchase_discount') }}
                            <v-tooltip top>
                              <v-btn
                                slot="activator"
                                flat
                                color="primary"
                                icon
                                @click="clickPD('add', 'adult')">
                                <v-icon>add</v-icon>
                              </v-btn>
                              <span>{{ $t('add_adult_pd') }}</span>
                            </v-tooltip>
                          </v-subheader>
                          <v-divider/>
                          <template v-for="(item, index) in product.adult_purchase_discount">
                            <v-divider
                              :key="index"
                            />

                            <v-list-tile
                              :key="`${index}${item.adult_purchase_unit}`"
                            >
                              <v-list-tile-action>
                                <v-tooltip top>
                                  <v-btn
                                    slot="activator"
                                    flat
                                    fab
                                    small
                                    color="red"
                                    @click="removeItem('adult_purchase_discount', index)">
                                    <v-icon>close</v-icon>
                                  </v-btn>
                                  <span>{{ $t('remove') }}</span>
                                </v-tooltip>
                              </v-list-tile-action>

                              <v-list-tile-content>
                                <v-list-tile-title >{{ item.adult_purchase_unit }} unit</v-list-tile-title>
                                <v-list-tile-sub-title>${{ item.adult_purchase_discount }}</v-list-tile-sub-title>
                              </v-list-tile-content>
                            </v-list-tile>
                          </template>
                        </v-list>
                      </v-card>
                    </v-flex>
                    <v-flex
                      xs12
                      sm6
                      md6>
                      <v-card>
                        <v-list one-line>
                          <v-subheader class="font-weight-bold">
                            {{ $t('child_purchase_discount') }}
                            <v-tooltip top>
                              <v-btn
                                slot="activator"
                                flat
                                color="primary"
                                icon
                                @click="clickPD('add', 'child')">
                                <v-icon>add</v-icon>
                              </v-btn>
                              <span>{{ $t('add_child_pd') }}</span>
                            </v-tooltip>
                          </v-subheader>
                          <v-divider/>
                          <template v-for="(item, index) in product.child_purchase_discount">
                            <v-divider
                              :key="index"
                            />

                            <v-list-tile
                              :key="`${index}${item.child_purchase_unit}`"
                            >
                              <v-list-tile-action>
                                <v-tooltip top>
                                  <v-btn
                                    slot="activator"
                                    flat
                                    fab
                                    small
                                    color="red"
                                    @click="removeItem('child_purchase_discount', index)">
                                    <v-icon>close</v-icon>
                                  </v-btn>
                                  <span>{{ $t('remove') }}</span>
                                </v-tooltip>
                              </v-list-tile-action>

                              <v-list-tile-content>
                                <v-list-tile-title >{{ item.child_purchase_unit }} unit</v-list-tile-title>
                                <v-list-tile-sub-title>${{ item.child_purchase_discount }}</v-list-tile-sub-title>
                              </v-list-tile-content>
                            </v-list-tile>
                          </template>
                        </v-list>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <!-- Purchase Discount End -->

        <!-- Itinerary Start -->
        <v-flex xs12>
          <v-expansion-panel
            v-model="expandItinerary"
            expand>
            <v-expansion-panel-content>
              <div
                slot="header"
                class="primary--text font-weight-bold">{{ $t('itinerary') | capitalize }}</div>
                <!-- <v-tabs
                color="cyan"
                show-arrows
              >
                <v-tabs-slider color="black"/>
                <v-tooltip top>
                  <v-btn
                    slot="activator"
                    flat
                    color="black"
                    icon
                    @click="clickItinerary('add')">
                    <v-icon>add</v-icon>
                  </v-btn>
                  <span>{{ $t('add_itinerary') }}</span>
                </v-tooltip>

                <v-tab
                  v-for="(item, index) in product.itinerary"
                  :href="'#tab-' + index"
                  :key="index"
                >
                  {{ item.title }}
                </v-tab>

                <v-tabs-items>
                  <v-tab-item
                    v-for="(item, index) in product.itinerary"
                    :id="'tab-' + index"
                    :key="index"
                  >
                    <v-card
                      color="blue-grey darken-2"
                      class="white--text">
                      <v-card-title primary-title>
                        <div>
                          <h3 class="headline mb-0">{{ item.content_title }}</h3>
                        </div>
                      </v-card-title>
                      <v-card-text
                        class=""
                        v-html="item.content"/>
                      <v-card-text
                        v-if="item.notes"
                        class="pt-0 pb-0">Notes: {{ item.notes }}</v-card-text>
                      <v-card-actions class="pt-0 pb-0">
                        <v-tooltip top>
                          <v-btn
                            slot="activator"
                            icon
                            @click="clickItinerary('edit', item, index)">
                            <v-icon>edit</v-icon>
                          </v-btn>
                          <span>{{ $t('edit') }}</span>
                        </v-tooltip>
                        <v-tooltip top>
                          <v-btn
                            slot="activator"
                            flat
                            color="red"
                            icon
                            @click="deleteItineraryEntry(item, index)">
                            <v-icon>delete</v-icon>
                          </v-btn>
                          <span>{{ $t('remove') }}</span>
                        </v-tooltip>
                      </v-card-actions>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </v-tabs> -->
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <!-- Itinerary End -->

        <!-- Images Start -->
        <v-flex xs12>
          <v-expansion-panel
            v-model="expandImages"
            expand>
            <v-expansion-panel-content>
              <div
                slot="header"
                class="primary--text font-weight-bold">{{ $t('images') | capitalize }}</div>
              <v-flex xs12>
                <v-card>
                  <v-list one-line>
                    <v-subheader>{{ $t('primary_image') }}</v-subheader>
                    <v-divider/>
                    <v-list-tile avatar>
                      <v-list-tile-action>
                        <input
                          ref="primary_image_id"
                          type="file"
                          style="display:none"
                          name="primary_image_id"
                          @change="filesChange($event.target.name, $event.target.files, $event)">
                        <v-tooltip
                          v-show="!product.primary_image_id && !primary_image_filename"
                          top>
                          <v-btn
                            slot="activator"
                            flat
                            small
                            fab
                            color="primary"
                            @click="trigger('primary_image_id')">
                            <v-icon>attach_file</v-icon>
                          </v-btn>
                          {{ $t('add_image') }}
                        </v-tooltip>
                        <v-tooltip
                          v-show="product.primary_image_id || primary_image_filename"
                          top>
                          <v-btn
                            slot="activator"
                            flat
                            fab
                            small
                            color="red"
                            @click="removeImage(product.primary_image_id, 'primary_image_id')">
                            <v-icon>close</v-icon>
                          </v-btn>
                          <span>{{ $t('remove') }}</span>
                        </v-tooltip>
                      </v-list-tile-action>
                      <v-list-tile-avatar
                        tile
                        size="50px">
                        <img
                          id="primary_image_id"
                          :src="product.primary_image_id | cloudinaryImageUrl">
                      </v-list-tile-avatar>

                      <v-list-tile-content>
                        <v-list-tile-title v-show="!product.primary_image_id && !primary_image_filename">No image</v-list-tile-title>
                        <v-list-tile-title v-if="primary_image_filename">{{ primary_image_filename }}</v-list-tile-title>
                      </v-list-tile-content>

                    </v-list-tile>
                    <input
                      ref="other_images"
                      type="file"
                      style="display:none"
                      name="other_images"
                      @change="filesChange($event.target.name, $event.target.files, $event)">
                    <v-subheader>
                      <v-tooltip
                        v-show="product.other_image_ids.length < 6"
                        top>
                        <v-btn
                          slot="activator"
                          flat
                          small
                          fab
                          color="primary"
                          @click="trigger('other_images')">
                          <v-icon>attach_file</v-icon>
                        </v-btn>
                        {{ $t('add_image') }}
                      </v-tooltip>
                      {{ $t('other_images') }}
                    </v-subheader>

                    <template v-for="(item, index) in product.other_image_ids">
                      <v-divider
                        :key="index"
                      />

                      <v-list-tile
                        :key="`${index}${item.image_filename}`"
                        avatar
                      >
                        <v-list-tile-action>
                          <v-tooltip
                            v-show="item.image_filename"
                            top>
                            <v-btn
                              slot="activator"
                              flat
                              fab
                              small
                              color="red"
                              @click="removeImage(item.image_id, 'other_images', index)">
                              <v-icon>close</v-icon>
                            </v-btn>
                            <span>{{ $t('remove') }}</span>
                          </v-tooltip>
                        </v-list-tile-action>
                        <v-list-tile-avatar
                          tile
                          size="50px">
                          <img
                            :src="item.image_id | cloudinaryImageUrl"
                            :id="`other_images${index}`">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                          <v-list-tile-title >{{ item.image_filename }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                  </v-list>
                </v-card>
              </v-flex>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <!-- Images End -->

        <!-- Tour Guide Start -->
        <v-flex xs12>
          <v-expansion-panel
            v-model="expandTourGuide"
            expand>
            <v-expansion-panel-content>
              <div
                slot="header"
                class="primary--text font-weight-bold">{{ $t('tour_guide') | capitalize }}</div>
              <v-card class="v-form">
                <v-container class="pt-0">
                  <v-layout
                    row
                    wrap>
                    <v-flex xs12>
                      <v-card>
                        <v-list one-line>
                          <v-subheader>
                            <v-tooltip top>
                              <v-btn
                                slot="activator"
                                flat
                                color="primary"
                                icon
                                @click="clickTG('add')">
                                <v-icon>add</v-icon>
                              </v-btn>
                              <span>{{ $t('add_tour_guide') }}</span>
                            </v-tooltip>
                          </v-subheader>
                          <v-divider/>
                          <template v-for="(item, index) in product.tour_guide">
                            <v-divider
                              :key="index"
                            />

                            <v-list-tile
                              :key="`${index}${item.tour_guide_name}`"
                              avatar
                            >
                              <v-list-tile-action>
                                <v-tooltip top>
                                  <v-btn
                                    slot="activator"
                                    flat
                                    fab
                                    small
                                    color="red"
                                    @click="removeItem('tour_guide', index)">
                                    <v-icon>close</v-icon>
                                  </v-btn>
                                  <span>{{ $t('remove') }}</span>
                                </v-tooltip>
                              </v-list-tile-action>

                              <v-list-tile-content>
                                <v-list-tile-title >{{ item.tour_guide_name }}</v-list-tile-title>
                                <v-list-tile-sub-title>${{ item.tour_guide_price }}</v-list-tile-sub-title>
                              </v-list-tile-content>
                            </v-list-tile>
                          </template>
                        </v-list>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <!-- Tour Guide End -->

        <!-- Travel Insurance Start -->
        <v-flex xs12>
          <v-expansion-panel
            v-model="expandTravelInsurance"
            expand>
            <v-expansion-panel-content>
              <div
                slot="header"
                class="primary--text font-weight-bold">{{ $t('travel_insurance') }}</div>
              <v-card class="v-form">
                <v-container class="pt-0">
                  <v-layout
                    row
                    wrap>
                    <!-- <v-flex xs12>
                                        <v-text-field label="Travel Insurance Fee"
                                            type="number"
                                            v-model.number="product.travel_insurance_fee"
                                        ></v-text-field>
                                    </v-flex> -->
                    <v-flex
                      xs12
                      sm6
                      md6>
                      <v-text-field
                        :label="$t('adult_travel_insurance_fee')"
                        v-model.number="product.adult_travel_insurance_fee"
                        type="number"
                      />
                    </v-flex>
                    <v-flex
                      xs12
                      sm6
                      md6>
                      <v-text-field
                        :label="$t('child_travel_insurance_fee')"
                        v-model.number="product.child_travel_insurance_fee"
                        type="number"
                      />
                    </v-flex>
                    <v-flex xs12>
                      <v-card>
                        <p class="yellow--text">
                          {{ $t('travel_insurance_tip') }}
                        </p>

                        <v-list one-line>
                          <v-subheader>{{ $t('travel_insurance_file') }} <span> <p class="yellow--text">
                            {{ $t('travel_insurance_warning') }}
                          </p></span></v-subheader>
                          <v-divider/>
                          <v-list-tile avatar>
                            <v-list-tile-action>
                              <input
                                ref="travel_insurance_file_id"
                                type="file"
                                style="display:none"
                                name="travel_insurance_file_id"
                                @change="filesChange($event.target.name, $event.target.files, $event)">
                              <v-tooltip
                                v-show="!product.travel_insurance_file_id"
                                top>
                                <v-btn
                                  slot="activator"
                                  flat
                                  small
                                  fab
                                  color="primary"
                                  @click="trigger('travel_insurance_file_id')">
                                  <v-icon>attach_file</v-icon>
                                </v-btn>
                                {{ $t('add_file') }}
                              </v-tooltip>
                              <v-tooltip
                                v-show="product.travel_insurance_file_id"
                                top>
                                <v-btn
                                  slot="activator"
                                  flat
                                  fab
                                  small
                                  color="red"
                                  @click="removeRaw(product.travel_insurance_file_id, 'travel_insurance_file_id')">
                                  <v-icon>close</v-icon>
                                </v-btn>
                                <span>{{ $t('remove') }}</span>
                              </v-tooltip>
                            </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title v-if="!product.travel_insurance_file_id">No file</v-list-tile-title>
                              <v-list-tile-title v-if="product.travel_insurance_file_id && !travel_insurance_file_name">
                                <a :href="product.travel_insurance_file_id | cloudinaryImageUrl">Uploaded Insurance File</a>
                              </v-list-tile-title>
                              <v-list-tile-sub-title v-if="travel_insurance_file_name">{{ travel_insurance_file_name }}</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <!-- Travel Insurance End -->

        <!-- Terms and Conditions Start -->
        <v-flex xs12>
          <v-expansion-panel
            v-model="expandTnC"
            expand>
            <v-expansion-panel-content>
              <div
                slot="header"
                class="primary--text font-weight-bold">{{ $t('tnc') |capitalize }}</div>
              <v-card class="v-form">
                <v-container class="pt-0">
                  <v-layout
                    row
                    wrap>
                    <v-flex xs12>
                      <no-ssr placeholder="Loading...">
                        <quill
                          v-model="product.terms_and_conditions"
                          :label="$t('tnc')"/>
                          <!-- <h-t-m-l-editor
                          :label="$t('tnc')"
                          :data="product.terms_and_conditions"
                          :id="'js-editor-tnc'"
                        /> -->
                      </no-ssr>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <!-- Terms and Condition End -->

      </v-layout>
    </v-container>
    <itinerary-form-dialog
      ref="itiDialog"
      @add="addItinerary"
      @edit="editItinerary"/>
    <purchase-discount-form-dialog
      ref="pdDialog"
      @add="addPD" />
    <tour-guide-form-dialog
      ref="tgDialog"
      @add="addTG" />
    <v-layout
      column
      class="fab-container">
      <v-btn
        :loading="localSubmitted"
        fab
        class="green"
        type="submit">
        <v-icon>save</v-icon>
      </v-btn>
      <!-- <v-btn fab class="red">
            <v-icon>close</v-icon>
        </v-btn> -->
    </v-layout>
  </v-form>
</template>

<script>

import ItineraryFormDialog from "~/components/Dialog/ItineraryFormDialog.vue"
import PurchaseDiscountFormDialog from "~/components/Dialog/PurchaseDiscountFormDialog.vue"
import TourGuideFormDialog from "~/components/Dialog/TourGuideFormDialog.vue"

import { required } from "vuelidate/lib/validators"
import { validationMixin } from "vuelidate"
import _ from "lodash"
import moment from "moment"

export default {
  components: {
    Quill: () => import("~/components/Quill.vue"),
    ItineraryFormDialog,
    PurchaseDiscountFormDialog,
    TourGuideFormDialog
  },
  mixins: [ validationMixin ],
  props: {
    submitted: {
      type: Boolean,
      default: false
    },
    value: {
      required: true,
      type: Object
    }
  },
  data () {
    let defaultData = {
      product: {
        adult_purchase_discount: [],
        child_purchase_discount: [],
        tour_guide: [],
        itinerary: [],
        merchant_id: null,
        merchant_name: null,
        name: null,
        sku: null,
        cost: 0,
        adult_selling_price: 0,
        kid_selling_price: 0,
        adult_promotion_price: 0,
        kid_promotion_price: 0,
        handling_fee: null,
        inventory: 0,
        min_pax: 0,
        max_pax: null,
        adult_travel_insurance_fee: 0,
        child_travel_insurance_fee: 0,
        location_to_be_display: null,
        description: "",
        highlights: "",
        includes: "",
        terms_and_conditions: "",
        duration: null,
        notes: null,
        travel_insurance_file: null,
        disabled: false,
        primary_image_id: "",
        other_image_ids: [],
        tour_addons_expiration_date: null,
        // travel_insurance_fee: 0,
        travel_insurance_file_id: null,
        resourcesToBeRemoved: []
      },
      travel_insurance_file_name: null,
      primary_image_filename: "",
      addOnDatePicker: false,
      expandBasicD: [false],
      expandInventory: [false],
      expandItinerary: [false],
      expandImages: [false],
      expandFees: [false],
      expandPurchaseDiscount: [false],
      expandTourGuide: [false],
      expandTravelInsurance: [false],
      expandTnC: [false],
      localSubmitted: false,
      validationProps: {
        name: { required },
        sku: { required },
        inventory: { required },
        location_to_be_display: { required },
        adult_selling_price: { required },
        kid_selling_price: { required }
      }
    }
    defaultData.product = { ...defaultData.product, ...this.value }
    if (defaultData.product.tour_addons_expiration_date != null) {
      defaultData.product.tour_addons_expiration_date = moment(
        defaultData.product.tour_addons_expiration_date
      ).format("YYYY-MM-DD")
    }
    return defaultData
  },
  i18n: {
    messages: {
      en: {
        add_adult_pd: "Add Adult Purchase Discount",
        add_child_pd: "Add Child Purchase Discount",
        add_file: "Add File",
        add_image: "Add Image",
        add_itinerary: "Add New Itinerary",
        add_tour_guide: "Add Tour Guide",
        adult_promotion_price: "Promotion Price (Adult)",
        adult_purchase_discount: "Adult Purchase Discount",
        adult_selling_price: "Selling Price (Adult)",
        adult_travel_insurance_fee: "Adult Travel Insurance Fee",
        basic_details: "Basic Details",
        child_purchase_discount: "Child Purchase Discount",
        child_travel_insurance_fee: "Child Travel Insurance Fee",
        cost: "Cost",
        description: "Description",
        disabled: "Disabled/Archive this product",
        duration: "Duration",
        edit: "Edit",
        fees: "Fees",
        handling_fee: "Handling Fee",
        highlights: "Highlights",
        images: "Images",
        internal_notes: "Notes for internal use only",
        inventory: "Inventory",
        itinerary: "Itinerary",
        kid_promotion_price: "Promotion Price (Kid)",
        kid_selling_price: "Selling Price (Kid)",
        location_to_be_display: "Display Location",
        name: "Name",
        max_pax: "Max Pax",
        min_pax: "Min Pax",
        notes: "Notes",
        other_images: "Other Images",
        pd_ex_1: "Add 2 purchase discount",
        pd_ex_2: "1) Purchase unit is 5, price is 2000",
        pd_ex_3: "2) Purchase unit is 10, price is 1000",
        pd_ex_4: "If customer purchase 4 unit, follow selling/promotion price.",
        pd_ex_5: "If customer purchase 5 unit, selling price is 2000 per unit.",
        pd_ex_6: "If customer purchase 6 unit, selling price is 2000 per unit.",
        pd_ex_7: "If customer purchase 10 unit and above, selling price is 1000 per unit.",
        primary_image: "Primary Image",
        purchase_discount: "Purchase Discount",
        purchase_discount_example: "Purchase Discount Example",
        quantity: "Quantity",
        remarks: "Remarks",
        remove: "Remove",
        sku: "Tour ID",
        tnc: "Terms & Conditions",
        tour_addons_expiration_date: "Tour Expiry Date",
        tour_guide: "Tour Guide",
        travel_insurance: "Travel Insurance",
        travel_insurance_file: "Travel Insurance File",
        travel_insurance_tip: "**Travel insurance is calculated per pax",
        travel_insurance_warning: "**Travel insurance file must be in the form of image or pdf"
      },
      zh: {
        add_adult_pd: "添加大人购买折扣",
        add_child_pd: "添加小孩购买折扣",
        add_file: "添加文件",
        add_image: "添加图片",
        add_itinerary: "添加行程",
        add_tour_guide: "添加导游",
        adult_promotion_price: "大人促销价",
        adult_purchase_discount: "大人购买折扣",
        adult_selling_price: "大人卖价",
        adult_travel_insurance_fee: "大人保险费用",
        basic_details: "基本资料",
        child_purchase_discount: "小孩购买折扣",
        child_travel_insurance_fee: "小孩保险费用",
        cost: "本钱，成本",
        description: "描述，简介，说明",
        disabled: "不显示此配套， 禁用此配套",
        duration: "天数",
        edit: "修改",
        fees: "配套费用，价格",
        handling_fee: "手续费",
        highlights: "亮点，要点",
        images: "图片",
        internal_notes: "备注仅供内部参考",
        inventory: "库存，存量，存货",
        itinerary: "行程",
        kid_promotion_price: "小孩促销价",
        kid_selling_price: "小孩卖价",
        location_to_be_display: "国家",
        max_pax: "最多人数",
        min_pax: "最少人数",
        name: "团名",
        notes: "笔记，注释，备注",
        other_images: "其他图片",
        pd_ex_1: "输入两个购买折扣, 例如",
        pd_ex_2: "1) 采购数量为5，价格为2000",
        pd_ex_3: "2) 采购数量为10，价格为1000",
        pd_ex_4: "如果客户采购数量为4,便根据原价或促销价",
        pd_ex_5: "如果客户采购数量为5,售价是每人2000",
        pd_ex_6: "如果客户采购数量为6,售价是每人2000",
        pd_ex_7: "如果客户采购数量为10或以上,售价是每人1000",
        primary_image: "主要图片",
        purchase_discount: "购买折扣",
        purchase_discount_example: "购买折扣, 例如",
        quantity: "数量",
        remarks: "备注",
        remove: "删除",
        sku: "团号",
        tnc: "条款和条件",
        tour_addons_expiration_date: "旅游截止日期",
        tour_guide: "导游",
        travel_insurance: "旅游保险",
        travel_insurance_file: "旅游保险文件",
        travel_insurance_tip: "**旅游保险的收费是以每人计算",
        travel_insurance_warning: "**旅游保险的文件一定是要以图片(.jpeg, .png)或pdf的格式"
      }
    }
  },
  watch: {
    submitted (val) {
      if (val) {
        this.localSubmitted = false
      }
    },
    value (val) {
      this.product = { ...this.product, ...val }
    }
    // productProp (val) {
    //   if (val) {
    //     console.log("this.productProp", this.productProp)
    //     this.product = { ...this.product, ...this.productProp }
    //     if (this.product.tour_addons_expiration_date != null) {
    //       this.product.tour_addons_expiration_date = moment(
    //         this.product.tour_addons_expiration_date
    //       ).format("YYYY-MM-DD")
    //     }
    //   }
    // }
  },
  mounted () {
    this.expandBasicD = [true]
    this.expandInventory = [true]
    this.expandItinerary = [true]
    this.expandImages = [true]
    this.expandFees = [true]
    this.expandPurchaseDiscount = [true]
    this.expandTourGuide = [true]
    this.expandTravelInsurance = [true]
    this.expandTnC = [true]
  },
  methods: {
    submit () {
      // let uploadObjKey = [
      //   "primary_image_id",
      //   "travel_insurance_file_id"
      // ]
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.localSubmitted = true
        let uploadPromiseArr = []
        this.$emit("input", this.product)
        this.$emit("submit")
        // this.$store.dispatch("products/setProductFormData", this.product)

        // _.each(this.product.other_image_ids, (otherImage) => {
        //   if (otherImage.isNew && otherImage.image_file.length > 0) {
        //     delete otherImage.isNew
        //     let promisify = new Promise((resolve, reject) => {
        //       this.uploadFile(otherImage.image_file[0], (res) => {
        //         delete otherImage.image_file
        //         otherImage.image_id = res
        //         resolve()
        //       })
        //     })
        //     uploadPromiseArr.push(promisify)
        //   }
        // })
        // _.each(uploadObjKey, (uploadItem) => {
        //   if (this.$refs[uploadItem].files.length > 0) {
        //     let promisify = new Promise((resolve, reject) => {
        //       this.uploadFile(this.$refs[uploadItem].files[0], (res) => {
        //         this.product[uploadItem] = res
        //         resolve()
        //       })
        //     })
        //     uploadPromiseArr.push(promisify)
        //   }
        // })
        // return Promise.all(uploadPromiseArr)
        //   .then(() => {
        //     // this.product.highlights = $("#js-editor-highlights").trumbowyg("html") || ""
        //     // this.product.description = $("#js-editor-description").trumbowyg("html") || ""
        //     // this.product.includes = $("#js-editor-includes").trumbowyg("html") || ""
        //     // this.product.terms_and_conditions = $("#js-editor-tnc").trumbowyg("html") || ""
        //     let setZeroArr = [
        //       "adult_selling_price", "kid_selling_price", "adult_promotion_price", "kid_promotion_price",
        //       "inventory", "min_pax", "max_pax", "cost", "adult_travel_insurance_fee", "child_travel_insurance_fee"
        //     ]
        //     setZeroArr.forEach((item) => {
        //       if (!this.product[item]) {
        //         this.product[item] = 0
        //       }
        //     })
        //     this.setProductFormData(this.product)
        //     this.$emit("submit")
        //   })
        //   .catch((err) => {
        //     console.log("err", err)
        //     this.$store.dispatch("setupSnackbar", {
        //       show: true,
        //       text: "Error in media upload. Please try again",
        //       type: "error"
        //     })
        //   })
      }
      else {
        this.$store.dispatch("setupSnackbar", {
          show: true,
          text: "Please fill up all required fields",
          type: "warning"
        })
      }
    },
    trigger (ref) {
      this.$refs[ref].click()
    },
    removeRaw (rawId) {
      this.product.travel_insurance_file_name = ""
      this.product.travel_insurance_file_id = null
      this.$refs["travel_insurance_file_id"].value = ""
      if (typeof rawId === "string") {
        this.product.resourcesToBeRemoved.push({ type: "raw", id: rawId })
      }
    },
    removeImage (imageId, ref, index) {
      this.primary_image_filename = ""
      this.$refs[ref].value = ""
      this.product[ref] = null
      if (this.$el.querySelector(`#${ref}`)) {
        this.$el.querySelector(`#${ref}`).setAttribute("src", "")
      }
      // $(`#${ref}`).attr("src", "")
      if (typeof index !== "undefined") {
        this.product.other_image_ids.splice(index, 1)
      }
      if (imageId) {
        this.product.resourcesToBeRemoved.push({ type: "image", id: imageId })
      }
    },
    filesChange (fieldName, fileList, event) {
      // handle file changes
      if (!fileList.length) return
      let reader = new FileReader()
      this.product[fieldName] = fileList
      if (fieldName === "primary_image_id") {
        reader.onload = (e) => {
          this.$el.querySelector(`#${fieldName}`).setAttribute("src", e.target.result)
          // $(`#${fieldName}`).attr("src", e.target.result)
        }

        reader.readAsDataURL(fileList[0])
        this.primary_image_filename = fileList[0].name
      }
      else if (fieldName === "other_images") {
        let attr = {
          isNew: true,
          image_filename: fileList[0].name,
          image_file: fileList
        }
        this.product.other_image_ids.push(attr)

        let index = this.product.other_image_ids.length - 1

        reader.onload = (e) => {
          this.$el.querySelector(`#${fieldName}${index}`).setAttribute("src", e.target.result)
          // $(`#${fieldName}${index}`).attr("src", e.target.result)
        }

        reader.readAsDataURL(fileList[0])
      }
      else if (fieldName === "travel_insurance_file_id") {
        this.product.travel_insurance_file_name = fileList[0].name
        this.product.travel_insurance_file_id = fileList
      }
    },
    clickPD (type, category, item, index) {
      let pdSavedData = this.product[`${category}_purchase_discount`]
      this.$refs.pdDialog.open(type, category, item, index, pdSavedData)
    },
    addPD (category, props, index) {
      let oriArray = this.product[`${category}_purchase_discount`]
      oriArray.push(props)
      this.product[`${category}_purchase_discount`] = _.sortBy(oriArray, `${category}_purchase_unit`).reverse()
    },
    clickTG (type, item, index) {
      this.$refs.tgDialog.open(type, item, index)
    },
    addTG (props, index) {
      this.product.tour_guide.push(props)
    },
    removeItem (refName, index) {
      this.product[refName].splice(index, 1)
    },
    clickItinerary (type, item, index) {
      this.$refs.itiDialog.open(type, item, index)
    },
    addItinerary (item) {
      this.product.itinerary.push(item)
    },
    editItinerary (item, index) {
      let iti = [...this.product.itinerary]
      iti[index] = { ...item }
      this.product.itinerary = [...iti]
    },
    deleteItineraryEntry (item, index) {
      this.$root.$confirm("Delete", "Are you sure?", { color: "red" }).then((confirm) => {
        if (confirm) {
          this.product.itinerary.splice(index, 1)
          this.$store.dispatch("setupSnackbar", {
            show: true,
            text: "Itinerary deleted",
            type: "success"
          })
        }
      })
    }
  },
  validations: function () {
    let validationProps = {
      product: {
        name: { required },
        sku: { required },
        inventory: { required },
        location_to_be_display: { required },
        adult_selling_price: { required },
        kid_selling_price: { required }
      }
    }

    return validationProps
  }

}

</script>

<style>
</style>
