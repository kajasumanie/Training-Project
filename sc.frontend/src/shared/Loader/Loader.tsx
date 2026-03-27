import { CircularProgress } from "@mui/material"

const Loader = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
        }}>
            <CircularProgress
                size={60}
                thickness={4}
                sx={{
                    color: 'primary.main',
                    animation: 'spin 1s linear infinite'
                }}
            />
        </div>
    )
}

export default Loader;