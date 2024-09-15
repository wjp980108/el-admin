declare namespace AppRoute {

  type Type = 1 | 2 | 3;
  /** 单个路由所携带的meta标识 */
  interface RouteMeta {
    /* 页面标题，通常必选。 */
    title: string
    /* 图标，一般配合菜单使用 */
    icon?: string
    /* 是否开启页面缓存 */
    isKeepAlive?: boolean
    /* 有些路由我们并不想在菜单中显示，比如某些编辑页面。 */
    isHide?: boolean
    /** 当前路由不在左侧菜单显示，但需要高亮某个菜单的情况 */
    activeMenu?: string
    /** 当前路由不会被添加到Tab中 */
    isWithoutTab?: boolean
    /** 当前路由在左侧菜单是目录还是页面,不设置默认为page */
    type?: Type
  }

  type MetaKeys = keyof RouteMeta;

  interface baseRoute {
    /** 路由名称(路由唯一标识) */
    name: string
    /** 路由路径 */
    path: string
    /** 路由重定向 */
    redirect?: string
    /* 页面组件地址 */
    componentPath?: string | null
    /* 路由id */
    id: string
    /* 父级路由id，顶级页面为null */
    parentId: string | null
  }

  /** 单个路由的类型结构(动态路由模式：后端返回此类型结构的路由) */
  type RowRoute = RouteMeta & baseRoute;

  /**
   * 挂载到项目上的真实路由结构
   */
  interface Route extends baseRoute {
    /** 子路由 */
    children?: Route[]
    /* 页面组件 */
    component: any
    /** 路由描述 */
    meta: RouteMeta
  }

  interface Menu {
    icon?: string
    id: string
    label: string
    parentId: string | null
    key: string
    children?: Menu[]
  }

}
