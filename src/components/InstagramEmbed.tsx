import { Box } from '@mui/material';
import { useState, useEffect } from 'react';

interface InstagramEmbedProps {
  url: string;
  width?: string;
  height?: string;
}

export function InstagramEmbed({ url, width = '100%', height = '380' }: InstagramEmbedProps) {
  const postId = url.split('/p/')[1]?.split('/')[0];
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [url]);

  return (
    <Box sx={{
      width,
      maxWidth: '100%',
      overflow: 'hidden',
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.3s ease-in-out'
    }}>
      <iframe
        key={postId}
        src={`https://www.instagram.com/p/${postId}/embed`}
        width="100%"
        height={height}
        frameBorder="0"
        scrolling="no"
        allowtransparency="true"
        style={{ width: '100%', maxWidth: '100%', display: 'block' }}
      />
    </Box>
  );
}
