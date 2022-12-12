<template>
    <div>
        <HeaderPage />
        <div>
            <template>
                
                <v-col class="mt-15" v-if="(CartData.length == 0 && orderData.length == 0)">
                    <v-img v-if="(CartData.length == 0)" class="mx-auto" :contain="true" height="350px" width="700px"
                        src="empty-cart-png.png" />
                    <v-row class="mt-15" justify="center">
                        <h1 class="grey--text" v-if="(CartData.length == 0)">Sorry no items in your cart..!!&#128549;
                        </h1>
                    </v-row>
                </v-col>

                <v-card class="mt-10" flat v-if="(orderData.length != 0)">
                    <v-col class="pa-0">
                        <v-img class="mx-auto" :contain="true" height="300px" width="600px" src="order-placed.png" />
                        <v-row class="mt-10" justify="center">
                            <h1 class="grey--text">Order-Placed successfully..!!&#128512;</h1>
                        </v-row>
                    </v-col>
                    <v-row class="mt-10" justify="center">
                        <h2 class="grey--text">Your orderId is #{{ orderData.orderId }} save the orderId for further
                            communication
                        </h2>
                    </v-row>
                    <v-row class="mt-10" justify="center">
                        <h3 class="">To continue your shopping please &nbsp;<a href="/">click here</a></h3>
                    </v-row>
                </v-card>
                
                <v-stepper v-if="(CartData.length != 0 && orderData.length == 0)" v-model="e1"
                    class="mx-auto mt-8 stepper" max-width="800px">
                    <v-stepper-header class="elevation-0">
                        <v-stepper-step :complete="e1 > 1" step="1">
                            My cart ({{ CartData.length }})
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :complete="e1 > 2" step="2">
                            Customer Details
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step step="3">
                            Order Summary
                        </v-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-card class="mb-12" flat height="300px" v-for="cart in CartData" :key="cart.id">
                                <div>
                                    <v-container fluid class="mt-2">
                                        <v-row>
                                            <v-col class="mt-5 pa-0">
                                                <v-img class="mx-auto" :contain="true" height="250px" width="300px"
                                                    :src="cart.book.bookImage" />
                                            </v-col>

                                            <v-col class="mt-0">
                                                <v-card-title class="">{{ cart.book.bookName }}</v-card-title>
                                                <v-card-subtitle class="">
                                                    by {{ cart.book.authorName }}
                                                </v-card-subtitle>
                                                <v-card-title class="">
                                                    <v-icon color="black">mdi-currency-rupee&nbsp;</v-icon>{{
                                                            cart.book.price * cart.quantity
                                                    }}.00
                                                </v-card-title>

                                                <v-row class="mt-2 ml-3" align="center">
                                                    <v-card-title class="pa-1"> Quantity:&nbsp;</v-card-title>
                                                    <v-btn icon small outlined :disabled="(cart.quantity == 1)"
                                                        @click="decrement(cart.cartId, cart.book.bookId, cart.user.userId, cart.quantity)">
                                                        <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                    <v-card-title class="ml-2 mr-2 pa-1">{{ cart.quantity
                                                    }}</v-card-title>
                                                    <v-btn icon small outlined
                                                        @click="increment(cart.cartId, cart.book.bookId, cart.user.userId, cart.quantity)">
                                                        <v-icon> mdi-plus</v-icon>
                                                    </v-btn>
                                                </v-row>
                                                <v-row class="ml-1" align="center">
                                                    <v-btn class="black--text pa-0 ml-3 mt-4" color="black" plain
                                                        @click="remove(cart.cartId)">
                                                        Remove<v-icon>mdi-delete-empty</v-icon>
                                                    </v-btn>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </div>
                            </v-card>
                            <v-btn color="primary" @click="e1 = 2">
                                Continue
                            </v-btn>
                        </v-stepper-content>

                        <v-stepper-content step="2" class="">
                            <v-card class="mb-12 ml-15" flat height="300px">
                                <v-col class="text-right pa-0">
                                    <v-btn text @click="edit(user.email)">Edit<v-icon>mdi-circle-edit-outline</v-icon></v-btn>
                                </v-col>
                                <v-row>
                                    <v-col>
                                        <h1 class="grey--text">Deliver to:</h1>
                                        <v-card-title class="pa-0">{{ user.firstName }}
                                            {{ user.lastName }}</v-card-title>
                                        <v-card-title class="pa-0">{{ user.email }}</v-card-title>
                                        <v-card-title class="pa-0">{{ user.address }} </v-card-title>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-btn color="primary" @click="(e1 = 3)">
                                Continue
                            </v-btn>
                            <v-btn text @click="(e1 = 1)">
                            <v-icon>mdi-arrow-left-circle-outline</v-icon>Back
                            </v-btn>
                        </v-stepper-content>

                        <v-stepper-content step="3" >
                            <v-card class="mb-2" flat height="300px" >
                                <v-simple-table class="mt-10 elevation-2" light >
                                    <template v-slot:default>
                                        <tr class="">
                                            <th class="text-center"></th>
                                            <th class="text-center">Book</th>
                                            <th class="text-center">Date</th>
                                            <th class="text-center">Name</th>
                                            <th class="text-center">Address</th>
                                            <th class="text-center">Quantity</th>
                                            <th class="text-center">Price</th>
                                            <th class="text-center">Total</th>
                                        </tr>
                                        <v-divider></v-divider>
                                        <tr v-for="(cart,index) in CartData" :key="index">
                                            <td class="text-center"><img :src="cart.book.bookImage" :contain="true"
                                                    height="100px" width="80px" /></td>
                                            <td class="text-center">{{ cart.book.bookName }}</td>
                                            <td class="text-center">{{ Date() }}</td>
                                            <td class="text-center">{{ user.firstName }}</td>
                                            <td class="text-center">{{ user.address }}</td>
                                            <td class="text-center">{{ cart.quantity }}</td>
                                            <td class="text-center">{{ cart.book.price }}</td>
                                            <td class="text-center">{{ (cart.book.price * cart.quantity) }}</td>
                                        </tr>

                                    </template>
                                </v-simple-table>
                            </v-card>
                            <v-btn color="primary" 
                                @click="placeOrder()">
                                place order
                            </v-btn>
                            <v-btn text @click="(e1 = 2)">
                                <v-icon>mdi-arrow-left-circle</v-icon>Back
                            </v-btn>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </template>
        </div>
        <Footer />
    </div>
</template>

<script>
import CartService from "../service/CartService";
import OrderService from "../service/OrderService";
import UserService from "@/service/UserService";
import HeaderPage from "../components/HeaderPage.vue"
import Footer from "./Footer.vue";
export default {
    name: "CartPage",
    components: {
        HeaderPage,
        Footer
    },
    data() {
        return {
            formValues: {
                user_id: "",
                book_id: "",
                quantity: "",
            },
            e1: 1,
            CartData: [], orderData: [], email: localStorage.storedData, user: [],

        };
    },
    methods: {
        edit(email) {
            this.$router.push({ name: 'EditForm', params: { email: email } })
        },
        increment(cartId, bookId, userId, qty) {
            console.log("increment")
            this.quantity = qty;
            this.quantity++
            this.updateQty(cartId, bookId, userId, this.quantity)
        },
        decrement(cartId, bookId, userId, qty) {
            if (qty > 1) {
                console.log("decrement")
                this.quantity = qty;
                this.quantity--
                this.updateQty(cartId, bookId, userId, this.quantity)
            }
        },
        updateQty(cartId, bookId, userId, qty) {
            this.formValues.book_id = bookId;
            this.formValues.user_id = userId;
            this.formValues.quantity = qty;
            console.log(this.formValues);
            const data = this.formValues;

            CartService.updateQuantity(cartId, data)
                .then((response) => {
                    console.log(response);
                    this.CartData = response.data.data;
                    window.location.reload()
                })
                .catch((error) => {
                    console.log(error);
                    alert("WARNING!! Error while adding the Adding Item to Cart !");
                });
        },
        remove(id) {
            console.log(id);
            CartService.deleteOrder(id).then((data) => {
                var answer = window.confirm(
                    "Do you want to remove the Item from your cart ?",
                    data
                );
                if (answer === true) {
                    alert("Item removed successfully!!");
                    window.location.reload();
                    this.getBookCart();
                } else {
                    window.location.reload();
                }
            })
                .catch((error) => {
                    console.log(error);
                    alert("Something Went Wrong!");
                });
        },
        getBookCart() {
            CartService.getAllCart().then((response) => {
                this.CartData = response.data.data;
            });
        },
        placeOrder() {
            
            OrderService.addOrder(this.user.userId).then((response) => {
                this.orderData = response.data.data;
            })
                .catch((error) => {
                    console.log(error);
                    alert("WARNING!! Error while placing Order !");
                });
            
        },
        getUser() {
            UserService.getUserby(this.email).then((response) => {
                this.user = response.data.data;
            })
        },

    },
    created() {
        this.email = localStorage.storedData
        this.getUser();
        this.getBookCart();
    },
};
</script>

<style scoped>
.stepper {
    overflow: visible;
}

table,
th,
td {
    margin: auto;
    border: 1px solid grey;
    border-collapse: collapse;
}
</style>