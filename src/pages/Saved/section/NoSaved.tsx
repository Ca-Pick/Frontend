import { Box, Typography, Button } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import imgSavedCake from '../../../assets/images/saved_cake.png';

interface NoSavedProps {
    onNavigateToOrder?: () => void;
}

export function NoSaved({ onNavigateToOrder }: NoSavedProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                height: '589px',
                padding: '60px 10px 150px 10px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
                <Box
                    component="img"
                    src={imgSavedCake}
                    sx={{
                        width: '140px',
                        height: '169px',
                        objectFit: 'cover',
                    }}
                />
                <Typography variant="t2_b" color='textPrimary'>
                    아직 좋아요한 케이크가 없어요!
                </Typography>
            </Box>
            <Button
                variant="text"
                color="primary"
                size="large"
                endIcon={<ChevronRightIcon />}
                onClick={onNavigateToOrder}>
                케이크 보러가기</Button>
        </Box>
    );
}
