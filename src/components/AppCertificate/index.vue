<script setup lang="tsx">
import type { Certificate } from '@/components/AppCertificate/interface';
import type { InputInstance } from 'element-plus';
import { renderIcon } from '@/utils';

defineOptions({ name: 'AppCertificate' });

defineProps<Props>();

interface Props {
  height?: string | number
  maxHeight?: string | number
}

const data = defineModel({
  type: Array as PropType<Certificate[]>,
  default: () => [],
});

const currencyList = Array.from<string>({ length: 11 }).fill('');

data.value.forEach((item: any) => {
  item.debtorList = [...currencyList];
  item.lenderList = [...currencyList];
  item.isShowDebtorInput = false;
  item.isShowLenderInput = false;
});

const inputRefs = ref<InputInstance>();

function toggleInputVisibility(row: Certificate, type: 'debtor' | 'lender', visibility: boolean) {
  if (visibility) {
    data.value.forEach((item) => {
      item.isShowDebtorInput = false;
      item.isShowLenderInput = false;
    });
  }
  const isShowInputKey = `isShow${type.charAt(0).toUpperCase() + type.slice(1)}Input`;
  const listKey = `${type}List`;
  row[isShowInputKey] = visibility;
  if (row[type]) {
    row[listKey] = fillCurrencyList(row[type], row[listKey]);
  }
  else {
    row[listKey] = currencyList;
  }
  nextTick(() => {
    if (visibility) {
      inputRefs.value!.focus();
    }
  });
}

function handleCellClick({ row, column }: { row: Certificate, column: any }) {
  const type = column.label === '借方' ? 'debtor' : 'lender';
  toggleInputVisibility(row, type, true);
}

function handleCellBlur({ row, column }: AnyObj) {
  const type = column.label === '借方' ? 'debtor' : 'lender';
  toggleInputVisibility(row, type, false);
}

function fillCurrencyList(value: number | string, list: string[]) {
  if (typeof value === 'string') {
    value = Number.parseFloat(value);
  }
  const formattedValue = value.toFixed(2).replace('.', '');
  const filledList = [...list];

  // 从右向左填充 `currencyList`，确保金额正确显示在相应的位置
  for (let i = 0; i < formattedValue.length; i++) {
    filledList[list.length - formattedValue.length + i] = formattedValue[i];
  }

  return filledList;
}

function handleInput(row: Certificate, type: 'debtor' | 'lender') {
  const oppositeType = type === 'debtor' ? 'lender' : 'debtor';
  const oppositeListKey = `${oppositeType}List`;

  row[oppositeType] = '';
  row[oppositeListKey] = currencyList;

  let newValue = row[type].toString().replace(/[^0-9.]/g, '');
  const decimalIndex = newValue.indexOf('.');

  if (decimalIndex !== -1) {
    const [integerPart, decimalPart = ''] = newValue.split('.');
    newValue = `${integerPart}.${decimalPart.slice(0, 2)}`;
  }
  else {
    newValue = newValue.slice(0, 9);
  }

  row[type] = newValue.slice(0, 12);
}

function getSummaries({ columns, data }: { columns: any[], data: any[] }): any[] {
  return columns.map((_, index) => {
    if (index === 0) {
      return (
        <div>
          合计：
          {data.length ? '贰佰元整' : ''}
        </div>
      );
    }
    if (index === 2 || index === 3) {
      const type = index === 2 ? 'debtor' : 'lender';
      const sum = data.reduce((prev, curr) => {
        return prev + (Number.parseFloat(curr[type]) || 0);
      }, 0);

      // 如果合计为0，不显示任何内容
      if (sum === 0) {
        return (
          <div class="currency">
            {currencyList.map((item, idx) => (
              <span key={idx} class="currency-item">{item}</span>
            ))}
          </div>
        );
      }

      const filledList = fillCurrencyList(sum, currencyList);

      return (
        <div class="currency">
          {filledList.map((item, idx) => (
            <span key={idx} class="currency-item">{item}</span>
          ))}
        </div>
      );
    }
    return '';
  });
}

function handleAdd() {
  nextTick(() => {
    data.value.push({
      summary: '',
      subject: '',
      debtor: '',
      lender: '',
      debtorList: [...currencyList],
      lenderList: [...currencyList],
      isShowDebtorInput: false,
      isShowLenderInput: false,
    });
  });
}

function handleRemove(index: number) {
  if (data.value.length === 2) {
    return ElMessage.error('至少保留两条凭证');
  }
  data.value.splice(index, 1);
}

const [DefineTemplate, ReuseTemplate] = createReusableTemplate();

onMounted(() => {
  const observer = new MutationObserver(() => {
    const tfoot = document.querySelector('.app-certificate .el-table__footer-wrapper tfoot tr');
    if (tfoot && tfoot.children.length > 1) {
      tfoot.children[0].setAttribute('colspan', '2');
      tfoot.children[1].remove();
      observer.disconnect();
    }
  });

  observer.observe(document.querySelector('.app-certificate .el-table__footer-wrapper')!, {
    childList: true,
    subtree: true,
  });
});
</script>

<template>
  <div class="app-certificate">
    <DefineTemplate>
      <div class="currency">
        <span class="currency-item">亿</span>
        <span class="currency-item">千</span>
        <span class="currency-item">百</span>
        <span class="currency-item">十</span>
        <span class="currency-item">万</span>
        <span class="currency-item">千</span>
        <span class="currency-item">百</span>
        <span class="currency-item">十</span>
        <span class="currency-item">元</span>
        <span class="currency-item">角</span>
        <span class="currency-item">分</span>
      </div>
    </DefineTemplate>
    <el-table class="flex-1" :data="data" :summary-method="getSummaries" :height :max-height="maxHeight" show-summary border>
      <el-table-column label="摘要" min-width="240" header-align="center" :resizable="false">
        <template #default="scope">
          <el-input v-model="scope.row.summary" type="textarea" resize="none" clearable />
        </template>
      </el-table-column>
      <el-table-column label="会计科目" min-width="300" header-align="center" :resizable="false">
        <template #default="scope">
          <el-select v-model="scope.row.subject" placeholder="请选择会计科目" clearable>
            <el-option label="选项1" value="1" />
            <el-option label="选项2" value="2" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="借方金额" header-align="center" :resizable="false">
        <el-table-column label="借方" min-width="220">
          <template #header>
            <ReuseTemplate />
          </template>
          <template #default="scope">
            <div v-if="!scope.row.isShowDebtorInput" class="currency lh-52 !text-16" @click="handleCellClick(scope)">
              <span v-for="(item, index) of scope.row.debtorList" :key="index" class="currency-item">
                {{ item }}
              </span>
            </div>
            <el-input
              v-else ref="inputRefs" v-model="scope.row.debtor" clearable
              @blur="handleCellBlur(scope)" @input="handleInput(scope.row, 'debtor')"
            />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="贷方金额" min-width="220" header-align="center" :resizable="false">
        <el-table-column label="贷方" min-width="220">
          <template #header>
            <ReuseTemplate />
          </template>
          <template #default="scope">
            <div v-if="!scope.row.isShowLenderInput" class="currency lh-52 !text-16" @click="handleCellClick(scope)">
              <span v-for="(item, index) of scope.row.lenderList" :key="index" class="currency-item">
                {{ item }}
              </span>
            </div>
            <el-input
              v-else ref="inputRefs" v-model="scope.row.lender" clearable
              @blur="handleCellBlur(scope)" @input="handleInput(scope.row, 'lender')"
            />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="操作" width="103" fixed="right" align="center" :resizable="false">
        <template #default="scope">
          <el-button type="primary" text :icon="renderIcon('CirclePlus')" @click="handleAdd" />
          <el-button class="!ml-0" type="danger" text :icon="renderIcon('Delete')" @click="handleRemove(scope.$index)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="scss">
.app-certificate {
  :deep(.el-table) {
    .el-table__header-wrapper {
      thead {
        th.el-table__cell {
          background-color: var(--el-table-tr-bg-color);
        }

        tr {
          &:nth-child(2) {
            th.el-table__cell {
              padding: 0;
              font-weight: 500;

              .cell {
                padding: 0;
              }
            }
          }
        }
      }
    }

    .el-table__body-wrapper {
      tbody {
        .el-table__row {
          .el-table__cell {
            padding: 0;

            &:first-child {
              padding-left: 1px;
            }

            &:last-child {
              .cell {
                line-height: 52px;
              }
            }

            .cell {
              height: 52px;
              padding: 0;

              .el-textarea {
                .el-textarea__inner {
                  box-shadow: none;
                  border-radius: 0;

                  &:focus {
                    box-shadow: 0 0 0 1px var(--el-color-primary) inset;
                  }
                }
              }

              .el-select, .el-input {
                height: 100%;

                .el-select__wrapper, .el-input__wrapper {
                  height: 100%;
                  box-shadow: none;
                  border-radius: 0;

                  &.is-focused, &.is-focus {
                    box-shadow: 0 0 0 1px var(--el-color-primary) inset;
                  }
                }

                .el-input__inner {
                  text-align: right;
                }
              }
            }
          }
        }

        .hover-row {
          td.el-table__cell {
            background-color: var(--el-table-tr-bg-color);
          }
        }
      }
    }

    .el-table__footer-wrapper {
      tfoot {
        tr {
          td {
            border-top: var(--el-table-border);
            background-color: var(--el-table-tr-bg-color);

            &:nth-child(2), &:nth-child(3) {
              padding: 0;

              .cell {
                height: 40px;
                padding: 0;
                line-height: 40px;
              }
            }
          }
        }
      }
    }

    .currency {
      display: flex;
      text-align: center;
      height: 100%;
      font-size: 12px;

      &-item {
        flex: 1;
        border-right: 1px solid #e3e8ee;

        &:last-child {
          border-right: none;
        }

        &:nth-child(3), &:nth-child(6) {
          border-color: #c3dcfb;
        }

        &:nth-child(9) {
          border-color: #ffd6c0;
        }
      }
    }
  }
}
</style>
