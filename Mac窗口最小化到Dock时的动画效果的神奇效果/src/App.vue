<template>
  <div id="app">
    <Btns/>
    <World/>
  </div>
</template>

<script>
import xEmiiter from "xemitterjs";
import Btns from "./components/Btns";
import World from "./components/World";

export default {
  name: "App",
  components: {
    Btns,
    World
  },
  methods: {
    click: function(type) {
      xEmiiter.emit("MENU_CLICK", type);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.logo {
  width: 60px;
  position: absolute;
  z-index: 999;
  left: 30px;
  top: 30px;
  opacity: 0.7;
}
</style>
