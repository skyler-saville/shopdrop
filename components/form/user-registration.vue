<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="first"
      :rules="nameRules"
      label="First"
      required
    ></v-text-field>
    <v-text-field
      v-model="last"
      :rules="nameRules"
      label="Last Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      type="password"
      v-model="password"
      :rules="passwordRules"
      label="Password"
      required
    ></v-text-field>
    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      valid: true,
      /**
       * name.first
       * name.last
       * email
       * password
       * phone
       * address.street
       * address.apt
       * address.city
       * address.zip
       * address.instructions
       */
      first: '',
      nameRules: [
        v => !!v || 'First Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      last: '',
      nameRules: [
        v => !!v || 'Last Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /[a-z]+[A-Z]+[0-9]+[!@#\$%\^&]+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        // figure this out later
        v => !!v || 'Password is required',
        v => /.+@.+/.test || 'Password must be less than 10 characters'
      ],
      street: '',
      streetRules: [
        v => !!v || 'Street address is required',
        v => (v && v.length <= 30) || 'Street address must be less than 30 characters'
      ],
      apt: '',
      aptRules: [
        v => !!v || 'Last Name is required',
        v => (v && v.length <= 5) || 'Name must be less than 5 characters'
      ],
      city: '',
      cityRules: [
        v => !!v || 'City is required',
        v => (v && v.length <= 20) || 'City must be less than 20 characters'
      ],
      state: '',
      stateRules: [
        v => !!v || 'State is required',
        v => (v && v.length === 2) || 'Name must be 2 characters long'
      ],
      zip: '',
      zipRules: [
        v => !!v || 'Zip code is required',
        v => (v && v.length === 5) || 'Zip must be 5 characters'
      ],
      instructions: '',
      
      checkbox: false
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/api/submit', {
            name: this.name,
            email: this.email,
            select: this.select,
            checkbox: this.checkbox
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>