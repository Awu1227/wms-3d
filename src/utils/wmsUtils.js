export function generateShelfPositions(layerCount, slotCountPerLayer) {
    // 存储所有货位信息的数组
    const positions = [];
  
    // 遍历每一层
    for (let layer = 1; layer <= layerCount; layer++) {
      // 遍历每一层的每个货位
      for (let slot = 1; slot <= slotCountPerLayer; slot++) {
        // 创建货位名称
        const positionName = `Layer${layer}-Slot${slot}`;
        // 将货位信息添加到数组中
        positions.push({
          name: positionName,
          layer: layer,
          slot: slot
        });
      }
    }
  
    return positions;
  }

export const formatStorageUnits = (storageUnits) => {
  const groupedData = storageUnits.reduce((acc, item) => {
  // 检查累加器中是否已经有当前 layer 的数组
  if (!acc[item.layer]) {
    // 初始化新的层级数组
    acc[item.layer] = {
      layer: item.layer,
      children: []
    };
  }
  // 将当前对象添加到对应的 children 数组中
  acc[item.layer].children.push({
    name: item.name,
    layer: item.layer,
    slot: item.slot
  });
  return acc;
}, {});
// 转换结果为数组
 return Object.values(groupedData);
}