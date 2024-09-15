import type { InjectionKey } from 'vue';
import type { GridItemData } from './interface';

export type GridContext = Readonly<{
  overflow: boolean
  displayIndexList: number[]
  cols: number
  colGap: number
}>;

export const GridContextInjectionKey: InjectionKey<GridContext> = Symbol(
  'GridContextInjectionKey',
);

export type GridDataCollector = Readonly<{
  collectItemData: (index: number, itemData: GridItemData) => void
  removeItemData: (index: number) => void
}>;

export const GridDataCollectorInjectionKey: InjectionKey<GridDataCollector>
  = Symbol('GridDataCollectorInjectionKey');
