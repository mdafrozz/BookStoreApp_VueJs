<template>
    
    <v-main>
        <v-container fluid fill-height class="bookstore">
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12" width="400" >
                        <v-toolbar dark color="#E53935">
                            <v-toolbar-title class="flex text-center">BOOKSTORE APP <i class="fa fa-book" style="font-size:24px;">
                                </i>&nbsp;-&nbsp;Edit Details
                            </v-toolbar-title>
                        </v-toolbar>
                        <v-card-text align="center">
                            <form ref="form" @submit.prevent="submitForm()">
                                <v-text-field v-model="formValues.firstName" color="#E53935" label="Firstname" type="text"
                                outlined required></v-text-field>

                                <v-text-field v-model="formValues.lastName" color="#E53935" label="Lastname" type="text"
                                outlined required></v-text-field>

                                <v-textarea v-model="formValues.address" outlined class="" rows="3" label="Address" required>
                                </v-textarea>

                                <v-text-field v-model="formValues.email" color="#E53935" label="Email" type="text"
                                outlined required></v-text-field>

                                <v-text-field v-if="(this.$route.name != 'EditForm')" v-model="formValues.password" color="#E53935" label="Password" type="password" 
                                outlined required></v-text-field>

                                <v-btn type="submit" class="white--text mt-4" color="#E53935" value="Submit">Update
                                </v-btn>
                            </form>
                        </v-card-text>
                    </v-card>

                </v-flex>
            </v-layout>
        </v-container>
    </v-main>
</template>

<script>
import UserService from '@/service/UserService';
export default {
    name: "EditForm",
    data() {
        return {
            formValues:{
                firstName: '',
                lastName: "",
                address: "",
                email: "",
                password:"",
            }, 
        }
    },
    methods: {
        submitForm() {
            const data = this.formValues;

            UserService.editDetails(localStorage.storedData,data)
                .then((response) => {
                    alert("User details updated Successfully!!", response);
                    this.$router.push({ name: "HomePage"});
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error while Updating details..!");
                });
        },
        getData(email) {
            UserService.getUserby(email)
                .then((response) => {
                    console.log(response.data.data);
                    let obj = response.data.data;
                    this.setData(obj);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        setData(obj) {
            console.log(obj);
            let array = obj.startDate;
            console.log(array);
            this.formValues.id = obj.userId;
            this.formValues.firstName = obj.firstName;
            this.formValues.lastName = obj.lastName;
            this.formValues.address = obj.address;
            this.formValues.email = obj.email;
            this.formValues.password = obj.password;
        },
    },
    created() {
        this.getData(this.$route.params.email);
    },
}
</script>

<style scoped>
.bookstore {
  background: url('book1.jpg');
  background-size: cover;
  height: 100vh;
}
</style>