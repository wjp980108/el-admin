<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { createMenu, editMenu, menuList } from '@/api/system/menuManage';
import { Regex } from '@/constants';
import { useReset } from '@/hooks';

defineOptions({ name: 'MenuForm' });
const props = defineProps<{
  rowData?: Menu.Data
}>();
const emits = defineEmits(['submit']);
const show = defineModel({
  type: Boolean,
  required: true,
});

const [state, reset] = useReset<Menu.Data>({
  parentId: '',
  title: '',
  name: '',
  path: '',
  type: 1,
  icon: '',
  componentPath: '',
  sort: 0,
  isEnabled: true,
  isKeepAlive: false,
  isHide: false,
  activeMenu: '',
  requestPath: '',
});

const title = ref('新增菜单');

watch(show, async (val) => {
  if (val) {
    await getMenuList();

    if (props.rowData) {
      title.value = '编辑菜单';
      Object.assign(state.value, props.rowData);
      state.value.parentId = props.rowData!.parentId !== '0' ? props.rowData!.parentId : '';
    }
    else {
      title.value = '新增菜单';
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
  title: {
    required: true,
    message: '请输入菜单名称',
    trigger: 'blur',
  },
  name: {
    required: true,
    validator(rule, value: string, callback: any) {
      if (!value)
        return callback('请输入路由名称');

      if (!new RegExp(Regex.RouteName).test(value))
        return callback('名称不规范，必须是大驼峰写法');

      return callback();
    },
    trigger: 'blur',
  },
  path: {
    required: true,
    validator(rule, value: string, callback: any) {
      if (!value)
        return callback('请输入路由路径');

      if (!new RegExp(Regex.RoutePath).test(value))
        return callback('路径不规范');

      return callback();
    },
    trigger: 'blur',
  },
  componentPath: {
    required: true,
    validator(rule, value: string, callback: any) {
      if (!value)
        return callback('请输入组件路径');

      if (!new RegExp(Regex.ComponentsPath).test(value))
        return callback('路径不规范');

      return callback();
    },
    trigger: 'blur',
  },
  requestPath: {
    required: true,
    message: '请输入接口地址',
    trigger: 'blur',
  },
};

function handleSubmit() {
  formRef.value!.validate(async (valid) => {
    if (state.value.parentId === state.value.id) {
      ElMessage.error('父级目录不能选择当前目录');
      return;
    }

    if (!valid)
      return;

    if (props.rowData) {
      await editMenu(state.value);
    }
    else {
      await createMenu(state.value);
    }
    handleCancel();
    emits('submit');
  });
}

function handleCancel() {
  show.value = false;
  reset();
}
</script>

<template>
  <app-popup v-model="show" :title destroy-on-close @confirm="handleSubmit" @cancel="handleCancel">
    <el-form ref="formRef" :rules="rules" :model="state" label-width="auto">
      <el-form-item>
        <template #label>
          <div class="flex-y-center">
            父级目录
            <app-help-info message="不填写则为顶层菜单" />
          </div>
        </template>
        <el-tree-select
          v-model="state.parentId" :data="menus" :props="{ label: 'title' }" node-key="id"
          placeholder="请选择父级目录" clearable check-strictly
        />
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-radio-group v-model="state.type" name="type">
          <el-radio :value="1" label="目录" />
          <el-radio :value="2" label="菜单" />
          <el-radio :value="3" label="按钮" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="state.title" placeholder="请输入菜单名称" clearable />
      </el-form-item>
      <template v-if="state.type !== 3">
        <el-form-item label="菜单图标">
          <app-select-icon v-model="state.icon" placeholder="请选择菜单图标" />
        </el-form-item>
        <el-form-item label="路由名称" prop="name">
          <el-input v-model="state.name" placeholder="请输入路由名称" clearable />
        </el-form-item>
      </template>
      <el-form-item prop="path">
        <template #label>
          <div class="flex-y-center">
            路由路径
            <app-help-info message="如：/***/***" />
          </div>
        </template>
        <el-input v-model="state.path" placeholder="请输入路由路径" clearable />
      </el-form-item>
      <el-form-item v-if="state.type !== 1" prop="requestPath">
        <template #label>
          <div class="flex-y-center">
            接口路径
            <app-help-info message="权限接口地址路径" />
          </div>
        </template>
        <el-input v-model="state.requestPath" placeholder="请输入接口路径" clearable />
      </el-form-item>
      <el-form-item v-if="state.type === 2" prop="componentPath">
        <template #label>
          <div class="flex-y-center">
            组件路径
            <app-help-info message="如：/***/***/***.vue" />
          </div>
        </template>
        <el-input v-model="state.componentPath" placeholder="请输入组件路径" clearable />
      </el-form-item>
      <el-form-item v-if="state.type !== 3">
        <template #label>
          <div class="flex-y-center">
            菜单排序
            <app-help-info message="数字越小，同级中越靠前" />
          </div>
        </template>
        <el-input-number v-model="state.sort" placeholder="请输入菜单排序" :min="0" :max="9999" />
      </el-form-item>
      <div class="flex items-center">
        <template v-if="state.type !== 3">
          <el-form-item label="菜单状态">
            <el-switch v-model="state.isEnabled" />
          </el-form-item>
          <el-form-item v-if="state.type === 2" label="页面缓存">
            <el-switch v-model="state.isKeepAlive" />
          </el-form-item>
        </template>
        <el-form-item label="隐藏菜单">
          <el-switch v-model="state.isHide" @change="state.activeMenu = ''" />
        </el-form-item>
      </div>
      <el-form-item v-if="state.type === 2 && state.isHide" span="2">
        <template #label>
          <div class="flex-y-center">
            高亮菜单
            <app-help-info message="当前路由不在左侧菜单显示，但需要高亮某个菜单" />
          </div>
        </template>
        <el-input v-model="state.activeMenu" placeholder="请输入高亮菜单" clearable />
      </el-form-item>
    </el-form>
  </app-popup>
</template>
