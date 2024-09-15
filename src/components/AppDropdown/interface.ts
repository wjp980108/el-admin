export interface Axis {
  x: number
  y: number
}

export interface ContextMenuItem {
  key: string
  label: string
  icon?: string
  disabled?: boolean
  show?: boolean
}

export interface ContextMenuItemClickEmitArg<T = any> extends ContextMenuItem {
  sourceData?: T
}

export interface Props {
  width?: number
  items: ContextMenuItem[]
}
