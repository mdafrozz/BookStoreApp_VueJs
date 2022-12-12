<template>
    
    <v-main>
        <v-container fluid fill-height class="bookstore">
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12" width="400" >
                        <v-toolbar dark color="#E53935">
                            <v-toolbar-title class="flex text-center">BOOKSTORE APP <i class="fa fa-book" style="font-size:24px;">
                                </i>&nbsp;-&nbsp;{{ isRegister ? stateObj.register.name : stateObj.login.name }}
                            </v-toolbar-title>
                        </v-toolbar>
                        <v-card-text align="center">
                            <form ref="form" @submit.prevent="isRegister ? register() : login()">
                                <v-text-field v-if="isRegister" v-model="formValues.firstName" color="#E53935" label="Firstname" type="text"
                                outlined required></v-text-field>

                                <v-text-field v-if="isRegister" v-model="formValues.lastName" color="#E53935" label="Lastname" type="text"
                                outlined required></v-text-field>

                                <v-textarea v-if="isRegister" v-model="formValues.address" outlined class="" rows="2" label="Address" required>
                                </v-textarea>

                                <v-text-field v-model="formValues.email" color="#E53935" label="Email" type="text"
                                outlined required></v-text-field>

                                <v-text-field v-model="formValues.password" color="#E53935" label="Password" type="password"
                                outlined required></v-text-field>

                                <div class="red--text"> {{ errorMessage }}</div>
                                <router-link to="/resetpwd" class="text-decoration-none"><h3 v-if="!isRegister" >Forgot password?</h3></router-link><br>
                                <v-btn type="submit" class="white--text mt-4" color="#E53935" value="log in" >
                                {{ isRegister ?
                                        stateObj.register.name : stateObj.login.name
                                }}</v-btn>&nbsp;&nbsp;
                                <v-btn class="white--text mt-4" color="#E53935" v-on:click="isRegister = !isRegister;">
                                    {{ toggleMessage }}
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
    name: "LoginPage",
    data() {
        return {
            formValues:{
                firstName: '',
                lastName: "",
                address: "",
                email: "",
                password: "",
            },
            isRegister: false,
            errorMessage: "",
            stateObj: {
                register: {
                    name: 'Register',
                    message: 'Aleady have an Acoount? login'
                },
                login: {
                    name: 'Login',
                    message: 'Register'
                }
            }
        };
    },
    methods: {
    
        login() {
            console.log("login")
        console.log(this.formValues)
            const obj = {}
            obj.email = this.formValues.email
            obj.password =this.formValues.password

        UserService.login(obj).then((response) => {
                console.log(response);
                const data = response.data.data;
               console.log(data);
               localStorage.storedData = data;
               this.$router.push({ name: "HomePage"});
            })
             .catch(error => {
                console.log(error);
                  alert("WARNING!! Error while login..!");
              })        
        },
        register() {
                console.log('register')
                const data=this.formValues;
                console.log(data)

        UserService.addUser(data).then((response) => {
              console.log(response);
                this.employees = response.data.data;  
                this.$refs.form.reset();
                alert("User Added successfully..!!",response)
            })
             .catch(error => {
                console.log(error);
                  alert("WARNING!! Error while adding the Added person..!");
              })  
              this.isRegister = false;     
            
        }
    },
    computed: {
        toggleMessage: function () {
            return this.isRegister ? this.stateObj.register.message : this.stateObj.login.message
        }
    }

}
</script>

<style scoped>
.bookstore {
  background: url('book1.jpg');
  background-size: cover;
  height: 100vh;
}
</style>