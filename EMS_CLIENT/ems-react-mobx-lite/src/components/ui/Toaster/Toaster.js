import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { observer } from 'mobx-react-lite'
import { useAppStoreContext } from '../../../store-config/hooks/useAppStoreContext'

export const Toaster = observer(({message, type, ...otherProps}) => {
    const { toaster } = useAppStoreContext();
    const handleClose = () => {
        toaster.setOpen(false)
    }
    
    let color = 'red';
    if(type === 'success'){
        color = 'green'
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            autoHideDuration={3000}
            onClose={handleClose}
            open={toaster.open}
            {...otherProps}
            style={{ maxWidth: '95vw', width: 'fit-content', padding: 0 }}
        >
            <Alert 
                style={{ backgroundColor: color, fontSize: 16, opacity: 0.95,}} 
                variant="filled"
                onClose={handleClose}
                severity={type}
            >
                {message}
            </Alert>
        </Snackbar>
    )
})

