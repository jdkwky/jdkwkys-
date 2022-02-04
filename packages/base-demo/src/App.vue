<template>
  <div id="app">
    <button @click="onVueClick">vue</button>
    <button @click="onReactClick">react</button>
    <router-view></router-view>
    <div id="slave"> </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  methods: {
    onVueClick() {
      this.$router.push({ path: "/vue" });
    },
    onReactClick() {
      this.$router.push({ path: "/react" });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
