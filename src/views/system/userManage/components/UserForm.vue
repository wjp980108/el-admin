<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { createUser, deptList, editUser, roleList } from '@/api/system/userManage';
import { Regex } from '@/constants';
import { useReset } from '@/hooks';

defineOptions({ name: 'UserForm' });
const props = defineProps<{
  rowData?: User.Data
}>();
const emits = defineEmits(['submit']);
const show = defineModel({
  type: Boolean,
  required: true,
});

const [state, reset] = useReset<User.Data>({
  deptId: '',
  realName: '',
  roleId: '',
  userName: '',
  userPwd: '',
  isEnabled: true,
  dataPermission: 1,
});

const title = ref('');

watch(show, async (val) => {
  if (val) {
    await getDeptList();
    await getRoleList();

    if (props.rowData) {
      title.value = '编辑用户';
      Object.assign(state.value, {
        id: props.rowData.id,
        deptId: props.rowData.deptId,
        realName: props.rowData.realName,
        roleId: props.rowData.roleId,
        userName: props.rowData.userName,
        isEnabled: props.rowData.isEnabled,
        dataPermission: props.rowData.dataPermission,
      });
    }
    else {
      title.value = '新增用户';
    }
  }
});

const departments = ref<Department.Data[]>([]);
async function getDeptList() {
  const res = await deptList();
  departments.value = res.data;
}

const roles = ref<Role.Data[]>([]);
async function getRoleList() {
  const res = await roleList();
  roles.value = res.data;
}

const formRef = ref<FormInstance>();
const rules: FormRules = {
  userName: {
    required: true,
    validator: (rule: any, value: string, callback: any) => {
      if (value === '')
        return callback('请输入用户名');

      if (!new RegExp(Regex.Phone).test(value))
        return callback('请输入正确的手机号码格式');

      return callback();
    },
    trigger: 'blur',
  },
  userPwd: {
    required: true,
    message: '请输入密码',
    trigger: 'blur',
  },
  realName: {
    required: true,
    message: '请输入真实姓名',
    trigger: 'blur',
  },
  deptId: {
    required: true,
    message: '请选择部门',
    trigger: 'blur',
  },
  roleId: {
    required: true,
    message: '请选择角色',
    trigger: 'blur',
  },
};

function handleSubmit() {
  formRef.value!.validate(async (valid) => {
    if (!valid)
      return;

    if (props.rowData) {
      delete state.value.userPwd;
      await editUser(state.value);
    }
    else {
      await createUser(state.value);
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
    <el-form ref="formRef" :rules="rules" :model="state" label-width="82">
      <el-form-item prop="userName">
        <template #label>
          <div class="flex-y-center">
            用户名
            <app-help-info message="请使用手机号" />
          </div>
        </template>
        <el-input v-model="state.userName" placeholder="请输入用户名" clearable />
      </el-form-item>
      <el-form-item v-if="!rowData?.id" label="密码" prop="userPwd">
        <el-input v-model="state.userPwd" type="password" placeholder="请输入密码" clearable show-password />
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="state.realName" placeholder="请输入真实姓名" clearable />
      </el-form-item>
      <el-form-item label="部门" prop="deptId">
        <el-tree-select
          v-model="state.deptId" :data="departments" placeholder="请选择部门" :props="{ label: 'name' }"
          node-key="id" clearable check-strictly
        />
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select v-model="state.roleId" placeholder="请选择角色" clearable>
          <el-option v-for="item of roles" :key="item.id" :label="item.name" :value="item.id!" />
        </el-select>
      </el-form-item>
      <el-form-item label="数据权限">
        <el-select v-model="state.dataPermission">
          <el-option :value="1" label="全部" />
          <el-option :value="2" label="本级及下级" />
          <el-option :value="3" label="个人" />
        </el-select>
      </el-form-item>
      <el-form-item label="用户状态">
        <el-switch v-model="state.isEnabled" />
      </el-form-item>
    </el-form>
  </app-popup>
</template>
