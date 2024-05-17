
<script setup>
import TheTitle from "@/components/partials/Titre.vue";
</script>

<template>
  <section class="error__page">
    <TheTitle msg="Oooops !" />
    <div class="container">
      <span class="page___icon">❌️</span>
      <div class="page___content">
        <h2>Error 404</h2>
        <p>Page not found. Go back to <RouterLink to="/">Home</RouterLink></p>
      </div>
    </div>
  </section>
</template>

<style>
section.error__page .page___icon{
  display: block;
  text-align: center;
  padding: 40px 0 0;
  color: white;
  font-size: 40px;
}
section.error__page .page___content h2{
  text-align: center;
  padding: 20px 0 40px;
}
section.error__page .page___content p{
  padding: 0 0 20px;
  text-align: center
}
</style>