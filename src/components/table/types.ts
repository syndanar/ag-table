import { ICellRendererParams } from 'ag-grid-community'
import { TButton } from '@/common/vuetify/types'

export type TRowAction = {
  icon: string | null;
  text: string | null;
  action: string;
  buttonDef?: TButton
}

export type TRowDefs = {
  actions: Array<TRowAction> | [];
  actionsHeader?: string
}

export type TColDef = {
  headerName: string,
  field: string,
  editable: boolean,
  sortable: boolean
}

export type THeadButton = {
  position: 'left' | 'middle' | 'right';
  icon: string | null;
  label: string | null;
  action: string | null;
  defs: TButton;
  show?: boolean;
  disabled?: boolean;
}

export type THeadFilter = {
  position: string | 'left';
  show?: boolean;
}

export type THeadDefs = {
  buttons: Array<THeadButton> | [];
  filter: THeadFilter;
}

export type TTableDefs = {
  multiselect: boolean;
  selectedRows: Array<any>;
  loading: boolean;
}

export type TCellData = {
  row: any,
  columnDef: TColDef,
  value: string
}

export interface IDataTableActionsCellRendererParams extends ICellRendererParams {
  config: Array<TRowAction>
}
