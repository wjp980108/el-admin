declare namespace User {
  interface Params {
    keyWords: string
    deptIds: string[]
    isEnabled: string | boolean
  }

  interface Data {
    id?: string
    isEnabled: boolean
    userName: string
    userPwd?: string
    realName: string
    deptId: string
    roleId: string
    roles?: Role.Data[]
    isAdmin?: boolean
    dataPermission: 1 | 2 | 3
  }
}
