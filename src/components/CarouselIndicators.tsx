import { Box } from '@mui/material';

interface CarouselIndicatorsProps {
  total?: number;
  current?: number;
  onChange?: (index: number) => void;
}

function CarouselIndicators({ total = 3, current = 0, onChange = () => { } }: CarouselIndicatorsProps) {
  return (
    <Box sx={{ height: '10px' }}>
      <Box
        sx={{
          display: 'flex',
          gap: '6px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            onClick={() => onChange(index)}
            style={{
              width: index === current ? '16px' : '8px',
              height: '8px',
              borderRadius: '99px',
              backgroundColor: index === current ? '#AD2426' : '#E0E0E0',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === current ? 'true' : 'false'}
          />
        ))}
      </Box>
    </Box>
  );
}

export default CarouselIndicators;
