<script setup lang="ts">
import { type Component, ref } from 'vue'
import { h } from 'vue'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import {
  BookOutline as BookIcon,
  HomeOutline as HomeIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
} from '@vicons/ionicons5'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'home',
            params: {
              lang: 'zh-CN',
            },
          },
        },
        { default: () => '回家' },
      ),
    key: 'go-back-home',
    icon: renderIcon(HomeIcon),
  },
  {
    label: () =>
      h(
        'a',
        {
          href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F',
          target: '_blank',
          rel: 'noopenner noreferrer',
        },
        '且听风吟',
      ),
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon),
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    disabled: true,
    children: [
      {
        label: '鼠',
        key: 'rat',
      },
    ],
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    icon: renderIcon(BookIcon),
    disabled: true,
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            icon: renderIcon(PersonIcon),
          },
          {
            label: '羊男',
            key: 'sheep-man',
            icon: renderIcon(PersonIcon),
          },
        ],
      },
      {
        label: '饮品',
        key: 'beverage',
        icon: renderIcon(WineIcon),
        children: [
          {
            label: '威士忌',
            key: 'whisky',
          },
        ],
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich',
          },
        ],
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes',
      },
    ],
  },
]

const store = ref('1')
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider collapse-mode="width" :collapsed-width="50" :width="200" show-trigger="bar" content-style="height: 100vh" bordered>
      <n-space class="bg-[#817e7eff]" justify="space-around" item-style="padding-top: 6px">
        <div>
          <n-image width="60" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
        </div>
        <n-space justify="end" align="end" size="large" vertical>
          <n-button text text-color="#fff">
            <span class="text-5">智选云管理</span>
          </n-button>
          <span class="color-#fff">版本V1.0.0</span>
        </n-space>
      </n-space>
      <n-menu :options="menuOptions" :collapsed-width="50" :indent="18" responsive />
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered>
        <n-space class="p-2" justify="space-between">
          <n-flex>
            <n-flex vertical>
              <span class="text-4.5">郑州市捷讯通讯公司-标准版</span>
              <n-flex>
                <span>识别码：10001</span>
                <span>门店数量：25</span>
              </n-flex>
            </n-flex>
            <n-divider vertical />
            <n-flex vertical>
              <span>短信可用数量</span>
              <n-flex>
                <span>4560</span>
                <a href="">充值</a>
              </n-flex>
            </n-flex>
            <n-divider vertical />
            <n-image width="150" src="https://erp.yserp.cc/dist/images/service.jpg" />
            <n-divider vertical />
            <n-image width="150" src="https://erp.yserp.cc/dist/images/vide.jpg" />
          </n-flex>
          <n-flex :size="50">
            <n-flex vertical>
              <span>当前登录门店</span>
              <n-select v-model:value="store" :options="[{ label: '东大街', value: '1' }, { label: '西大街', value: '2' }]" />
            </n-flex>
            <n-flex align="start" vertical>
              <span>当前登录用户</span>
              <a href="">张小白</a>
            </n-flex>
          </n-flex>
        </n-space>
      </n-layout-header>
      <n-layout-header bordered>
        <n-space class="p-3">
          <n-tag type="info" closable>
            爱在西元前
          </n-tag>
          <n-tag type="info" closable>
            不该
          </n-tag>
          <n-tag type="info" closable>
            超人不会飞
          </n-tag>
          <n-tag type="info" closable>
            手写的从前
          </n-tag>
          <n-tag type="info" closable>
            哪里都是你
          </n-tag>
        </n-space>
      </n-layout-header>
      <n-layout-content content-style="padding: 10px; height: calc(100vh - 82px - 53px)" embedded>
        <n-space vertical>
          <n-card size="small">
            <n-form inline label-placement="left">
              <n-form-item label="关键字">
                <n-input />
              </n-form-item>
              <n-form-item label="门店">
                <n-select v-model:value="store" style="width: 200px;" :options="[{ label: '东大街', value: '1' }, { label: '西大街', value: '2' }]" />
              </n-form-item>
              <n-form-item>
                <n-button type="primary">
                  查询
                </n-button>
              </n-form-item>
              <n-form-item>
                <n-button>
                  重置
                </n-button>
              </n-form-item>
            </n-form>
          </n-card>
          <n-card>
            <n-space vertical>
              <n-flex justify="space-between" align="center">
                <h3 class="m-0">
                  列表
                </h3>
                <n-flex>
                  <n-button type="primary">
                    新增
                  </n-button>
                  <n-button type="primary">
                    编辑
                  </n-button>
                </n-flex>
              </n-flex>
              <n-table :single-line="false">
                <n-thead>
                  <n-tr>
                    <n-th>1</n-th>
                    <n-th>2</n-th>
                    <n-th>3</n-th>
                    <n-th>4</n-th>
                    <n-th>5</n-th>
                    <n-th>6</n-th>
                  </n-tr>
                </n-thead>
                <n-tbody>
                  <n-tr>
                    <n-td>1</n-td>
                    <n-td>2</n-td>
                    <n-td>3</n-td>
                    <n-td>4</n-td>
                    <n-td>5</n-td>
                    <n-td>6</n-td>
                  </n-tr>
                </n-tbody>
              </n-table>
              <n-pagination
                :display-order="['pages', 'size-picker', 'quick-jumper']"
                :page-count="100"
                show-quick-jumper
                show-size-picker
                :prefix="(info) => `共${info.itemCount}条`"
              />
            </n-space>
          </n-card>
        </n-space>
      </n-layout-content>
      <!--      <n-layout-footer>脚</n-layout-footer> -->
    </n-layout>
  </n-layout>
</template>
