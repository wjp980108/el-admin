/** @type {import('cz-git').UserConfig} */
export default {
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
  },
  extends: ['@commitlint/config-conventional'],
  prompt: {
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围:',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footer: '列举出禅道中的bug编号（可选）。 例如: #31, #34:\n',
      confirmCommit: '是否提交commit ?',
    },
    types: [
      {
        value: 'feat',
        name: 'feat:     新增功能 | 一个新的功能',
      },
      {
        value: 'fix',
        name: 'fix:      错误修复 | 修复一个bug',
      },
      {
        value: 'style',
        name: 'style:    格式修改 | 不影响功能，例如空格、格式化、分号等',
      },
      {
        value: 'refactor',
        name: 'refactor: 代码重构 | 既不修复错误也不添加功能的代码更改',
      },
      {
        value: 'perf',
        name: 'perf:     代码优化 | 提高性能的代码更改',
      },
      {
        value: 'test',
        name: 'test:     测试相关 | 添加测试或更新现有测试',
      },
      {
        value: 'build',
        name: 'build:    构建相关 | 构建工具或外部依赖项的更改',
      },
      {
        value: 'ci',
        name: 'ci:       CI 配置  | 对 CI 配置文件和脚本的更改',
      },
      {
        value: 'chore',
        name: 'chore:    其他修改 | 其他不修改源代码的更改',
      },
      {
        value: 'revert',
        name: 'revert:   代码回退 | 撤销一个历史提交',
      },
    ],
    // 是否开启emoji表情
    useEmoji: false,
    // 自定义“模块范围”列表
    scopes: [
      'pages',
      'components',
      'utils',
      'hooks',
      'styles',
      'config',
      'assets',
      'types',
      'test',
      'docs',
      'other',
    ],
    // 是否在选择“模块范围”中显示“自定义（custom）”选项
    allowCustomScopes: false,
    // 是否在选择“模块范围”中显示“空（empty）”选项
    allowEmptyScopes: false,
    // 允许出现的非兼容性重大的变更的 type
    allowBreakingChanges: ['feat', 'fix', 'refactor', 'chore'],
    // 定义 header 长度
    maxHeaderLength: 79,
  },
};
