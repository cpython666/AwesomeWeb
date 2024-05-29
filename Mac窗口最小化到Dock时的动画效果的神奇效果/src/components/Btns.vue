<template>
  <ul class="btn-group">
    <li
      v-for="(item, index) in items"
      :key="index"
      @click="click(item)"
      :class="{ active: isActive == item }"
    >{{ item }}</li>
  </ul>
</template>

<script>
import xEmiiter from "xemitterjs";

export default {
  name: "Btns",
  data: function() {
    return {
      isActive: "Twist",
      items: ["Twist", "Noise", "Bend", "Custom"]
    };
  },

  methods: {
    click: function(type) {
      this.isActive = type;
      xEmiiter.emit("MENU_CLICK", type);
    }
  }
};
</script>

<style>
.btn-group {
  position: absolute;
  z-index: 999;
  text-align: left;
  left: 30px;
  top: 250px;
  list-style: none;
  font-size: 28px;
  color: #eee;
  margin: 0;
  padding: 0;
}

.btn-group li {
  margin-bottom: 15px;
  opacity: 0.8;
  cursor: pointer;
  padding: 3px 16px 3px 8px;
}

.btn-group li:hover {
  color: #000;
  background-color: rgba(255, 255, 255, 0.85);
}

.active {
  color: #000;
  background-color: rgba(255, 255, 255, 0.85);
}
</style>
