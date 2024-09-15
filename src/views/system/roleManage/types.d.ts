declare namespace Role {
  interface Params {
    keyWords: string
    isEnabled: string | boolean
  }

  interface Data {
    id?: string
    isEnabled: boolean
    name: string
    menuIds: number[]
    remark: string
    menus?: Menu.Data[]
    users?: AnyObj[]
  }
}
