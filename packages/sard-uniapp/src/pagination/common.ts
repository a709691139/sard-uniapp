import { type PropType, type StyleValue } from 'vue'

export interface PaginationProps {
  rootStyle?: StyleValue
  rootClass?: string
  total?: number
  pageSize?: number
  current?: number
  pageCount?: number
  pageButtonCount?: number
  hideOnSinglePage?: boolean
  type?: 'simple' | 'multi'
  ellipsis?: boolean
  multiCount?: number
}

// const props = withDefaults(defineProps<PaginationProps>(), {
//   total: 0,
//   current: 1,
//   pageSize: 10,
//   pageButtonCount: 5,
//   type: 'multi',
//   multiCount: 5,
// })

export const PaginationProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  total: {
    type: Number,
    default: 0,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  current: {
    type: Number,
    default: 1,
  },
  pageCount: Number,
  pageButtonCount: {
    type: Number,
    default: 5,
  },
  hideOnSinglePage: Boolean,
  type: {
    type: String as PropType<NonNullable<PaginationProps['type']>>,
    default: 'multi',
  },
  ellipsis: Boolean,
  multiCount: {
    type: Number,
    default: 5,
  },
}

export interface PaginationSlots {
  prev(props: Record<string, never>): any
  next(props: Record<string, never>): any
}

export interface PaginationEmits {
  (e: 'update:current', page: number): void
}

/**
 * @description: 获取页面范围
 * @param {number} current 当前页码
 * @param {number} pageCount 总页数
 * @param {number} pageItemCount 要展示的页数
 * @return {[number, number]}
 */
export function getPageRange(
  current: number,
  pageCount: number,
  pageItemCount: number,
) {
  let min = current - Math.ceil((pageItemCount - 1) / 2)
  let max = current + Math.floor((pageItemCount - 1) / 2)
  const minLack = 1 - min
  const maxLack = max - pageCount
  if (maxLack > 0) {
    min -= maxLack
  }
  if (min < 1) {
    min = 1
  }
  if (minLack > 0) {
    max += minLack
  }
  if (max > pageCount) {
    max = pageCount
  }

  return [min, max]
}
