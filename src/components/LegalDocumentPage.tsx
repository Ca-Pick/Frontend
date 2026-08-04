import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { colors } from '../theme/colors';

interface LegalDocumentPageProps {
  title: string;
  body: string;
}

export function LegalDocumentPage({ title, body }: LegalDocumentPageProps) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          padding: '8px 8px',
          backgroundColor: '#fff',
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          padding: '24px 16px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <Typography variant="t2_b" sx={{ color: '#000', whiteSpace: 'pre-wrap' }}>
          {title}
        </Typography>
        <Typography
          variant="label_3"
          sx={{ color: '#000', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {body}
        </Typography>
      </Box>
    </Box>
  );
}
