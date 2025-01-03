import { TableCell, TableRow } from '@mui/material'

type RowSummary = {
  title: string
  totalEmp: number
  totalRem: number
  totalFam: number
  totalExc: number
  totalRet: number
  total: number
}

function ccyFormat(num: number) {
  const format = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARG' }).format(num)
  const amount = format.split('ARG')[0]
  return amount.trim()
}

export const RowSummary = ({
  totalEmp,
  total,
  totalRem,
  totalFam,
  totalExc,
  totalRet,
}: RowSummary) => {
  return (
    <TableRow>
      <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '0.8em', borderColor: '#fff' }}>
        Totales
      </TableCell>
      <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '0.8em', borderColor: '#fff' }}>
        {totalEmp}
      </TableCell>
      <TableCell
        align="right"
        sx={{ fontWeight: 'bold', fontSize: '0.8em', borderColor: '#fff', pr: 5 }}
      >
        {ccyFormat(total)}
      </TableCell>
      <TableCell
        align="right"
        sx={{ fontWeight: 'bold', fontSize: '0.8em', borderColor: '#fff', pr: 5 }}
      >
        {ccyFormat(totalRem)}
      </TableCell>
      <TableCell
        align="right"
        sx={{ fontWeight: 'bold', fontSize: '0.8em', borderColor: '#fff', pr: 5 }}
      >
        {ccyFormat(totalFam)}
      </TableCell>
      <TableCell
        align="right"
        sx={{ fontWeight: 'bold', fontSize: '0.8em', borderColor: '#fff', pr: 5 }}
      >
        {ccyFormat(totalExc)}
      </TableCell>
      <TableCell
        align="right"
        sx={{ fontWeight: 'bold', fontSize: '0.8em', borderColor: '#fff', pr: 5 }}
      >
        {ccyFormat(totalRet)}
      </TableCell>
    </TableRow>
  )
}
