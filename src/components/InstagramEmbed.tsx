import { useEffect } from 'react';
import { Box } from '@mui/material';

interface InstagramEmbedProps {
  url: string;
  width?: string;
}

export function InstagramEmbed({ url, width = '100%' }: InstagramEmbedProps) {
  useEffect(() => {
    if (window.instgrm) return;

    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (window.instgrm?.Embeds.process) {
      window.instgrm.Embeds.process();
    }
  }, [url]);

  return (
    <Box sx={{ width, maxWidth: '100%', overflow: 'hidden' }}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: '3px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '0',
          maxWidth: '100%',
          minWidth: '100%',
          width: '100%',
          padding: 0,
          boxSizing: 'border-box',
        }}
      />
    </Box>
  );
}
