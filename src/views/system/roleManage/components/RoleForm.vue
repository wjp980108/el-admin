<script setup lang="ts">
import type { FormInstance, FormRules, TreeInstance } from 'element-plus';
import type { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type';
import { createRole, editRole, menuList } from '@/api/system/roleManage';
import { useReset } from '@/hooks';

defineOptions({ name: 'RoleForm' });
const props = defineProps<{
  rowData?: Role.Data
}>();
const emits = defineEmits(['submit']);
const show = defineModel({
  type: Boolean,
  required: true,
});

const [state, reset] = useReset<Role.Data>({
  name: '',
  isEnabled: true,
  remark: '',
  menuIds: [],
});

const title = ref('');
const treeRef = ref<TreeInstance>();

watch(show, async (val) => {
  if (val) {
    await getMenuList();

    if (props.rowData) {
      title.value = '编辑角色';
      Object.assign(state.value, props.rowData);
      const menuIds = props.rowData.menus!.map(item => item.id!);
      treeRef.value!.setCheckedKeys(menuIds);
    }
    else {
      title.value = '新增角色';
    }
  }
});

const menus = ref<Menu.Data[]>([]);
async function getMenuList() {
  const res = await menuList();
  menus.value = res.data;
}

const formRef = ref<FormInstance>();
const rules: FormRules = {
  name: {
    required: true,
    message: '请输入角色名称',
    trigger: 'blur',
  },
  menuIds: {
    required: true,
    validator: (rule: any, value: string, callback: any) => {
      getCheckedIds();
      if (state.value.menuIds.length <= 0) {
        return callback('请选择菜单权限');
      }
      return callback();
    },
    trigger: 'blur',
  },
};

function getCheckedIds() {
  state.value.menuIds = treeRef.value!.getCheckedKeys() as number[];
}

function handleSubmit() {
  formRef.value!.validate(async (valid) => {
    if (!valid)
      return;

    if (props.rowData) {
      await editRole(state.value);
    }
    else {
      await createRole(state.value);
    }
    handleCancel();
    emits('submit');
  });
}

function handleCancel() {
  show.value = false;
  reset();
}

function treeNodeClass(data: TreeNodeData): string {
  return data.parentId === '0' ? '' : 'penultimate-node';
}
</script>

<template>
  <app-popup v-model="show" :title destroy-on-close @confirm="handleSubmit" @cancel="handleCancel">
    <el-form ref="formRef" :rules="rules" :model="state" label-width="80">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="state.name" placeholder="请输入角色名称" clearable />
      </el-form-item>
      <el-form-item label="菜单权限" prop="menuIds">
        <el-tree
          ref="treeRef" :data="menus" :props="{ label: 'title', class: treeNodeClass }" node-key="id"
          empty-text="暂无菜单" show-checkbox highlight-current default-expand-all
        />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="state.remark" placeholder="请输入备注" clearable />
      </el-form-item>
      <el-form-item label="角色状态">
        <el-switch v-model="state.isEnabled" />
      </el-form-item>
    </el-form>
  </app-popup>
</template>

<style scoped lang="scss">
:deep(.penultimate-node) {
  .el-tree-node__children {
    padding-left: 60px;
    white-space: pre-wrap;
    line-height: 12px;

    .el-tree-node {
      display: inline-block;
    }

    .el-tree-node__content {
      padding-left: 5px !important;
      padding-right: 5px;

      .el-tree-node__expand-icon {
        display: none;
      }
    }
  }
}
</style>
