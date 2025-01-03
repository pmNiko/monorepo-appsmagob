import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '15em',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
}

interface Props {
  children: JSX.Element
  open: boolean
}

export const SimpleModal = ({ children, open }: Props) => {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  )
}
