export interface ResponsiveValue {
  /**
   * @zh >= 1920px 响应式配置
   * @en >= 1920px responsive configuration
   */
  xl?: number
  /**
   * @zh >= 1200px 响应式配置
   * @en >= 1200px responsive configuration
   */
  lg?: number
  /**
   * @zh >= 992px 响应式配置
   * @en >= 992px responsive configuration
   */
  md?: number
  /**
   * @zh >= 768px 响应式配置
   * @en >= 768px responsive configuration
   */
  sm?: number
  /**
   * @zh < 768px 响应式配置
   * @en < 768px responsive configuration
   */
  xs?: number
}

export interface GridItemProps {
  span?: number | ResponsiveValue
  offset?: number | ResponsiveValue
  suffix?: boolean
}

export interface GridItemData extends GridItemProps {
  span: number
  offset: number
}

export type Breakpoint = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type ScreenMap = Partial<Record<Breakpoint, boolean>>;
