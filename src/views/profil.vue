<script setup>
import TheTitle from "@/components/partials/Titre.vue";
import FormProfile from '@/components/partials/profilform.vue';
</script>

<template>
  <section class="profile">
    <TheTitle msg="Profile" />

    <FormProfile />
  </section>
</template>

<style>
section.profile {
}
</style>