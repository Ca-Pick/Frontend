import { Box, Typography, Button } from '@mui/material';

const imglogoText = "/src/assets/images/logo_text.svg";

export function LoginForm() {
    return (
        <Box
            sx={{
                display: 'flex',
                height: '645px',
                padding: '25px 16px 51px 16px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '143px'
            }}
        >
            <Box
                component="img"
                src={imglogoText}
                sx={{
                    objectFit: 'cover',
                }}
            />
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: '12px', }}>
                <Button>
                    카카오톡으로 계속하기
                </Button>
                <Button>
                    네이버로 계속하기
                </Button>
            </Box>
        </Box>
    );
}
