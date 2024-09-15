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
      { value: 'feat', name: 'feat:     新功能' },
      { value: 'fix', name: 'fix:      修复问题' },
      { value: 'docs', name: 'docs:     文档更改' },
      { value: 'style', name: 'style:    格式（不影响代码运行的变动）' },
      { value: 'refactor', name: 'refactor: 重构（即不是新增功能，也不是修改bug的代码变动）' },
      { value: 'perf', name: 'perf:     性能优化' },
      { value: 'build', name: 'build:    影响构建系统或外部依赖的变更（例如：vite，npm）' },
      { value: 'ci', name: 'ci:       对 CI 配置文件和脚本的更改（例如：Travis, Circle, BrowserStack, SauceLabs）' },
      { value: 'chore', name: 'chore:    其他修改（不修改src目录或测试文件的修改）' },
      { value: 'revert', name: 'revert:   撤销之前的提交' },
    ],
    // 是否开启emoji表情
    useEmoji: false,
    // 自定义“模块范围”列表
    scopes: [
      'pages',
      'components',
      'constants',
      'directives',
      'stores',
      'router',
      'utils',
      'hooks',
      'styles',
      'config',
      'assets',
      'types',
      'docs',
      'other',
    ],
    // 是否在选择“模块范围”中显示“自定义（custom）”选项
    allowCustomScopes: false,
    // 是否在选择“模块范围”中显示“空（empty）”选项
    allowEmptyScopes: false,
    // 允许出现的非兼容性重大的变更的 type
    allowBreakingChanges: ['feat', 'fix', 'refactor'],
    // 定义 header 长度
    maxHeaderLength: 79,
  },
};
