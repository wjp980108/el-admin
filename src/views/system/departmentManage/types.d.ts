declare namespace Department {
  interface Params {
    keyWords: string
    isEnabled: string | boolean
  }

  interface Data {
    parentId: string
    id?: string
    name: string
    sort: number
    isEnabled: boolean
    users?: AnyObj[]
  }
}
