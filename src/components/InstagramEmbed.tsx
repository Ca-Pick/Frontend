import { Box } from '@mui/material';

interface InstagramEmbedProps {
  url: string;
  width?: string;
  height?: string;
}

export function InstagramEmbed({ url, width = '100%', height = '380' }: InstagramEmbedProps) {
  const postId = url.split('/p/')[1]?.split('/')[0];

  return (
    <Box sx={{ width, maxWidth: '100%', overflow: 'hidden' }}>
      <iframe
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
