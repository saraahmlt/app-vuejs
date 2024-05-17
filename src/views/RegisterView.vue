<script setup>
import TheTitle from "@/components/partials/Titre.vue";
import FormRegister from '@/components/partials/RegisterForm.vue';

import { useRouter } from 'vue-router';
const router = useRouter();

import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();

if (authStore.isAuthenticated) router.push('/');
</script>

<template>
  <section class="register">
    <TheTitle msg="Register" />

    <FormRegister />
  </section>
</template>

<style>
@media (min-width: 1024px) {
  section.register {
  }
}
</style>