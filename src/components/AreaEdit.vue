<template>
  <el-dialog v-model="dialogVisible" title="库区编辑" width="800">
    <el-table :data="props.areaData.shelfList" border>
      <el-table-column property="name" label="货架名称" width="200" />
      <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row, scope)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
    </el-table>
  </el-dialog>
  <el-drawer
    v-model="drawer"
    direction='btt'
    size="50%"
    :title= "getTitle"
  >
    <el-table :data="formatStorageUnits(currentShelf.storageUnits)" border>
      <el-table-column property="layer" label="货架层数" width="200" />
      <el-table-column property="children" label="货品列表"  >
        <template #default="scope">
        <div style="display: flex; justify-content: space-around;">
          <el-tag v-for="tag in scope.row.children" :key="tag.name" closable type="success" @close="tagClose(tag.layer, tag.slot)">
      {{ tag.name }}
    </el-tag>
        </div>
      </template>
      </el-table-column>
    </el-table>
  </el-drawer>
</template>
    
<script setup lang='ts'>
import { watch, ref, onMounted, computed } from "vue";
import { formatStorageUnits } from "../utils/wmsUtils";
const drawer = ref(false)
const currentShelf = ref(null);
// define props and emits
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  areaData: Object
});
const tagClose = (layer, slot) => {
  console.log(layer, slot);
  // 更新

  currentShelf.value.storageUnits = currentShelf.value.storageUnits.filter(item => item.layer !== layer ||  item.slot !== slot );

  emits('update-storageUnits', currentShelf.value);
  ElMessage({
    message: '货品已删除',
    type: 'success',
  })
}
const getTitle = computed(() => {
  return currentShelf.value ? `货架编辑（当前货架：${currentShelf.value.name}）` : '';
})
const dialogVisible = ref(props.modelValue);

const emits = defineEmits(['update:modelValue',  'delete-event', 'update-storageUnits']);


// 监听 props.modelValue 的变化
watch(() => props.modelValue, (newValue) => {
  dialogVisible.value = newValue; // 更新 dialogVisible 的值
});

// 监听 dialogVisible 的变化，以便在 dialog 关闭时通知父组件
watch(dialogVisible, (newValue) => {
  if (!newValue) {
    emits('update:modelValue', false); // 通知父组件更新 modelValue
  }
});

const handleEdit = (index, row) => {
  console.log(index, row);
  currentShelf.value = row;
  drawer.value = true
};

const handleDelete = (index, row,scope) => {
  console.log('scope', scope);
  emits('delete-event', index, row);
};
</script>
    
<style>
    
</style>