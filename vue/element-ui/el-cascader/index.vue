<template>
  <el-cascader
    v-model="value"
    :props="{ expandTrigger: 'click' }"
    :options="options"
    @expand-change="handleChange"
    :popper-class="popperClass"
    clearable
  ></el-cascader>
</template>
<script>
export default {
  data() {
    return {
      isExpand: false,
      value: [],
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
            },
          ],
        },
        {
          value: "zujian",
          label: "组件",
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components",
            },
          ],
        },
      ],
    };
  },
  computed: {
    popperClass() {
      return this.isExpand ? "caver-el-cascader expand" : "caver-el-cascader";
    },
  },
  methods: {
    handleChange(value) {
      this.isExpand = !!value.length;
    },
  },
};
</script>
<style lang="less">
.el-cascader__dropdown.caver-el-cascader {
  background: transparent;
  border: none;
  border-radius: 0px;
  box-shadow: none;
  margin: 0;
  &.expand > .el-cascader-panel {
    right: 5px;
  }
  & > .el-cascader-panel {
    margin: 5px 0;
    background: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: relative;
  }
}
</style>