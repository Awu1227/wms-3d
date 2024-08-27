<script setup>
import { ref,watch,onMounted } from "vue";
import AreaEdit from "./src/components/AreaEdit.vue";
import Area from "./src/Experience/World/Area.js";
// 导出edit图标
import { Edit, Delete } from "@element-plus/icons-vue";
import {  generateShelfPositions } from "./src/utils/wmsUtils.js";

import * as THREE from 'three'

const isShowDrawer = ref(false)
const dialogTableVisible = ref(false)

const clickHandler = () => {
  console.log('experience',experience,);
  // 如果仓库数量等于4提示库区已满
  if (tableData.value.length >= 5) {
    ElMessage({
      message: '库区已满，请新建仓库',
      type: 'warning',
    })
    return
  }
  tableData.value.push({
    id: Math.random(),
    name: '库区' + THREE.MathUtils.generateUUID().slice(0,5),
    shelfList:[
      {
        shelfId: Math.random(),
        name: '货架'+THREE.MathUtils.generateUUID().slice(0,5),
        storageUnits:generateShelfPositions(4,2)
      },
      {
        shelfId: Math.random(),
        name: '货架'+THREE.MathUtils.generateUUID().slice(0,5),
        storageUnits:generateShelfPositions(4,2)
      },
      {
        shelfId: Math.random(),
        name: '货架'+THREE.MathUtils.generateUUID().slice(0,5),
        storageUnits:generateShelfPositions(4,2)
      },
    ]
  })
}

const handleEdit = (index, row) => {
  console.log(index, row)
  currentAreaData.value = row
  dialogTableVisible.value = true
}
const handleDelete = (index, row) => {
    tableData.value = tableData.value.filter(item => item.id !== row.id)
}

const handleAreaDeleteEvent = (index, row)  => {
      // 处理从子组件发出的删除事件
      console.log('Deleted item index and data:', index, row);
      // 这里可以执行进一步的逻辑，比如更新数据或显示提示信息
      // 将currentAreaData中对应的货架删除，并更新tableData

      tableData.value = tableData.value.map(item => {
        if (item.id === currentAreaData.value.id) {
          item.shelfList = item.shelfList.filter(shelf => shelf.shelfId !== row.shelfId)
        }
        return item
      })
      console.log('tableData', tableData.value);

    }

const handleUpdateStorageUnits = (shelf) => {
  tableData.value = tableData.value.map(item => {
    if (item.id === currentAreaData.value.id) {
      item.shelfList = item.shelfList.map(shelfItem => {
        if (shelfItem.shelfId === shelf.shelfId) {
          shelfItem.storageUnits = shelf.storageUnits
        }
        return shelfItem
      })
    }
    return item
  })
  console.log('tableDataaaaaaaaaaaaaaaaaa',tableData.value);


}

const tableData = ref([
  {
    id: Math.random(),
    name: '库区'+THREE.MathUtils.generateUUID().slice(0,5),
    shelfList:[
      {
        shelfId: Math.random(),
        name: '货架'+THREE.MathUtils.generateUUID().slice(0,5),
        storageUnits:generateShelfPositions(4,2)
      },
      {
        shelfId: Math.random(),
        name: '货架'+THREE.MathUtils.generateUUID().slice(0,5),
        storageUnits:generateShelfPositions(4,2)
      },
      {
        shelfId: Math.random(),
        name: '货架'+THREE.MathUtils.generateUUID().slice(0,5),
        storageUnits:generateShelfPositions(4,2)
      },
    ]
  },
])
const currentAreaData = ref({})

onMounted(() => {
  experience.emitter.on('showDrawer',(arg) => {
  if (arg.isShow) {
    isShowDrawer.value = true
  } else {
    isShowDrawer.value = !isShowDrawer.value

  }
})

})
// vue3监听tableData的变化
watch(tableData, (newValue, oldValue) => {

  // 清空场景中的仓库并重新渲染
  experience.world.areas.forEach((area) => {
    area.destroy()
  });
  experience.world.areas = [];
  tableData.value.forEach((item,index) => {
    experience.world.areas.push(new Area({
    x:-98 + index * 50,
    z:-5,
    width: 46,
    height: 28,
    name: item.name,
    shelfList: item.shelfList
  }))
  })
}, { deep: true })

experience.resources.on("ready", () => {
      tableData.value.forEach((item,index) => {
        experience.world.areas.push(new Area({
        x:-98 + index * 50,
        z:-5,
        width: 46,
        height: 28,
        name: item.name,
        id: item.id,
        shelfList:item.shelfList
      }))
      })
})
</script>

<template>
  <el-drawer v-model="isShowDrawer" title="编辑仓库" direction="rtl" size="40%">
    <div>
      <el-button plain color="#626aef" :icon="Plus" @click="clickHandler"
        >新增库区</el-button
      >
      <el-divider border-style="dashed" />

      <el-table :data="tableData" style="width: 100%" border row-key="id">
        <el-table-column label="库区名称" width="180">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
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
              @click="handleDelete(scope.$index, scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-drawer>

  <AreaEdit
    v-model="dialogTableVisible"
    :areaData="currentAreaData"
    @delete-event="handleAreaDeleteEvent"
    @update-storageUnits="handleUpdateStorageUnits"
  />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
