# AG-Table Plugin

Простая обертка для ag-grid

## Installation
Для установки пакета, должен быть доступ к репозиторию и наличие SSH ключа
```bash
npm install --save ssh://git@gitlab.com:lf-service/ag-table-plugin.git
```
## Get Started

Глобальное подключения плагина в main.ts
```javascript
import Vue from 'vue';
import DataTable from 'data-table';

Vue.use(DataTable);
```

## Props

| Название свойства | Аргументы                    | Описание                                                    |
| ----------------- | ---------------------------- | ----------------------------------------------------------- |
| rowData           | Array<any>                   | Массив содержащий объекты данных для отображения в таблице. |
| columnDefs        | Array<TColDef><br />[<br />] | Массив содержащий описание для полей объекта данных         |
|                   |                              |                                                             |
|                   |                              |                                                             |
|                   |                              |                                                             |
|                   |                              |                                                             |
|                   |                              |                                                             |
|                   |                              |                                                             |

