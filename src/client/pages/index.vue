<template>
  <v-container fluid >
    <v-layout
      justify-center
      align-center>
      <v-flex
        xs10
        offset-xs1>
        <div>
          <h1>Hello {{ user.email }}</h1>

          <v-btn @click="count()">Click me!</v-btn>
          <p/>

          <p>
            You've clicked: {{ counter }} times.
          </p>

        </div>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import { mapState } from "vuex"
export default {
  data () {
    return {
      greeting: "Hello",
      counter: 0
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  // meteor: {
  //   email: function() {
  //     let user = Meteor.user();
  //     let email = null;
  //     console.log('Home home ', user);
  //     if(user){
  //       console.log('home user is not undefined', user);
  //       email = user.emails[0].address;
  //     }
  //     return email;
  //   },
  // },
  methods: {
    count () {
      this.counter++
    }
  }
}
</script>
