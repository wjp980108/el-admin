<script setup lang="tsx">
import { deleteMenu, menuList, upMenuStatus } from '@/api/system/menuManage';
import { useConfirm, useTable } from '@/hooks';
import { renderIcon } from '@/utils';
import MenuForm from '@/views/system/menuManage/components/MenuForm.vue';

defineOptions({ name: 'MenuManage' });

const showForm = ref(false);
let rowData: Menu.Data | undefined;
const { columns, loading, params, getTableList, reset, data, columnChecks } = useTable({
  apiFnc: menuList,
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
      prop: 'title',
      label: '菜单名称',
      minWidth: 120,
      showOverflowTooltip: true,
      fixed: 'left',
    },
    {
      prop: 'path',
      label: '路由路径',
      minWidth: 120,
      showOverflowTooltip: true,
    },
    {
      prop: 'type',
      label: '菜单类型',
      minWidth: 85,
      align: 'center',
      renderContent: ({ row }) => {
        const typeMap: AnyObj = {
          1: { type: 'primary', text: '目录' },
          2: { type: 'success', text: '页面' },
          3: { type: 'warning', text: '按钮' },
        };
        return <el-tag type={typeMap[row.type!].type}>{typeMap[row.type!].text}</el-tag>;
      },
    },
    {
      prop: 'icon',
      label: '菜单图标',
      minWidth: 85,
      align: 'center',
      renderContent: ({ row }) => {
        return <app-flex justify="center">{row.icon && <app-icon icon={row.icon!} size="20"></app-icon>}</app-flex>;
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
              await useConfirm(upMenuStatus, { id: row.id!, isEnabled: !row.isEnabled }, `切换【${row.title}】菜单状态`);
              await getTableList();
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
                await useConfirm(deleteMenu, row.id, `删除【${row.title}】菜单`);
                await getTableList();
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

onMounted(getTableList);
</script>

<template>
  <app-flex class="table-box">
    <app-card>
      <app-form :cols="{ xs: 1, sm: 3, md: 3, lg: 3, xl: 3 }" :search="getTableList" :reset="reset">
        <app-form-item label="关键字" index="0">
          <el-input v-model="params.keyWords" placeholder="请输入菜单名称" clearable />
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
    <app-table v-model:column-checks="columnChecks" title="菜单列表" :data :loading :columns @refresh="getTableList">
      <template #header>
        <el-button type="primary" @click="handleAdd">
          新增
        </el-button>
      </template>
    </app-table>
    <MenuForm v-model="showForm" :row-data="rowData" @submit="getTableList" />
  </app-flex>
</template>
