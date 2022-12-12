<template>
    <div>
        <HeaderPage />
        <div>
            <form class="form1">
                <v-card max-width="100vw" outlined>
                    

                    <v-app-bar color="#ffffff" flat>
                        <div>
                            <v-card-title class="ml-10">Books ({{ BookInfo.length }} Items)
                            </v-card-title>
                        </div>
                        <v-spacer></v-spacer>

                        <template>
                            <div class="text-center">
                                <v-menu offset-y>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn v-bind="attrs" v-on="on" plain>
                                            Sort by Price &nbsp;<v-icon>mdi-arrow-down-drop-circle-outline</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item v-for="(item, index) in items" :key="index">
                                            <v-list-item-title class="row-pointer" @click="item.method">{{ item.title
                                            }}</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </div>
                        </template>
                    </v-app-bar>

                    <v-col class="mt-4" v-if="(BookInfo.length == 0)">
                    <v-img class="mx-auto" :contain="true" height="330px" width="700px"
                        src="no-results.png" />
                    <v-row class="mt-10"   justify="center" height="350px" width="700px">
                        <h1 class="grey--text" v-if="(BookInfo.length == 0)">Sorry no books found with your search keyword..!!&#128549;
                        </h1>
                    </v-row>
                    </v-col>

                    <v-container fluid class="ml-15 card">
                        <v-row>
                            <v-col v-for="BookInfos in BookInfo" :key="BookInfos.bookId">
                                <v-hover v-slot="{ hover }">
                                    <v-card max-width="200px" class="mt-5 mr-15" raised>
                                        <v-img class="mx-auto" :contain="true" :src="BookInfos.bookImage" height="150px"
                                            width="300px">
                                            <v-expand-transition>
                                                <div v-if="hover" class="grey black--text" style="height: 100%;">
                                                    {{ BookInfos.bookDescription }}
                                                </div>
                                            </v-expand-transition>
                                        </v-img>
                                        <v-card-title>{{ BookInfos.bookName }}</v-card-title>
                                        <v-card-subtitle class="ml-4 pa-0">
                                            by {{ BookInfos.authorName }}
                                        </v-card-subtitle>
                                        <v-card-title class="ml-3 pa-0"><v-icon
                                                color="black">mdi-currency-rupee&nbsp;</v-icon>
                                            {{ BookInfos.price }}.00</v-card-title>

                                        <v-row class="mt-0" align="center" justify="space-around">
                                            <v-card-actions>
                                                <v-btn class="white--text mt-0" color="#E53935"
                                                    @click="addToCart(BookInfos.bookId)">
                                                    Add To Cart&nbsp;<v-icon>mdi-cart-variant</v-icon>
                                                </v-btn>
                                            </v-card-actions>
                                        </v-row>
                                    </v-card>
                                </v-hover>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </form>
        </div>
        <div>
            <Footer />
        </div>
    </div>
</template>

<script>
import HeaderPage from './HeaderPage.vue';
import BookService from "../service/BookService";
import CartService from "../service/CartService";
import UserService from '@/service/UserService';
import Footer from './Footer.vue';

export default {
    name: "HomePage",
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
            BookInfo: [], cartData: [], user: [],
            items: [
                { title: 'Popularity', method: this.sortPopularity },
                { title: 'Low - High', method: this.sortPriceLow },
                { title: 'High - Low', method: this.sortPriceHigh },
            ],

        }
    },
    methods: {
        getBooks() {
            if (localStorage.getItem("searchedBooks") != null) {
                this.BookInfo = JSON.parse(localStorage.getItem('searchedBooks') || '[]');
            }
            else {
                BookService.getAllBooks().then((response) => {
                    this.BookInfo = response.data.data;
                });
            }
        },
        getCart() {
            CartService.getAllCart().then((response) => {
                this.cartData = response.data.data;
            });
        },
        sortPopularity() {
            localStorage.removeItem('searchedBooks');
            BookService.getAllBooks().then((response) => {
                this.BookInfo = response.data.data;
            });
        },
        sortPriceLow() {
            BookService.sortLow().then((response) => {
                this.BookInfo = response.data.data;
            });
        },
        sortPriceHigh() {
            BookService.sortHigh().then((response) => {
                this.BookInfo = response.data.data;
            });
        },
        addToCart(id) {
            console.log(id);
            if (this.user.userId == undefined) {
                this.$router.push({ name: 'LoginPage' })
            }
            else {
                this.formValues.book_id = id;
                this.formValues.user_id = this.user.userId;
                this.formValues.quantity = 1;
                const data = this.formValues;

                CartService.addCart(data)
                    .then((response) => {
                        this.cartData = response.data.data;
                        location.reload()
                        //alert("Item added to cart..!!");
                    })
                    .catch((error) => {
                        console.log(error);
                        alert("WARNING!! Error while adding the Adding Item to Cart !");
                    });
            }
        },
        getUser() {
            UserService.getUserby(localStorage.storedData).then((response) => {
                this.user = response.data.data;
            })
        },

    },
    created() {
        this.getUser();
        this.getBooks();
        this.getCart();
    },
}
</script>


<style lang="scss" scoped>
.row-pointer {
    cursor: pointer;
}
</style>