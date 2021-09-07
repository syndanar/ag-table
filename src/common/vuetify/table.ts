import { ITable } from '@/common/vuetify/types'

export default function (defs: ITable): ITable {
  const props = ['checkboxColor', 'customFilter', 'dark', 'dense', 'disableFiltering', 'disablePagination',
    'disableSort', 'fixedHeader', 'height', 'hideDefaultFooter', 'hideDefaultHeader', 'itemKey', 'itemClass', 'light',
    'loaderHeight', 'options'
  ]
  const options: ITable = {
    itemPerPage: defs?.itemPerPage || 25,
    loading: defs?.loading || false,
    locale: defs?.locale || 'ru-RU',
    mobileBreakpoint: defs?.mobileBreakpoint || 600,
    multiSort: defs?.multiSort || true,
    noDataText: defs?.noDataText || 'Нет данных для отображения',
    noResultsText: defs?.noResultsText || 'Нет данных для отображения',
    search: defs?.search || undefined
  }
  if (defs) {
    props.forEach(prop => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (defs[prop]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        options[prop] = defs[prop]
      }
    })
  }

  return options
}
