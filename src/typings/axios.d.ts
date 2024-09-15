declare namespace AppAxios {
  interface ResponseData<T = any> {
    status: number
    data: T
    totals: number
    message: string
  }

  type ApiPromise<T = any> = Promise<ResponseData<T>>;

  interface Options {
    // 是否开启取消重复请求
    cancelDuplicateRequest?: boolean
    // 是否开启 loading
    loading?: boolean
    // loading 文字
    loadingText?: string
    // 是否开启 message 消息提示
    message?: boolean
    // message 消息提示文字
    messageText?: string
    // 是否开启接口错误信息展示
    showErrorMessage?: boolean
  }

}
