declare namespace Menu {
  interface Data extends AppRoute.RowRoute {
    id?: string
    sort: number
    isEnabled: boolean
    requestPath: string
  }
}
