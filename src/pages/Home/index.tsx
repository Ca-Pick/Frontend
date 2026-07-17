import { Box } from '@mui/material';
import { HeroSection } from './section/HeroSection';
import InstagramEmbdeSection from './section/InstagramEmbdeSection';

export function Home() {
  return (
    <Box sx={{ width: '100%' }}>
      <HeroSection />
      <InstagramEmbdeSection />
      <InstagramEmbdeSection />
      <InstagramEmbdeSection />
    </Box>
  );
}
