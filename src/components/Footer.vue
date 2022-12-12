<template>
    <v-footer color="brown" class="mt-12">
        <v-col class="text-center" cols="12">
         Copyright&nbsp;<v-icon>mdi-copyright</v-icon> {{ new Date().getFullYear() }} — <strong>BookStore</strong> Private Limited. All Rights Reserved
        </v-col>
    </v-footer>
</template>

<script>
export default {
    name: "Footer",
}
</script>