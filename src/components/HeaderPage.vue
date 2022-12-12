<template>
    <div>
        <v-app-bar color="#E53935" height="100px" dark>
            <div>
                <router-link to="/" class="text-decoration-none">
                <h1 class="white--text text-decoration-none">
                    <v-icon large>mdi-book-multiple</v-icon>BookStore
                </h1>
                </router-link>
            </div>

            <v-spacer></v-spacer>
            <v-text-field v-if="(this.$route.name != 'CartPage')"   Clearable @click:append="searchBook(searchKey)" v-model="searchKey" append-icon="mdi-magnify" outlined placeholder="Search by book name..." color="#ffffff" class="mt-7"/>
            <v-spacer></v-spacer>

            <template>
                <div class="text-center" >
                    <v-menu offset-y >
                        <template v-slot:activator="{ on, attrs }" >
                            <v-btn plain v-bind="attrs" v-on="on" v-if="(email!=undefined)" >
                                Hello, {{user.firstName}}&nbsp;<v-icon>mdi-arrow-down-drop-circle-outline</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="(item, index) in items" :key="index">
                                <v-list-item-title class="row-pointer" @click="item.method">{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </template>

            <router-link to="/login" class="text-decoration-none">
                <v-btn v-if="(email == undefined)" class="white--text" color="#E53935" plain> Login &nbsp;
                <v-icon large>mdi-account-circle-outline</v-icon>
            </v-btn>
            </router-link>

            <router-link to="/cart" class="text-decoration-none">
                <v-btn  icon v-if="(this.$route.name != 'CartPage')">
                <v-badge color="red" :content="cart.length" :value="cart.length > 0">
                    <v-icon large>&nbsp;mdi-cart-variant</v-icon>
                </v-badge>
            </v-btn>
            </router-link>
            <v-btn icon>
        <v-icon></v-icon>
      </v-btn>
        </v-app-bar>
       </div>       
</template>
  
<script>
import UserService from "../service/UserService";
import CartService from "../service/CartService";
import BookService from '@/service/BookService';
export default {
    name: "HeaderPage",
   
    data() {
        return {
            searchKey: "",
            cart: [],
            user: [],
            searchedBooks: [],
            email: localStorage.storedData,
            items: [
                { title: "Change Password", method: this.changePassword },
                { title: "Edit Account", method: this.edit },
                { title: "My Orders", method: this.myOrders },
                { title: "Logout", method: this.logout },
            ],
        };
    },
    methods: {
        edit() {
            this.$router.push({ name: "EditForm", params: { email: this.email } });
        },
        myOrders() {
            this.$router.replace({ name: "myorders" });
        },
        changePassword() {
            this.$router.replace({ name: "ChangePassword" });
        },
        logout() {
            localStorage.clear();
            console.log(localStorage.storedData);
            window.location.reload();
            this.$router.push({ name: "HomePage" });
        },
        getCart() {
            CartService.getAllCart().then((response) => {
                this.cart = response.data.data;
            });
        },
        getUser() {
            UserService.getUserby(this.email).then((response) => {
                console.log(response);
                this.user = response.data.data;
            });
        },
        searchBook(key) {
            BookService.search(key).then((response) => {
                this.searchedBooks = response.data.data;
                console.log(this.searchedBooks)
                localStorage.setItem('searchedBooks', JSON.stringify(this.searchedBooks));
                location.reload();
            });
        },
    },
    created() {
        this.email = localStorage.storedData;
        this.getUser();
        this.getCart();
    },
}
</script>

<style lang="scss" scoped>
.row-pointer {
  cursor: pointer;
}
</style>