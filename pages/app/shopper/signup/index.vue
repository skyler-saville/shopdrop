<template>
  <div class='container'>
<h1 class="shop-blue--text text-xs-right">Shopper Registration</h1>
<v-container grid-list-lg>
  <v-layout row wrap>
    <v-flex sm6>
    <div style="color: green; padding: 3em; background-color: turquoise;" v-html="content"></div>
    </v-flex>
    <v-flex sm6>
    <!-- shopper registration -->
     <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="first"
      :rules="fnameRules"
      label="First"
      required
    ></v-text-field>
    <v-text-field
      v-model="last"
      :rules="lnameRules"
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
    <v-text-field
      type="password"
      v-model="cpassword"
      :rules="cpasswordRules"
      label="Confirm Password"
      required
    ></v-text-field>
    
    <div id="matched" v-show="cpassword.length >= 8 && password.length >= 8">
      <span class="shop-green--text" v-if="(password && password.length >= 8) && (cpassword === password)" >Passwords Match</span>
      <span class="red--text" v-else>Passwords Do Not Match</span>
    </div>
    
    <v-text-field
      v-model="phone"
      :rules="phoneRules"
      label="Phone Number"
      required
    ></v-text-field>
    <v-text-field
      v-model="street"
      :rules="streetRules"
      label="Street Address"
      required
    ></v-text-field>
    <v-text-field
      v-model="apt"
      label="Apt/Unit"
    ></v-text-field>
    <v-text-field
      v-model="city"
      :rules="cityRules"
      label="City"
      required
    ></v-text-field>


    <!-- <v-select
      v-model="state"
      :items="states"
      label="State"
      required
    ></v-select> -->
    <div id='state-select-container' class="v-text-field__slot">
      <label id='state-lable' class="v-lable">State</label>
      <select id="state" v-model="state">
        <option disabled value="">Please Select One</option>
        <option 
          class="select-dropdown-item" 
          v-for="option in states" 
          :value="option.state"
          :key="option.state"
        >
        {{ option.lable }}
        </option>
      </select>
    </div>
      
    <v-text-field
      v-model="zip"
      :rules="zipRules"
      label="Zip Code"
      required
    ></v-text-field>
    <v-textarea
      v-model="instructions"
      :counter="50"
      label="Instructions"
      :rules="instructionRules"
      placeholder="n/a"
    ></v-textarea>
    
  <div>
    <v-dialog
      v-model="dialog"
      width="100%"
    >
      <v-btn
        @click="getPolicy"
        id="terms-button"
        slot="activator"
        color="shop-blue"
        dark
      >
        View Documents
      </v-btn>

      <v-card
        color='shop-green'
      >
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Terms &amp; Conditions | Privacy Policy
        </v-card-title>

        <v-card-text>
          {{ termsAndConditions }}
          <br><br>
          <content v-html="policy"></content>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn

            flat
            @click="dialog = false"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>
  </div>
    


    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
    </v-flex>
  </v-layout>
</v-container>

</div>
</template>

<script>
import axios from 'axios'

  export default {
    transition: 'test',
    data: () => ({
      dialog: false,
      content: 'Please fill in the information to create your ShopDrop account!',
      termsAndConditions: "A Privacy Policy agreement is required by law if you collect or use any personal information from your users, e.g. email addresses, first and last names etc.", 
      policy: '',
      states: [
          {state:'AL', lable: 'Alabama'}, {state:'AK', lable: 'Alaska'}, {state:'AZ', lable: 'Arizona'}, 
          {state:'AR', lable: 'Arkansas'}, {state:'CA', lable: 'California'}, {state:'CO', lable: 'Colorado'}, 
          {state:'CT', lable: 'Connecticut'}, {state:'DC', lable: 'District Of Columbia'}, {state:'DE', lable: 'Delaware'}, 
          {state:'FL', lable: 'Florida'}, {state:'GA', lable: 'Georgia'}, {state:'HI', lable: 'Hawaii'}, 
          {state:'ID', lable: 'Idaho'}, {state:'IL', lable: 'Illinois'}, {state:'IN', lable: 'Indiana'}, 
          {state:'IA', lable: 'Iowa'}, {state:'KS', lable: 'Kansas'}, {state:'KY', lable: 'Kentucky'}, 
          {state:'LA', lable: 'Louisiana'}, {state:'ME', lable: 'Maine'}, {state:'MD', lable: 'Maryland'}, 
          {state:'MA', lable: 'Massachusetts'}, {state:'MI', lable: 'Michigan'}, {state:'MN', lable: 'Minnesota'}, 
          {state:'MS', lable: 'Mississippi'}, {state:'MO', lable: 'Missouri'}, {state:'MT', lable: 'Montana'}, 
          {state:'NE', lable: 'Nebraska'}, {state:'NV', lable: 'Nevada'}, {state:'NH', lable: 'New Hampshire'},
          {state:'NJ', lable: 'New Jersey'}, {state:'NM', lable: 'New Mexico'}, {state:'NY', lable: 'New York'}, 
          {state:'NC', lable: 'North Carolina'}, {state:'ND', lable: 'North Dakota'}, {state:'OH', lable: 'Ohio'}, 
          {state:'OK', lable: 'Oklahoma'}, {state:'OR', lable: 'Oregon'}, {state:'PA', lable: 'Pennsylvania'}, 
          {state:'RI', lable: 'Rhode Island'}, {state:'SC', lable: 'South Carolina'}, {state:'SD', lable: 'South Dakota'}, 
          {state:'TN', lable: 'Tennessee'}, {state:'TX', lable: 'Texas'}, {state:'UT', lable: 'Utah'}, 
          {state:'VT', lable: 'Vermont'}, {state:'VA', lable: 'Virginia'}, {state:'WA', lable: 'Washington'}, 
          {state:'WV', lable: 'West Virginia'}, {state:'WI', lable: 'Wisconsin'}, {state:'WY', lable: 'Wyoming'}
      ],
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
      fnameRules: [
        v => !!v || 'First Name is required',
        v => /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(v) || 'Name is not valid'
      ],
      last: '',
      lnameRules: [
        v => !!v || 'Last Name is required',
        v => /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(v) || 'Name is not valid'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\.+.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        // figure this out later
        v => !!v || 'Password is required',
        v => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\* ])(?=.{8,30})/.test(v) || 
        '8 characters or longer, containing 1 uppercase and 1 symbol'
      ],
      cpassword: '',
      cpasswordRules: [
        // figure this out later
        v => !!v || 'Confirm Password is required',
        v => (this.cpassword === this.password) || "Your Passwords Don't Match"
      ],
      phone: '',
      phoneRules: [
        v => !!v || 'Phone number is required',
        v => /^(\([0-9]{3}\) |\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$|[0-9]{10}$/.test(v) || 'Accepted Formats: (435)555-1212 or 435-555-1212'
      ],
      street: '',
      streetRules: [
        v => !!v || 'Street address is required',
        v => (v && v.length <= 30) || 'Street address must be less than 30 characters'
      ],
      apt: '',
      city: '',
      cityRules: [
        v => !!v || 'City is required',
        v => /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test || 'City must be less than 20 characters'
      ],
      state: '',
      zip: '',
      zipRules: [
        v => !!v || 'Zip code is required',
        v => /^\d{5}$/.test(v) || 'Zip must be 5 characters'
      ],
      instructions: '',
      instructionRules: [
        v => (v && v.length < 50) || '50 characters or less'
      ],
      checkbox: false
    }),

    methods: {
      getPolicy () {
        console.log('getting privacy policy')
        fetch('/api/content/privacy_policy', {
          method: 'GET',
          headers: {
            'Content-type' : 'application/json'
          }
        })
          .then(function(res) {
            return res.json()
          })
            .then((value) => {
              this.policy = value.content
            })
      },
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/api/users/shoppers', {
            name: {
              first: this.first,
              last: this.last
            },
            email: this.email,
            password: this.password,
            phone: this.phone,
            address: {
              street: this.street,
              apt: this.apt,
              city: this.city,
              state: this.state,
              zip: this.zip,
              instructions: this.instructions
            }
          })
            .then(function(res) {
              console.log(res)
            })
            .catch(function(err) {
              console.error(err)
            })
        }
        this.clear()
        router.push({ name: 'app/about'})
      },
      clear () {
        this.first = ''
        this.last = ''
        this.email = ''
        this.password = ''
        this.cpassword = ''
        this.phone = ''
        this.street = ''
        this.apt = ''
        this.city = ''
        this.state = ''
        this.zip = ''
        this.instructions = ''
        console.log("form cleared", this.email)
        // this.$refs.form.reset()
      }
    }
  }
</script>

<style scoped>
#state {
  width: 50%;
  position: relative;
  right: 2.9em;
  margin-top: 2.7em
}
#state-lable {
  font-size: larger;
  margin-top: 1em
}
#state-select-container {
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  margin-bottom: 3em;
  margin-top: .2em;
}
option.select-dropdown-item {
  font-size: 10pt;
}
select:focus {
  outline: none;
}
#terms-button {
  color: white;
}
div#matched {
  margin-bottom: 2em;
}
.v-messages__message {
    color: red;
}
</style>
