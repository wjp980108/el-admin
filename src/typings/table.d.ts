import type { TableColumnCtx } from 'element-plus';
import type { VNode } from 'vue';

type TypeProps = 'index' | 'selection' | 'expand' | 'money';

interface RenderScope<T> {
  row: T
  $index: number
  column: TableColumnCtx<T>
}

type ElementType<T> = T extends Array<infer U> ? U : T;
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type UnwrapResponseData<T> = T extends AppAxios.ResponseData<infer U> ? U : never;

declare namespace AppTable {

  interface TableColumn<T = any> extends Partial<Omit<TableColumnCtx<T>, 'type' | 'children' | 'renderCell' | 'fixed'>> {
    type?: TypeProps
    renderContent?: (scope: RenderScope<T>) => VNode | any
    children?: TableColumns<T>
    fixed?: 'left' | 'right' | boolean
  }

  type TableColumns<T = any> = TableColumn<T>[];

  interface TableColumnCheck {
    prop: string
    label: string
    checked: boolean
    fixed?: 'left' | 'right' | boolean
  }

  type TableColumnChecks = TableColumnCheck[];

  interface Pagination {
    background?: boolean
    pageSize?: number
    total?: number
    currentPage?: number
    layout?: string
    pageSizes?: number[]
    change?: (currentPage: number, pageSize: number) => void
  }

  type TableApiFn = (params: any) => Promise<any>;

  type TableData<T> = ElementType<UnwrapResponseData<UnwrapPromise<ReturnType<T>>>> & { rowIndex?: number };

  interface SpanMethodParams<T> {
    row: any
    column: TableColumnCtx<AppTable.TableData<T>>
    rowIndex: number
    columnIndex: number
  }

  interface TableConfig<T extends TableApiFn> {
    apiFnc: T
    apiParams: NonNullable<Parameters<T>[0]>
    spanOptions?: {
      isSpan: (data: SpanMethodParams<T>) => boolean
      children: keyof TableData<T>
      spanKey: string | string[]
    }
    columns: () => TableColumn<TableData<T>>[]
    pagination?: Pagination
  }

  type SpanMethodReturn = (number[] | { rowspan: number, colspan: number } | undefined);
}
