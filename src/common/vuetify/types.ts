
export type TButton = {
  color?: string;
  depressed?: boolean;
  icon?: boolean;
  outlined?: boolean;
  plain?: boolean;
  rounded?: boolean;
  text?: boolean;
  tile?: boolean;
  block?: boolean;
  small?: boolean;
  xSmall?:boolean
  large?: boolean;
  xLarge?:boolean
}

export type TTableOptions = {
  page?: number,
  itemsPerPage?: number,
  sortBy?: string[],
  sortDesc?: boolean[],
  groupBy?: string[],
  groupDesc?: boolean[],
  multiSort?: boolean,
  mustSort?: boolean
}

export interface ITableHeaders {
  text: string,
  value: string,
  align?: 'start' | 'center' | 'end',
  sortable?: boolean,
  filterable?: boolean,
  groupable?: boolean,
  divider?: boolean,
  class?: string | string[],
  cellClass?: string | string[],
  width?: string | number,
  filter?: (value: any, search: string, item: any) => boolean,
  sort?: (a: any, b: any) => number
}

export interface ITable {
  checkboxColor?: [string | undefined];
  customFilter?: (value: any, search: string | null, item: any) => boolean
  dark?: boolean;
  dense?: boolean;
  disableFiltering?: boolean;
  disablePagination?: boolean;
  disableSort?: boolean;
  fixedHeader?: boolean;
  height?: [number | string | undefined];
  hideDefaultFooter?: boolean;
  hideDefaultHeader?: boolean;
  itemClass?: [string|null]
  itemKey?: string;
  itemPerPage?: number;
  light?: boolean;
  loaderHeight?: [number | string];
  loading?: boolean;
  locale?: string;
  mobileBreakpoint?: number;
  multiSort?: boolean;
  noDataText?: string;
  noResultsText?: string;
  options?: TTableOptions;
  search?: string|undefined;
}
