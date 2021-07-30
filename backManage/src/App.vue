<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import 'babel-polyfill'
export default {name: 'App'}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html, body{
  width: 100%;
  height: 100%;
}
#app{
  height: 100%;
  width: 100%;
}
</style>
