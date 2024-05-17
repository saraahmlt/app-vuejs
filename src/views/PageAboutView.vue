<script setup>
import TheTitle from "@/components/partials/Titre.vue";
</script>

<template>
  <section class="about">
    <TheTitle msg="About" />
    <div class="container">
      <span class="page___icon">⌛️</span>
      <div class="page___content">
        <h2>Cette application parle :</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget turpis eu augue faucibus commodo. Nullam at eleifend lacus. Aliquam sit amet viverra elit. Cras egestas a magna sed fermentum. Proin vel egestas turpis, in scelerisque lectus. Morbi finibus, turpis a finibus congue, leo risus aliquam enim, at feugiat felis sapien at quam. Nunc convallis pellentesque arcu et cursus. Vivamus vestibulum efficitur velit, a volutpat purus accumsan in. Cras commodo tristique risus.</p>
        <p>Etiam tellus felis, interdum ac pharetra id, efficitur tempus nisl. Fusce ut felis porta, scelerisque magna ac, ultricies dolor. Donec et faucibus nibh, eu malesuada purus. Nulla posuere facilisis convallis. Aenean sit amet justo mi. Sed velit felis, pulvinar quis metus a, auctor sodales lacus. Nullam gravida euismod purus ac ultrices.</p>
        <p>Praesent malesuada maximus metus, gravida laoreet augue tristique eu. Pellentesque condimentum vestibulum nisl, et volutpat leo lobortis quis. Nam non sapien massa. Nulla facilisi. Etiam tempus condimentum lobortis. Sed et dolor lorem. Nam mauris ex, euismod sit amet lacus venenatis, tristique efficitur ante. Mauris tempor pulvinar nibh, at bibendum dui lobortis ut. Nam porttitor, mi eget tincidunt ultricies, nibh purus lacinia risus, vel venenatis purus ante in ex. Nam nec nisl interdum, maximus tortor hendrerit, cursus justo. Aliquam erat volutpat. Morbi a pulvinar sem. In euismod neque dapibus lacus commodo interdum. Morbi et consequat lacus, non molestie ligula.</p>
        <p>Proin mollis erat ex, quis sodales massa dapibus eget. Integer euismod erat posuere volutpat pretium. Aenean at hendrerit dui, a consectetur metus. Maecenas ut interdum urna, in malesuada elit. Sed condimentum dignissim felis, sed ultricies nunc mollis ut. Etiam at augue risus. Nunc at enim ornare, cursus sapien sed, pretium mi. Nam mattis luctus nibh at maximus. Pellentesque eu tellus mattis, iaculis risus imperdiet, euismod neque.</p>
        <p>Suspendisse hendrerit lobortis scelerisque. Phasellus a orci dui. Ut id tortor eu enim tempus condimentum nec non erat. Phasellus fermentum lectus sit amet pretium posuere. Integer non feugiat nisi. Maecenas ultricies condimentum metus et laoreet. Proin porta convallis metus sit amet molestie. Pellentesque eget consectetur est. Vestibulum nec massa vel leo egestas ornare et sed magna. Vivamus ac risus nulla.</p>
      </div>
    </div>
  </section>
</template>

<style>
section.about .page___icon{
  display: block;
  text-align: center;
  padding: 40px 0 0;
  color: white;
  font-size: 40px;
}
section.about .page___content h2{
  text-align: center;
  padding: 20px 0 40px;
}
section.about .page___content p,
section.about .page___content li{
  padding: 0 0 20px;
}
</style>