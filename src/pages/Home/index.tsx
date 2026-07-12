import { Box } from '@mui/material';
import { HeroSection } from './section/HeroSection';
import InstagramEmbdeSection from './section/InstagramEmbdeSection';

export function Home() {
  return (
    <Box sx={{ width: '100%' }}>
      <HeroSection />
      <InstagramEmbdeSection />
      <Box sx={{ flex: 1 }} />
    </Box>
  );
}
