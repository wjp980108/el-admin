interface Value {
  color: string
  desc: string
}

export interface ColorInfo {
  primary: Value
  success: Value
  warning: Value
  danger: Value
  info: Value
  [key: string]: Value
}
export const colorInfo: ColorInfo = {
  primary: {
    color: '#2C78DA',
    desc: '主色',
  },
  success: {
    color: '#67C23A',
    desc: '成功色',
  },
  warning: {
    color: '#E6A23C',
    desc: '警告色',
  },
  danger: {
    color: '#F56C6C',
    desc: '危险色',
  },
  info: {
    color: '#909399',
    desc: '信息色',
  },
};
