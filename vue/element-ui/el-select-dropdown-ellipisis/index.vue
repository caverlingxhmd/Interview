<template>
  <div id="app">
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        v-ellipse="item"
      >
        <el-tooltip
          class="item"
          effect="dark"
          :content="item.label"
          placement="right-start"
          :disabled="item.showTootip"
        >
          <div class="ellipsis">
            <span class="ellipsis-child">{{ item.label }}</span>
          </div>
        </el-tooltip>
      </el-option>
    </el-select>
    <el-select
      v-model="value"
      filterable
      placeholder="请选择"
      v-ellipse-parent="{options, key: 'value'}"
      :popper-append-to-body="false"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        <el-tooltip
          class="item"
          effect="dark"
          :content="item.label"
          placement="right-start"
          :disabled="item.showTootip"
          :real-value="item.value"
        >
          <div class="ellipsis-parent">
            <span class="ellipsis-child">{{ item.label }}</span>
          </div>
        </el-tooltip>
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label:
            "黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    };
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
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 300px;
}
</style>