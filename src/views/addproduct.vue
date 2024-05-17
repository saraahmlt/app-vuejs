<script setup>
import TheTitle from "@/components/partials/Titre.vue";
import FormProductCreate from '@/components/partials/addproductform.vue';
</script>

<template>
  <section class="product__create">
    <TheTitle msg="Créer Produit" />

    <FormProductCreate />
  </section>
</template>

<style>
section.product__create {
}
</style>
