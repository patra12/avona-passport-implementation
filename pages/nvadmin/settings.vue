<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row>
          <v-col outlined class="head">
            <h4 class="font-weight-light text-light">Settings</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="bg-content">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="email" :rules="emailRules" label="Company" required></v-text-field>
              <v-text-field v-model="phone" :rules="phoneRules" label="Phone" required></v-text-field>
              <v-text-field v-model="telephone" :rules="telephoneRules" label="Telephone" required></v-text-field>
              <v-text-field
                v-model="contact_email"
                :rules="contact_emailRules"
                label="Contact Email"
                required
              ></v-text-field>
              <v-text-field
                v-model="contact_phone"
                :rules="contact_phoneRules"
                label="Contact Phone"
                required
              ></v-text-field>
              <v-text-field
                v-model="contact_telephone"
                :rules="contact_telephoneRules"
                label="Contact Telephone"
                required
              ></v-text-field>
              <v-text-field
                v-model="contact_address"
                :rules="contact_addressRules"
                label="Contact Address"
                required
              ></v-text-field>
              <v-text-field
                v-model="copyrights"
                :rules="copyrightsRules"
                label="Copyrights"
                required
              ></v-text-field>
              <!-- <v-textarea
                type="text"
                v-model="map_location"
                :rules="copyrightsRules"
                label="Map Location"
                required
              ></v-textarea> -->
              <v-text-field
                v-model="homepageTitle"
                :rules="homepageTitleRules"
                label="Homepage Title"
                required
              ></v-text-field>
              <v-textarea
                type="text"
                v-model="homepageDescription"
                :rules="homepageDescriptionRules"
                label="Homepage Description"
                required
              ></v-textarea>
              <v-text-field
                v-model="dashboardTitle"
                :rules="dashboardTitleRules"
                label="Dashboard Title"
                required
              ></v-text-field>
              <v-textarea
                type="text"
                v-model="dashboardDescription"
                :rules="dashboardContentRules"
                label="Dashboard Content"
                required
              ></v-textarea>
              <p style="color:blue;">{{message}}</p>

              <v-btn class="my-5 float-right" @click="updateSettings()" large color="primary">Update</v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: "admin/defaultAdmin",
  data() {
    return {
      valid: true,
      message: "",
      email: "",
      emailRules: [v => !!v || "email is required"],
      phone: "",
      phoneRules: [v => !!v || "phone is required"],
      telephone: "",
      telephoneRules: [v => !!v || "telephone is required"],
      contact_email: "",
      contact_emailRules: [v => !!v || "contact email is required"],
      contact_phone: "",
      contact_phoneRules: [v => !!v || "contact phone is required"],
      contact_telephone: "",
      contact_telephoneRules: [v => !!v || "contact_telephone is required"],
      contact_address: "",
      contact_addressRules: [v => !!v || "Title is required"],
      copyrights: "",
      copyrightsRules: [v => !!v || "Title is required"],
      homepageTitle:"",
      homepageTitleRules:[v => !!v || "Homepage is required"],
      homepageDescription:"",
      homepageDescriptionRules:[v => !!v || "Homepage Description is required"],
      dashboardTitle:"",
      dashboardTitleRules:[v => !!v || "Dashboard title is required"],
      dashboardDescription:"",
      dashboardContentRules:[v => !!v || "Dashboard Description is required"],
    };
  },
  created() {
    this.$axios({
      method: "get",
      url: "/settingsData"
    })
      .then(res => {
        this._data.email = res.data[0].email;
        this._data.phone = res.data[0].phone;
        this._data.telephone = res.data[0].telephone;
        this._data.contact_email = res.data[0].contact_email;
        this._data.contact_phone = res.data[0].contact_phone;
        this._data.contact_telephone = res.data[0].contact_telephone;
        this._data.contact_address = res.data[0].contact_address;
        this._data.copyrights = res.data[0].copyrights;
        // this._data.map_location = res.data[0].map_location;
        this._data.homepageTitle = res.data[0].homepage_title;
        this._data.homepageDescription =res.data[0].homepage_description;
        this._data.dashboardTitle = res.data[0].dashboard_title;
        this._data.dashboardDescription = res.data[0].dashboard_description;
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  },
  methods: {
    updateSettings() {
      var setting = {
        data: {
          email: this.email,
          phone: this.phone,
          telephone: this.telephone,
          contact_email: this.contact_email,
          contact_phone: this.contact_phone,
          contact_telephone: this.contact_telephone,
          contact_address: this.contact_address,
          copyrights: this.copyrights,
          // map_location: this.map_location,
          homepage_title:this.homepageTitle,
          homepage_description:this.homepageDescription,
          dashboard_title:this.dashboardTitle,
          dashboard_description:this.dashboardDescription
        }
      };
      this.$axios({
        url: "/settingsPostData",
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        },
        data: JSON.stringify(setting)
      })
        .then(res => {
          this.message = "Data is updated successfully";
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
/* repeat */
.head {
  background-color: #60bb23;
  position: relative;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.bg-content {
  background: white;
}
h4 {
  padding: 0px 14px;
  margin-bottom: 0px;
}
.right {
  position: absolute;
  right: 35px;
  top: 10px;
  font-size: 33px;
}
/* non */
</style>
