import type { IconifyInfo, IconifyJSON } from '@iconify/types';

export interface APIv2CollectionsList extends IconifyInfo {
  key: string
}

// 获取整个可用图标集的列表
export async function fetchAllIconCollections(): Promise<Record<string, APIv2CollectionsList>> {
  return await fetch('https://api.iconify.design/collections?pretty=1').then(res => res.json());
}

export interface APIv2CollectionResponse {
  prefix: string
  total: number
  title?: string
  info?: IconifyInfo
  uncategorized?: string[]
  categories?: Record<string, string[]>
  hidden?: string[]
  aliases?: Record<string, string>
  chars?: Record<string, string>
  themes?: IconifyJSON['themes']
  prefixes?: IconifyJSON['prefixes']
  suffixes?: IconifyJSON['suffixes']
  icons?: string[]
}
// 获取指定图标集中的图标列表
export async function fetchIconsByCollection(name: string): Promise<APIv2CollectionResponse> {
  return await fetch(`https://api.iconify.design/collection?prefix=${name}&pretty=1&chars=true`).then(res => res.json());
}
