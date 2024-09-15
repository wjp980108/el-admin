import { moneyThousand } from '@/utils';

// 渲染内容的类型
interface RenderContent {
  row: AnyObj
  column: {
    property: string
  }
}

/**
 * 渲染货币内容的函数
 *
 * @param param 渲染内容参数对象
 * @param param.row 表格行数据
 * @param param.column 表格列配置
 * @returns 货币格式化后的字符串
 */
export function moneyContent({ row, column }: RenderContent) {
  return moneyThousand(row[column.property]);
}
