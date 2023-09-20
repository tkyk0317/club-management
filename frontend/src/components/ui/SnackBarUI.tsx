import { forwardRef, SyntheticEvent } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

type Props = {
  message: string
  open: boolean
  onHandleClose: () => void
}
export default function SnackBarUI(props: Props) {
  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props: any,
    ref: any,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const onHandleClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    props.onHandleClose();
  };

  return (
    <Snackbar
      open={props.open}
      autoHideDuration={6000}
      onClose={onHandleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onHandleClose} severity="success" sx={{ width: '100%' }}>
        {props.message}
      </Alert>
    </Snackbar>
  )
}