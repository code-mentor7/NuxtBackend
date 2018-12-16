<template>
  <div>
    <v-navigation-drawer
      :width="250"
      v-model="sideBarModel"
      clipped
      fixed
      app
      disable-route-watcher
    >
      <v-list dense>
        <v-list-tile
          :to="{name: `index___${$i18n.locale}`}"
          exact>
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group
          v-if="$helpers.userIsAwesome($auth.user)"
          value="true"
          avatar
        >
          <v-list-tile-avatar
            slot="activator"
            tile
            size="50px">
            <v-avatar >
              <span >96</span>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile slot="activator">
            <v-list-tile-title>96Travel CMS</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to="{name: `company-details___${$i18n.locale}`}">
            <v-list-tile-action>
              <v-icon>business</v-icon>
            </v-list-tile-action>
            <v-list-tile-title >Company Details</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to="{name: `landing-page___${$i18n.locale}`}">
            <v-list-tile-action>
              <v-icon>view_quilt</v-icon>
            </v-list-tile-action>
            <v-list-tile-title >Landing Page</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to="{name: `upload-hotel-data___${$i18n.locale}`}">
            <v-list-tile-action>
              <v-icon>cloud_upload</v-icon>
            </v-list-tile-action>
            <v-list-tile-title >Upload Agoda Hotel Data</v-list-tile-title>
          </v-list-tile>
        </v-list-group>
        <v-list-tile :to="{name: `products___${$i18n.locale}`}">
          <v-list-tile-action>
            <v-icon>fa fa-cubes</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ $t('product') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- <v-list-tile
          v-if="$helpers.userIsAdmin($auth.user)"
          :to="{name:'transactions'}">
          <v-list-tile-action>
            <v-icon>shopping_cart</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Transactions</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      dark
      extended
      extension-height="7"
      fixed
      clipped-left
      app
      class="blue-gradient pa-0">
      <v-toolbar-side-icon
        v-if="user"
        @click.stop="sideNav()"/>
      <v-toolbar-title class="font-weight-thin">96Travel</v-toolbar-title>
      <v-spacer/>
      <v-menu
        v-if="user"
        v-model="menu"
        :nudge-bottom="15"
        :value="false"
        :close-on-content-click="false"
        lazy
        transition="scale-transition"
        origin="top right"
        offset-y>
        <v-btn
          slot="activator"
          icon
          class="white"
          large>
          <v-avatar
            size="32px"
            tile>
            <span class="black--text">96</span>
          </v-avatar>
        </v-btn>
        <v-card>
          <v-list one-line>
            <v-list-tile avatar>
              <!-- <v-list-tile-avatar>
                  <img src="https://vuetifyjs.com/doc-images/john.jpg" alt="John">
                </v-list-tile-avatar> -->
              <v-list-tile-content>
                <v-list-tile-title>{{ user.email }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-divider/>
          <v-list>
            <v-list-tile
              v-if="$helpers.userIsAdmin($auth.user)"
              @click="addUserClick">
              <v-list-tile-content>Add User</v-list-tile-content>
            </v-list-tile>
            <v-list>
              <v-list-tile
                v-for="(item, i) in langList"
                v-if="item.value != lang.value"
                :key="i"
                :to="switchLocalePath(item.value)"
                @click="onChangeLang(item.value)"
              >
                <v-list-tile-title>
                  {{ item.name }}
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
            <v-list-tile>
              <v-list-tile-action>
                <v-switch
                  v-model="isDark"
                  color="black"/>
              </v-list-tile-action>
              <v-list-tile-title>{{ $t('dark_theme') }}</v-list-tile-title>
            </v-list-tile>
          </v-list>

          <v-divider/>

          <v-card-actions>
            <v-spacer/>
            <v-btn
              flat
              @click="changePasswordClick">{{ $t('change_password') }}</v-btn>
            <v-btn
              :loading="loggingOut"
              color="light-blue accent-2"
              flat
              @click="logout">{{ $t('logout') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
      <!-- <v-progress-linear
        v-show="isLoading"
        slot="extension"
        :indeterminate="true"
        background-color="transparent"
        color="black"
        class="ma-0 px-0 fluid"/> -->
    </v-toolbar>
    <change-password-dialog
      :show="showResetPass"
      @close="showResetPass = false"/>
    <add-user-dialog
      :show="showAddUser"
      @close="showAddUser = false"/>
  </div>
</template>

<script>
// import { Meteor } from "meteor/meteor"
import { mapState } from "vuex"
// import { Roles } from "meteor/alanning:roles"
import ChangePasswordDialog from "~/components/Dialog/ChangePasswordDialog.vue"
import AddUserDialog from "~/components/Dialog/AddUserDialog.vue"
import _ from "lodash"

export default {
  components: {
    ChangePasswordDialog,
    AddUserDialog
  },
  data: function () {
    return {
      firstLoad: true,
      isClick: false,
      lang: { value: "en", code: "English" },
      langList: [
        { id: 0, value: "en", name: "English", code: "us" },
        { id: 1, value: "zh", name: "中文", code: "cn" }
      ],
      loggingOut: false,
      menu: false,
      showAddUser: false,
      showResetPass: false,
      sideBarState: true
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    isDark: {
      get () {
        if (this.user) return this.user.dark_theme
        return true
      },
      set (val) {
        this.debouncedAction()
      }
    },
    sideBarModel: {
      get () {
        return this.sideBarState
      },
      set () {
        if (this.isClick || this.firstLoad) {
          this.firstLoad = false
          this.isClick = false
        }
        else {
          this.sideBarState = false
        }
        return this.sideBarState
      }
    }
    // ...mapGetters('layout', [
    //   'sideBar',
    // ]),
  },
  mounted () {
    console.log("### router", this.$router.options.routes)
    this.debouncedAction = _.debounce(this.updateUser, 2000)
    // let user = Meteor.user()
    // if (user) {
    //   if (typeof user.localeLang !== "undefined") {
    //     this.setLang(user.localeLang)
    //   }
    // }
  },
  i18n: {
    messages: {
      en: {
        change_password: "Change Password",
        dark_theme: "Dark Theme",
        logout: "Logout",
        product: "Products"

      },
      zh: {
        change_password: "更换密码",
        dark_theme: "暗主题",
        logout: "登出",
        product: "旅行团"
      }
    }
  },
  methods: {
    addUserClick () {
      this.menu = false
      this.showAddUser = true
    },
    changePasswordClick () {
      this.menu = false
      this.showResetPass = true
    },
    dashboard () {
      return this.$router.push({ name: `index___${this.$i18n.locale}` })
    },
    logout: function () {
      this.loggingOut = true
      this.$auth.logout()
        .then(() => {
          this.userMenu = false
          this.loggingOut = false
          this.$store.dispatch("setupSnackbar", {
            show: true,
            text: "Goodbye, have a nice day!",
            type: "success"
          })
        })
        .catch()
      // Meteor.logout((err) => {
      //   if (err) {
      //     console.log("logout no")
      //   }
      //   else {
      //     this.$router.push({ name: "signin" })
      //   }
      // })
    },
    onChangeLang (langValue) {
      this.setLang(langValue)
      // Meteor.call("updateUser", Meteor.userId(), { localeLang: this.lang.value })
    },
    products () {
      return this.$router.push({ name: "products" })
    },
    setLang (langValue) {
      this.lang = {
        value: langValue,
        code: this.$helpers.getLocaleLangCode(langValue)
      }
      // this.setLocaleLang(this.lang);
      this.$store.commit("i18n/I18N_SET_LOCALE", this.lang.value)
      this.$i18n.locale = this.lang.value
    },
    sideNav () {
      this.isClick = true
      this.sideBarState = !this.sideBarState
    },
    async updateUser () {
      console.log("updateTheme")
      await this.$axios.$put(`/api/users/${this.user._id}`, {
        dark_theme: !this.user.dark_theme,
        localeLang: this.lang.value
      })

      // Meteor.call("updateUser", Meteor.userId(), { dark_theme: this.isDarkTheme })
    }
  }
  // meteor: {
  //   userId: function () {
  //     return Meteor.userId() || false
  //   },
  //   $helpers.userIsAdmin () {
  //     return Roles.userIsInRole(Meteor.userId(), ["admin"], "backend")
  //   },
  //   email: function () {
  //     let user = Meteor.user()
  //     let email = null
  //     console.log("user in App nav", user, Meteor.userId())
  //     if (user) {
  //       console.log("nav is not undefined")
  //       email = user.emails[0].address
  //     }
  //     return email
  //   }
  // }
}
</script>

<style scoped>

</style>
