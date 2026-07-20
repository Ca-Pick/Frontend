import { Box } from '@mui/material';
import { HeroSection } from './section/HeroSection';
import InstagramEmbdeSection from './section/InstagramEmbdeSection';
import { useNavigate } from 'react-router-dom';


export function Home() {
    const navigate = useNavigate();
  return (
    <Box sx={{ width: '100%' }}>
      <HeroSection onNavigateToOrder={() => navigate('/order')}/>
      <InstagramEmbdeSection category="birthday" />
      <InstagramEmbdeSection category="celebration" />
      <InstagramEmbdeSection category="academic" />
    </Box>
  );
}
