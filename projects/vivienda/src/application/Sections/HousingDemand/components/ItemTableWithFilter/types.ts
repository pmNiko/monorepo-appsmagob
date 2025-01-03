import { MRT_ColumnDef } from 'material-react-table'
import { type SorteoDHResponse } from '../../interfaces'

export type GenericItemType = SorteoDHResponse

export interface ItemTableWithFilterProps<ItemStruct extends GenericItemType> {
    items: ItemStruct[]
    columns: MRT_ColumnDef<ItemStruct>[]
    isLoading: boolean
    grouping: keyof ItemStruct | 'no_grouping'
    extraInvisibleColumn?: keyof ItemStruct | 'no_grouping'
    msgFallback: string
    heigth: number
    rowKey: keyof ItemStruct
}
