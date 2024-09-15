# 项目开发文档

## 项目概述

**项目名称**：运营平台（OA）

**项目简介**：运营平台是一个企业内部管理系统，主要用于管理企业内部的各种业务流程，包括人员管理、租户设置、商品设置等。

## 技术栈

- **核心框架**: [Vue3](https://cn.vuejs.org/)，[Vite](https://cn.vitejs.dev/)
- **状态管理**: [Pinia](https://pinia.vuejs.org/zh/)
- **路由管理**: [vue-router](https://router.vuejs.org/zh/)
- **数据请求**: [Axios](https://www.axios-http.cn/docs/intro)
- **UI 组件库**: [Element Plus](https://element-plus.org/zh-CN/#/zh-CN)
- **图标库**: [@iconify/vue](https://icones.js.org/)
- **工具库**: [@vueuse/core](https://vueuse.pages.dev/)，[localforage](https://localforage.docschina.org/)，[lodash-es](https://www.lodashjs.com/)，[a-calc](https://github.com/Autumn-one/a-calc-old/blob/main/README_ZH.md)，[qs](https://github.com/ljharb/qs?tab=readme-ov-file)
- **样式处理**: [Sass](https://sass-lang.com/), [unocss](https://unocss-cn.pages.dev/)
- **代码提交规范**: [cz-git](https://cz-git.qbb.sh/zh/)
- **代码质量**: [ESLint](https://eslint.org/) (使用 [@antfu/eslint-config](https://eslint-config.antfu.me/configs) 预设)

## 安装和运行

### 环境要求

- **Node.js 版本**: >= 20.x
- **npm 版本**: >= 10.x
- **pnpm 版本**: 推荐使用最新版本

### 安装步骤

```text
# 克隆项目
git clone https://e.coding.net/g-bxgh3854/oa/WEB.OA.git

# 进入项目目录
cd WEB.OA

# 安装依赖
pnpm install
```

### 运行项目

```text
# 本地开发环境启动
pnpm run dev

# 本地测试环境启动
pnpm run dev:test

# 本地生产环境启动
pnpm run dev:prod

# 测试环境构建
pnpm run build:test

# 生产环境构建
pnpm run build
```
## 项目结构

```text
WEB.OA
├── .husky/               # Husky 配置
├── dist/                 # 打包输出目录
├── node_modules/         # 依赖包
├── public/               # 静态资源和公共入口
├── src/                  # 主要代码目录
│   ├── assets/           # 静态资源
│   ├── components/       # 组件
│   ├── config/           # 配置文件
│   ├── constants/        # 常量，存储整个应用中重复使用的常数值，如常用正则、配置参数等
│   ├── directives/       # 自定义指令
│   ├── hooks/            # 自定义 hooks，用于封装组件逻辑和重用功能，如自带重置功能的 ref 、表格数据统一处理等
│   ├── layouts/          # 布局组件
│   ├── router/           # 路由配置
│   ├── stores/           # 状态管理
│   ├── styles/           # 样式文件
│   ├── typings/          # 类型定义
│   ├── utils/            # 工具函数，提供跨组件的通用功能，如钱币格式化、数据转换等
│   ├── views/            # 页面视图
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── .env                  # 环境变量配置
├── .env.dev              # 开发环境配置
├── .env.prod             # 生产环境配置
├── .env.test             # 测试环境配置
├── .gitignore            # Git 忽略文件
├── .nvmdrc               # Node 版本管理配置文件(nvm)
├── commitlint.config.js  # CommitLint 配置文件
├── eslint.config.js      # ESLint 配置文件
├── index.html             # 入口 html
├── package.json          # 项目配置文件
├── pnpm-lock.yaml        # pnpm 依赖锁
├── README.md             # 项目说明文档
├── tsconfig.json         # TypeScript 配置文件
├── uno.config.ts         # Uoncss 配置文件
└── vite.config.ts        # Vite 配置文件
```

## 全局组件

- `AppCard`：卡片组件，用于展示内容，无下内边距
- `AppDropdown`：下拉菜单组件，用于展示下拉菜单，主要用于 `LayTabBar` 组件
- `AppFlex`：弹性布局组件，用于展示弹性布局，和 `ElSpace` 差不多，但是能用 `AppFlex` 就不要使用 `ElSpace`
- `AppFrom`：基于 `ElForm` 的表单组件，内置 `AppGrid` 组件的功能，用于列表页的表单
- `AppGrid`：栅格布局组件，用于展示栅格布局，和 `ElRow` 差不多，但是能用 `AppGrid` 就不要使用 `ElRow`
- `AppHelpInfo`：帮助信息组件，用于展示帮助信息
- `AppIcon`：图标组件，用于展示图标，使用 [iconify](https://icones.js.org/) 图标库作为图标来源
- `AppPopup`：弹出框组件，用于展示弹出框
- `AppSelectIcon`：选择图标组件，用于选择图标，使用 [iconify](https://icones.js.org/) 图标库作为图标来源
- `AppTable`：表格组件，用于展示表格，二次封装 `ElTable` 组件，新增头部操作栏
- `AppThemeSwitch`：主题切换组件，用于切换主题
- `AppWrapper`：包裹组件，用于包裹内容，有内边距

## 开发约定

### 编码规范

- 使用小驼峰命名法
- 组件文件名采用大写开头的驼峰命名法（例如：`MyComponent.vue`）
- 单文件组件的代码长度不超过 500 行，如果超过 500 行，应该考虑拆分组件
  1. 可读性：较短的文件更容易阅读和理解。长文件往往会导致代码复杂化，使得开发人员难以快速找到和理解特定功能或逻辑。
  2. 可维护性：较短的文件更易于维护和修改。较长的文件在修改时更容易引入错误，并且在进行代码审查时也更困难。
  3. 组件化设计：Vue 强调组件化设计，鼓励将功能分解为小而独立的组件。每个组件应该关注一个单一的职责，这样不仅代码更清晰，还可以更好地重用。
- 使用 2 个空格缩进，单引号，分号结尾
- 使用 `===` 和 `!==` 进行比较
- 使用 `const` 和 `let` 声明变量
- 使用 `TypeScript` 进行类型定义
- 使用 `ESLint` 进行代码规范检查
- 使用 `Sass` 进行样式编写
- 如果只处理基本数据类型、数组或需要引用Vue组件或DOM元素，使用 `ref`。
- 如果要引用第三方库对象或出于性能考虑不需要深度响应式，使用 `shallowRef`。
- 如果处理复杂的对象，并且需要所有嵌套属性也保持响应性，使用 `reactive`。

### 提交规范
- 使用 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 格式
- 提交信息格式：
  - `feat`: 新功能
  - `fix`: 修复问题
  - `docs`: 文档更改
  - `style`: 格式（不影响代码运行的变动）
  - `refactor`: 重构（即不是新增功能，也不是修改bug的代码变动）
  - `perf`: 性能优化
  - `build`: 影响构建系统或外部依赖的变更（例如：vite，npm）
  - `ci`: 对 CI 配置文件和脚本的更改（例如：Travis, Circle, BrowserStack, SauceLabs）
  - `chore`: 其他修改（不修改src目录或测试文件的修改）
  - `revert`: 撤销之前的提交

## 版本控制
- 使用Git标签和分支管理功能，确保所有发布版本都可以追溯和访问。

## 维护和扩展

### 维护指南
- 定期更新依赖：`pnpm update`
- 使用 `ESLint` 保持代码风格一致：`pnpm run lint:fix`
- 使用 `TypeScript` 检查类型是否正确：`pnpm run type-check`

### 扩展指南
- 新增功能模块时，遵循现有项目结构
- 新增路由和状态管理时，确保在对应的文件中进行配置
- 新增组件时，确保组件具有良好的可复用性和独立性
- 文件不要嵌套太深，避免过多的嵌套关系
- 保持代码的可读性和可维护性
- 保持代码的简洁性，避免过度设计
