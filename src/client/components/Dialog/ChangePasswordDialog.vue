<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.mdAndDown"
    v-model="isShow"
    scrollable
    max-width="700px"
    @keydown.esc="close()">
    <v-card>
      <v-card-title
        class="headline primary"
        primary-title
      >
        Change Password
        <v-spacer/>
        <v-btn
          class="white--text"
          icon
          @click="close()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model.trim="currentPass"
                :error-messages="$helpers.checkError('currentPass', validationProps, $v, 'Current Password')"
                label="Current Password"
                name="currentPass"
                type="password"
                @input="$v.currentPass.$touch()"
              />
              <v-text-field
                v-model.trim="newPass"
                :error-messages="$helpers.checkError('newPass', validationProps, $v, 'New Password')"
                label="New Password"
                name="newPass"
                type="password"
                @input="$v.newPass.$touch(); $v.confirmNewPass.$touch()"
              />
              <v-text-field
                v-model.trim="confirmNewPass"
                :error-messages="$helpers.checkError('confirmNewPass', validationProps, $v, 'Confirm New Password')"
                label="Confirm New Password"
                name="confirmNewPass"
                type="password"
                @input="$v.confirmNewPass.$touch()"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          :loading="isLoading"
          color="primary"
          flat
          @click.native="save()">Save</v-btn>
        <v-btn
          color="grey"
          flat
          @click.native="close()">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validationMixin } from "vuelidate"
import { required, sameAs, minLength } from "vuelidate/lib/validators"
// import { Accounts } from "meteor/accounts-base"
import { mapActions } from "vuex"
export default {
  mixins: [ validationMixin ],
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentPass: "",
      newPass: "",
      confirmNewPass: "",
      validationProps: {
        currentPass: { required },
        newPass: {
          required,
          minLength: minLength(6)
        },
        confirmNewPass: {
          required,
          sameAsPassword: sameAs("newPass")
        }
      },
      isLoading: false
    }
  },
  computed: {
    isShow: {
      // https://stackoverflow.com/questions/48035310/open-a-vuetify-dialog-from-a-component-template-in-vuejs?rq=1
      get () {
        return this.show
      },
      set (value) {
        if (!value) {
          this.close()
        }
      }
    }
  },
  methods: {
    ...mapActions("layout", [
      "setupSnackbar"
    ]),
    close () {
      this.$emit("close")
      this.currentPass = ""
      this.newPass = ""
      this.confirmNewPass = ""
      this.$v.$reset()
    },
    async save () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.isLoading = true
        const postData = {
          password: this.newPass,
          currentPassword: this.currentPass
        }
        try {
          await this.$axios.$post(`/api/auth/change-password`, postData)
          this.isLoading = false
          this.$store.dispatch("setupSnackbar", {
            show: true,
            text: "Password updated.",
            type: "success"
          })
        }
        catch (err) {
          this.isLoading = false
          let msg = "We are unable to update your password at the moment."
          if (err.response.status === 403) {
            msg = "Please ensure your current password is correct."
          }
          this.$store.dispatch("setupSnackbar", {
            show: true,
            text: msg,
            type: "error"
          })
        }
        // TODO: ensure user is in group backend
        // TODO: ensure user email exist
        // Accounts.changePassword(this.currentPass, this.newPass, (err, res) => {
        //   console.log(err, res)
        //   this.isLoading = false
        //   let message = "Password changed successfully"
        //   let type = "success"

        //   if (err || res == 0) {
        //     message = "Failed to change password"
        //     type = "error"
        //     if (err.reason == "Incorrect password") {
        //       message = "Password incorrect."
        //     }
        //   }
        //   else {
        //     this.close()
        //   }

        //   this.setupSnackbar({
        //     show: true,
        //     text: message,
        //     type: type
        //   })
        // })
      }
      else {
        this.$store.dispatch("setupSnackbar", {
          show: true,
          text: "Please fill in required field.",
          type: "warning"
        })
      }
    }
  },
  validations () {
    return this.validationProps
  }
}
</script>

<style>

</style>
