<script setup lang="tsx">
import { deleteUser, deptList, upUserStatus, userList } from '@/api/system/userManage';
import { useConfirm, useTable } from '@/hooks';
import { renderIcon } from '@/utils';
import UserForm from '@/views/system/userManage/components/UserForm.vue';

defineOptions({ name: 'UserManage' });

const showForm = ref(false);
let rowData: User.Data | undefined;
const { columns, loading, params, getTablePageList, reset, data, columnChecks, pagination } = useTable({
  apiFnc: userList,
  apiParams: {
    keyWords: '',
    deptIds: [],
    isEnabled: 'all',
  },
  columns: () => [
    {
      type: 'index',
      prop: 'index',
      label: '序号',
      width: 55,
      fixed: 'left',
    },
    {
      prop: 'userName',
      label: '用户名称',
      minWidth: 120,
      showOverflowTooltip: true,
      fixed: 'left',
    },
    {
      prop: 'realName',
      label: '真实姓名',
      minWidth: 120,
      showOverflowTooltip: true,
    },
    {
      prop: 'deptName',
      label: '所在部门',
      minWidth: 120,
      showOverflowTooltip: true,
    },
    {
      prop: 'roleName',
      label: '角色',
      minWidth: 120,
      showOverflowTooltip: true,
    },
    {
      prop: 'isAdmin',
      label: '管理员',
      minWidth: 70,
      align: 'center',
      renderContent({ row }) {
        return <>{row.isAdmin ? <el-tag type="success">是</el-tag> : <el-tag type="danger">否</el-tag>}</>;
      },
    },
    {
      prop: 'dataPermission',
      label: '数据权限',
      minWidth: 81,
      align: 'center',
      showOverflowTooltip: true,
      renderContent: ({ row }) => {
        const permissionMap: AnyObj = {
          1: { type: 'primary', text: '全部' },
          2: { type: 'success', text: '本级及下级' },
          3: { type: 'info', text: '个人' },
        };
        return <el-tag type={permissionMap[row.dataPermission].type}>{permissionMap[row.dataPermission].text}</el-tag>;
      },
    },
    {
      prop: 'createTime',
      label: '创建时间',
      minWidth: 170,
    },
    {
      prop: 'createName',
      label: '创建人',
      minWidth: 120,
      showOverflowTooltip: true,
    },
    {
      prop: 'updateTime',
      label: '修改时间',
      minWidth: 170,
    },
    {
      prop: 'updateName',
      label: '修改人',
      minWidth: 120,
      showOverflowTooltip: true,
    },
    {
      prop: 'isEnabled',
      label: '状态',
      minWidth: 70,
      align: 'center',
      renderContent: ({ row }) => {
        return (
          <el-switch
            model-value={row.isEnabled}
            onClick={async () => {
              await useConfirm(upUserStatus, { id: row.id!, isEnabled: !row.isEnabled }, `切换【${row.userName}】用户状态`);
              await getTablePageList();
            }}
          />
        );
      },
      fixed: 'right',
    },
    {
      prop: 'operate',
      label: '操作',
      fixed: 'right',
      width: 150,
      renderContent: ({ row }) => {
        return (
          <>
            <el-button
              type="primary"
              icon={renderIcon('EditPen')}
              link
              onClick={
                () => {
                  rowData = row;
                  showForm.value = true;
                }
              }
            >
              编辑
            </el-button>
            <el-button
              type="primary"
              icon={renderIcon('Delete')}
              link
              onClick={async () => {
                await useConfirm(deleteUser, row.id, `删除【${row.userName}】用户`);
                await getTablePageList();
              }}
            >
              删除
            </el-button>
          </>
        );
      },
    },
  ],
});

function handleAdd() {
  rowData = undefined;
  showForm.value = true;
}

const departmentList = ref<Department.Data[]>([]);

const deptName = ref('');
async function getDeptList() {
  const res = await deptList({ keyWords: deptName.value });
  departmentList.value = res.data;
}

onMounted(async () => {
  await getTablePageList();
  await getDeptList();
});
</script>

<template>
  <app-flex class="content-box">
    <app-tree-filter
      v-model="params.deptIds" class="min-w-240" :data="departmentList" :props="{ label: 'name' }"
      check-strictly card multiple @change="getTablePageList"
    />
    <app-flex class="overflow-hidden" vertical>
      <app-card>
        <app-form :cols="{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }" :search="getTablePageList" :reset="reset">
          <app-form-item label="关键字" index="0">
            <el-input v-model="params.keyWords" placeholder="请输入用户名称/真实姓名" clearable />
          </app-form-item>
          <app-form-item label="状态" index="2">
            <el-select v-model="params.isEnabled">
              <el-option value="all" label="全部" />
              <el-option :value="true" label="启用" />
              <el-option :value="false" label="禁用" />
            </el-select>
          </app-form-item>
        </app-form>
      </app-card>
      <app-table
        v-model:column-checks="columnChecks" v-model:pagination="pagination" title="用户列表" :data :loading
        :columns @refresh="getTablePageList"
      >
        <template #header>
          <el-button type="primary" @click="handleAdd">
            新增
          </el-button>
        </template>
      </app-table>
    </app-flex>
    <UserForm v-model="showForm" :row-data="rowData" @submit="getTablePageList" />
  </app-flex>
</template>
