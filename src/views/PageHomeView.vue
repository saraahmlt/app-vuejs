<script setup>
import TheTitle from "@/components/partials/Titre.vue";
import WelcomeMsg from "@/components/partials/MessWelcome.vue";
import ProductsList from "@/components/partials/ListeProducts.vue";

import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
authStore.initState();

</script>

<template>
  <main>
    <section class="home">
      <TheTitle v-if="!authStore.isAuthenticated" msg="Home" />
      <WelcomeMsg v-if="!authStore.isAuthenticated" icon="Superrr!!"/>

      <TheTitle v-if="authStore.isAuthenticated" msg="Produits & Stock" />
      <ProductsList v-if="authStore.isAuthenticated"/>
    </section>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  section.home {
  }
}
</style>