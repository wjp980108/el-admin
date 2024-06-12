/** @type {import('cz-git').UserConfig} */
export default {
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
  },
  extends: ['@commitlint/config-conventional'],
  prompt: {
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footer: '列举出禅道中的bug编号（可选）。 例如: #31, #34:\n',
      confirmCommit: '是否提交commit ?',
    },
    types: [
      { value: 'feat', name: 'feat:     新增功能 | A new feature' },
      { value: 'fix', name: 'fix:      修复缺陷 | A bug fix' },
      {
        value: 'style',
        name: 'style:    代码格式 | Changes that do not affect the meaning of the code',
      },
      {
        value: 'refactor',
        name: 'refactor: 代码重构 | A code change that neither fixes a bug nor adds a feature',
      },
      {
        value: 'test',
        name: 'test:     测试相关 | Adding missing tests or correcting existing tests',
      },
      {
        value: 'build',
        name: 'build:    构建相关 | Changes that affect the build system or external dependencies',
      },
      {
        value: 'ci',
        name: 'ci:       持续集成 | Changes to our CI configuration files and scripts',
      },
      { value: 'revert', name: 'revert:   回退代码 | Revert to a commit' },
      {
        value: 'chore',
        name: 'chore:    其他修改 | Other changes that do not modify src or test files',
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
}
