import { Snackbar, Alert } from '@mui/material';

export type NotificationSeverity = 'success' | 'error' | 'info' | 'warning';

interface NotificationProps {
    open: boolean;
    message: string;
    severity?: NotificationSeverity;
    duration?: number;
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
    open,
    message,
    severity = 'info',
    duration = 3000,
    onClose,
}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={duration}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%', borderRadius: '8px' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
