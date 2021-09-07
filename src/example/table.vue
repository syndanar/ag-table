<template>
  <v-app>
    <v-container>
      <v-card outlined elevation="4">
        <v-card-title>
          Test table
        </v-card-title>
        <v-card-text>
          <data-table
            :rowData="rowData"
            :columnDefs="columnDefs"
            :rowDefs="rowDefs"
            :headDefs="headDefs"
            :tableDefs="tableDefs"
            @multiselect="multiselectClick"
            @multidelete="multideleteClick"
            @addRow="addRow"
            @update:cell="updateCell"
            @editRow="editRow"
            @copyRow="copyRow"
            @deleteRow="deleteRow"
          ></data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { TCellData, THeadDefs, THeadFilter, TRowDefs, TTableDefs } from '@/components/table/types'
import { ColDef } from 'ag-grid-community'

@Component({
  name: 'data-table-example'
})
export default class ExampleTable extends Vue {
  private IconEdit = require('@/assets/icons/edit.svg')
  private IconCross = require('@/assets/icons/cross.svg')
  private IconPlus = require('@/assets/icons/plus.svg')
  private IconCopy = require('@/assets/icons/copy.svg')
  private IconTrash = require('@/assets/icons/trashcan-grey.svg')
  private IconHighlight = require('@/assets/icons/highlight.svg')

  private multiselect = false

  protected rowData = [
    {
      id: 1,
      name: 'Андрей Морозов',
      position: 'Менеджер по продажам',
      phone: '+79288887799',
      email: 'hi@leadfrog.pro'
    },
    {
      id: 2,
      name: 'Артем Давыдов',
      position: 'Дизайнер',
      phone: '+79229839821',
      email: 'design@leadfrog.pro'
    },
    {
      id: 3,
      name: 'Егор Ктототамович',
      position: 'Frontend разработчик',
      phone: '+79179839321',
      email: 'frontend@leadfrog.pro'
    }
  ];

  protected columnDefs: Array<ColDef> = [
    {
      field: 'name',
      headerName: 'Имя Фамилия',
      sortable: true,
      editable: true
    },
    {
      field: 'position',
      headerName: 'Должность',
      sortable: true,
      editable: true
    },
    {
      field: 'phone',
      headerName: 'Телефон',
      sortable: true,
      editable: true
    },
    { field: 'email', headerName: 'Адрес эл. почты', sortable: true, editable: true }
  ]

  protected rowDefs: TRowDefs = {
    actions: [
      {
        icon: this.IconEdit,
        action: 'editRow',
        buttonDef: {
          icon: true,
          color: 'primary'
        }
      },
      {
        icon: this.IconCopy,
        action: 'copyRow',
        buttonDef: {
          icon: true,
          color: 'info'
        }
      },
      {
        icon: this.IconTrash,
        action: 'deleteRow',
        buttonDef: {
          icon: true,
          color: 'danger'
        }
      }
    ],
    actionsHeader: 'Функции'
  }

  protected tableDefs: TTableDefs = {
    multiselect: false,
    selectedRows: [],
    loading: false
  }

  addRow (): void {
    let id = 0
    this.rowData.forEach((row): void => { id = Math.max(row.id, id) })
    this.rowData.push({
      id: id + 1,
      position: '',
      email: '',
      name: '',
      phone: ''
    })
  }

  copyRow (row: Array<any>): void {
    let id = 0
    this.rowData.forEach((row): void => { id = Math.max(row.id, id) })
    const copy = Object.assign({}, row)
    copy.id = id + 1
    this.rowData.push(copy)
  }

  editRow (row: Array<any>): void {
    console.log('Edit row')
    console.log(row)
  }

  deleteRow (row: Array<any>): void {
    console.log(this.rowData)
    this.tableDefs.loading = true
    // Имитация запроса на бекенд
    setTimeout(() => {
      this.rowData = this.rowData.filter(r => r !== row)
      this.tableDefs.loading = false
    }, 1000)
  }

  updateCell (data: TCellData): void {
    const row = this.rowData.find(row => row === data.row)
    row[data.columnDef.field] = data.value
    console.log('update cell: ', data)
  }

  multiselectClick (): void {
    this.tableDefs.multiselect = !this.tableDefs.multiselect
  }

  multideleteClick (): void {
    console.log(this.tableDefs.selectedRows)
    this.tableDefs.loading = true
    // Эмитация выполнения команды удаления на бекенде
    setTimeout(() => {
      this.rowData = this.rowData.filter(row => {
        return !this.tableDefs.selectedRows.includes(row)
      })
      this.tableDefs.loading = false
      this.tableDefs.multiselect = false
    }, 1000)
  }

  get headDefs ():THeadDefs {
    const filter: THeadFilter = {
      position: 'left',
      show: !this.tableDefs.multiselect
    }
    return {
      buttons: [
        {
          position: 'right',
          icon: this.IconHighlight,
          show: !this.tableDefs.multiselect,
          action: 'multiselect',
          label: 'Выбрать',
          defs: {
            color: 'primary'
          }
        },
        {
          position: 'right',
          icon: this.IconPlus,
          show: !this.tableDefs.multiselect,
          action: 'addRow',
          label: 'Добавить',
          defs: {
            color: 'success'
          }
        },
        {
          position: 'left',
          icon: this.IconHighlight,
          show: this.tableDefs.multiselect,
          action: 'multidelete',
          label: 'Удалить',
          defs: {
            color: 'primary'
          }
        },
        {
          position: 'right',
          icon: this.IconCross,
          show: this.tableDefs.multiselect,
          action: 'multiselect',
          label: 'Завершить',
          defs: {
            color: 'warning'
          }
        }
      ],
      filter
    }
  }
}
</script>
