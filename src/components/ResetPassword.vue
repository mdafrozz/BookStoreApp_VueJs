<template>
    
    <v-main>
        <v-container fluid fill-height class="bookstore">
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12" width="400" >
                        <v-toolbar dark color="#E53935">
                            <v-toolbar-title class="flex text-center">BOOKSTORE APP <i class="fa fa-book" style="font-size:24px;">
                                </i>&nbsp;-&nbsp;Reset Password
                            </v-toolbar-title>
                        </v-toolbar>
                        <v-card-text align="center">
                            <form ref="form" @submit.prevent="submitForm()">
                                <v-text-field v-model="email" name="email" color="#E53935" label="Email" type="text"
                                outlined required></v-text-field>

                                <v-text-field v-model="newPassword" name="newPassword" color="#E53935" label="New Password" type="password"
                                outlined required></v-text-field>
                                <v-btn type="submit" class="white--text mt-4" color="#E53935" value="Submit">Submit
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
import UserService from "../service/UserService";

export default {
    name: "ResetPassword",
    data() {
        return {
            email: "",
            newPassword: "",     
         
        }
    },
    methods: {
        submitForm() {

            UserService.ResetPassword(this.email,this.newPassword)
                .then((response) => {
                    alert("Password reset Successfully!!", response);
                    this.$router.push({ name: "LoginPage"});
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error while changing password..!");
                });
        },
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