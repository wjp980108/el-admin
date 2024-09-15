<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { createDept, deptList, editDept } from '@/api/system/departmentManage';
import { useReset } from '@/hooks';

defineOptions({ name: 'DeptForm' });
const props = defineProps<{
  rowData?: Department.Data
}>();
const emits = defineEmits(['update:data', 'submit']);
const show = defineModel({
  type: Boolean,
  required: true,
});

const [state, reset] = useReset<Department.Data>({
  parentId: '',
  name: '',
  sort: 0,
  isEnabled: true,
});

const title = ref('新增部门');

watch(show, async (val) => {
  if (val) {
    await getDeptList();

    if (props.rowData) {
      title.value = '编辑部门';
      Object.assign(state.value, props.rowData);
      state.value.parentId = props.rowData!.parentId !== '0' ? props.rowData!.parentId : '';
    }
    else {
      title.value = '新增部门';
    }
  }
});

const departments = ref<Department.Data[]>([]);
async function getDeptList() {
  const res = await deptList();
  departments.value = res.data;
}

const formRef = ref<FormInstance>();
const rules: FormRules = {
  name: {
    required: true,
    message: '请输入部门名称',
    trigger: 'blur',
  },
};

function handleSubmit() {
  formRef.value!.validate(async (valid) => {
    if (!valid)
      return;

    if (props.rowData) {
      await editDept(state.value);
    }
    else {
      await createDept(state.value);
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
    <el-form ref="formRef" :rules="rules" :model="state" label-width="85">
      <el-form-item>
        <template #label>
          <div class="flex-y-center">
            上级部门
            <app-help-info message="不填写则为顶层部门" />
          </div>
        </template>
        <el-tree-select
          v-model="state.parentId" :data="departments" placeholder="请选择上级部门" :props="{ label: 'name' }"
          node-key="id" clearable check-strictly
        />
      </el-form-item>
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="state.name" placeholder="请输入部门名称" clearable />
      </el-form-item>
      <el-form-item>
        <template #label>
          <div class="flex-y-center">
            部门排序
            <app-help-info message="数字越小，同级中越靠前" />
          </div>
        </template>
        <el-input-number v-model="state.sort" placeholder="请输入部门排序" :min="0" :max="9999" />
      </el-form-item>
      <el-form-item label="部门状态">
        <el-switch v-model="state.isEnabled" />
      </el-form-item>
    </el-form>
  </app-popup>
</template>
