import type { AppTable } from '@/typings/table';
import { useReset } from '@/hooks/useReset';
import { useTableSpan } from '@/hooks/useTableSpan';
import { flattenTableData } from '@/utils';

/**
 * 创建一个表格使用的函数
 *
 * @template T 表格数据的类型
 * @param config 表格配置对象
 * @param config.columns 表格的列配置数组
 * @returns 返回表格相关的响应式属性和方法
 */
export function useTable<A extends AppTable.TableApiFn>(config: AppTable.TableConfig<A>) {
  // 加载状态
  const loading = ref(false);

  const columnsList = ref(config.columns());
  // 配置可选 columns
  const columnChecks = ref(getColumnChecks(config.columns()));
  // 获取处理好的 columns
  const columns = computed(() => setColumns(columnsList.value, columnChecks.value));
  // 接口请求参数
  const [apiParams, reset] = useReset(config.apiParams);

  // 合并单元格
  const { spanList, setSpanList } = useTableSpan();

  // 分页配置
  const pagination = reactive<AppTable.Pagination>({
    background: false,
    pageSize: 10,
    total: 0,
    currentPage: 1,
    layout: 'sizes, total, slot, ->,  prev, pager, next, jumper',
    pageSizes: [10, 20, 50, 100],
    change: getTablePageList,
  });
  Object.assign(pagination, config.pagination);

  const data = ref<AppTable.TableData<A>[]>([]);

  // 获取表格数据-不带分页
  async function getTableList() {
    try {
      const res = await fetchData();
      processTableData(res.data);
    }
    catch (e) {
      console.error(e);
    }
  }

  // 获取表格数据-带分页
  async function getTablePageList() {
    apiParams.value.pageSize = pagination.pageSize;
    apiParams.value.pageIndex = pagination.currentPage;

    try {
      const res = await fetchData();
      processTableData(res.data);
      pagination.total = res.totals;
    }
    catch (e) {
      console.error(e);
    }
  }

  // 请求数据
  async function fetchData() {
    loading.value = true;
    try {
      return await config.apiFnc(apiParams.value);
    }
    catch (e) {
      return Promise.reject(e);
    }
    finally {
      loading.value = false;
    }
  }

  // 处理合并单元格逻辑
  function processTableData(newData: any[]): void {
    if (config.spanOptions) {
      const flattenedData = flattenTableData<any>(newData, config.spanOptions.children);
      data.value = flattenedData;
      setSpanList(flattenedData, config.spanOptions.spanKey);
    }
    else {
      data.value = newData;
    }
  }

  // 合并单元格
  function spanMethod(params: AppTable.SpanMethodParams<A>): AppTable.SpanMethodReturn | undefined {
    if (!config.spanOptions || !config.spanOptions.isSpan(params)) {
      return;
    }

    const { rowIndex } = params;
    const rowSpan = spanList.value[rowIndex];
    return {
      rowspan: rowSpan > 0 ? rowSpan : 0,
      colspan: rowSpan > 0 ? 1 : 0,
    };
  }

  return {
    loading,
    columns,
    columnChecks,
    pagination,
    params: apiParams,
    getTableList,
    getTablePageList,
    reset,
    data,
    spanMethod,
  };
}

/**
 * 设置表格的列
 *
 * @param columns 表格的列配置数组
 * @param columnChecks 可操作的列配置检查数组
 * @returns 返回根据 columnChecks 配置好的列配置数组
 * @template T 表格数据的类型
 */
function setColumns(columns: AppTable.TableColumns, columnChecks: AppTable.TableColumnChecks) {
  const columnMap = new Map();
  columns.forEach((column) => {
    if (!column.type && column.prop) {
      columnMap.set(column.prop, column);
    }

    if (column.type === 'index') {
      columnMap.set('index', column);
    }

    if (column.type === 'selection') {
      columnMap.set('selection', column);
    }

    if (column.type === 'expand') {
      columnMap.set('expand', column);
    }
  });

  const columnsList: AppTable.TableColumns = columnChecks
    .filter(item => item.checked)
    .map((check) => {
      const column = columnMap.get(check.prop);
      if (column) {
        column.fixed = check.fixed;
      }
      // console.log(column, 'column');
      return column;
    });

  return columnsList;
}

/**
 * 创建一个列检查对象。
 *
 * @param {AppTable.TableColumn} column - 表格列的配置对象。
 * @returns {AppTable.TableColumnCheck} 返回配置好的列检查对象。
 */
function createColumnCheck(column: AppTable.TableColumn): AppTable.TableColumnCheck {
  return {
    prop: column.prop || column.type!,
    label: column.label || getColumnDefaultLabel(column.type),
    checked: true,
    fixed: column.fixed,
  };
}

/**
 * 获取列的默认标签名。
 *
 * @param {string} [type] - 列的类型。
 * @returns {string} 返回列的默认标签名。
 */
function getColumnDefaultLabel(type?: string): string {
  switch (type) {
    case 'index': return '序号';
    case 'selection': return '勾选';
    case 'expand': return '展开';
    default: return '';
  }
}

/**
 * 根据表格列的配置数组生成可操作的列配置检查数组。
 *
 * @param {AppTable.TableColumns} columns - 表格的列配置数组。
 * @returns {AppTable.TableColumnChecks} 返回配置好的可操作列配置数组。
 */
function getColumnChecks(columns: AppTable.TableColumns): AppTable.TableColumnChecks {
  return columns.map(createColumnCheck);
}
