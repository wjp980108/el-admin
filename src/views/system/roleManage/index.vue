<script setup lang="tsx">
import { deleteRole, roleList, upRoleStatus } from '@/api/system/roleManage';
import { useConfirm, useTable } from '@/hooks';
import { renderIcon } from '@/utils';
import RoleForm from '@/views/system/roleManage/components/RoleForm.vue';

defineOptions({ name: 'RoleManage' });

const showForm = ref(false);
let rowData: Role.Data | undefined;
const { columns, loading, params, getTablePageList, reset, data, columnChecks, pagination } = useTable({
  apiFnc: roleList,
  apiParams: {
    keyWords: '',
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
      prop: 'name',
      label: '角色名称',
      minWidth: 120,
      showOverflowTooltip: true,
      fixed: 'left',
    },
    {
      prop: 'users',
      label: '用户',
      minWidth: 60,
      align: 'right',
      renderContent({ row }) {
        return (
          <>
            {
              row.users!.length && <el-link type="primary">{row.users!.length}</el-link>
            }
          </>
        );
      },
    },
    {
      prop: 'remark',
      label: '备注',
      minWidth: 120,
      showOverflowTooltip: true,
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
              await useConfirm(upRoleStatus, { id: row.id!, isEnabled: !row.isEnabled }, `切换【${row.name}】角色状态`);
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
                await useConfirm(deleteRole, row.id, `删除【${row.name}】角色`);
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

onMounted(getTablePageList);
</script>

<template>
  <app-flex class="table-box">
    <app-card>
      <app-form :cols="{ xs: 1, sm: 3, md: 3, lg: 3, xl: 3 }" :search="getTablePageList" :reset="reset">
        <app-form-item label="关键字" index="0">
          <el-input v-model="params.keyWords" placeholder="请输入角色名称/备注" clearable />
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
      v-model:column-checks="columnChecks" v-model:pagination="pagination" title="角色列表" :data :loading :columns
      @refresh="getTablePageList"
    >
      <template #header>
        <el-button type="primary" @click="handleAdd">
          新增
        </el-button>
      </template>
    </app-table>
    <RoleForm v-model="showForm" :row-data="rowData" @submit="getTablePageList" />
  </app-flex>
</template>
