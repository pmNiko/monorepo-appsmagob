import { TableCell, TableRow } from '@mui/material'

type RowSalary = {
  idsecretaria: string
  secretaria: string
  idtipocontratacion: string
  tipocontratacion: string
  tot_remunerativo: string
  tot_familiar: string
  tot_exento: string
  retencion_ley: string
  neto: string
  hsextras_50: string
  hsextras_100: string
  cantidadempleados: string
}

function capitalize(str: string) {
  const lower = str.toLowerCase()
  return str.charAt(0).toUpperCase() + lower.slice(1)
}

function ccyFormat(num: string) {
  const format = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARG' }).format(
    parseFloat(num)
  )
  const amount = format.split('ARG')[0]
  return amount.trim()
}

export const RowBody = ({
  tipocontratacion,
  neto,
  cantidadempleados,
  tot_remunerativo,
  tot_familiar,
  tot_exento,
  retencion_ley,
}: RowSalary) => {
  return (
    <TableRow>
      <TableCell align="left" sx={{ fontSize: '0.8em', borderColor: '#fff' }}>
        {capitalize(tipocontratacion)}
      </TableCell>
      <TableCell align="center" sx={{ fontSize: '0.8em', borderColor: '#fff' }}>
        {cantidadempleados}
      </TableCell>
      <TableCell align="right" sx={{ fontSize: '0.8em', borderColor: '#fff', pr: 5 }}>
        {ccyFormat(neto)}
      </TableCell>
      <TableCell align="right" sx={{ fontSize: '0.8em', borderColor: '#fff', pr: 5 }}>
        {ccyFormat(tot_remunerativo)}
      </TableCell>
      <TableCell align="right" sx={{ fontSize: '0.8em', borderColor: '#fff', pr: 5 }}>
        {ccyFormat(tot_familiar)}
      </TableCell>
      <TableCell align="right" sx={{ fontSize: '0.8em', borderColor: '#fff', pr: 5 }}>
        {ccyFormat(tot_exento)}
      </TableCell>
      <TableCell align="right" sx={{ fontSize: '0.8em', borderColor: '#fff', pr: 5 }}>
        {ccyFormat(retencion_ley)}
      </TableCell>
    </TableRow>
  )
}
