import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const LoadingCover = (props) => {
    const { loading } = props;
    return (
        <Backdrop sx={{ zIndex: '99999' }} open={loading}>
            <CircularProgress />
        </Backdrop>
    );
};
export default LoadingCover;
