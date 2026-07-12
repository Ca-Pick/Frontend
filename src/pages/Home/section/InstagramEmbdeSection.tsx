import { useEffect } from "react";
import {
  Box,
  Typography,
  Chip,
  IconButton
} from '@mui/material';
import { colors } from '../../../theme/colors';
import { borderRadius } from '../../../theme/radius';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CarouselIndicators from '../../../components/CarouselIndicators'

const cherryBtn = "/src/assets/images/cherry.svg";

function InstagramEmbdeSection() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        px: 2,
        py: 3,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        gap: 2,
      }}
    >
      <Typography variant="t2_b" color={colors.common.black._states.main}>
        추천 레퍼런스 큐레이션
      </Typography>
      <Box sx={{
        width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', px: 2, border: '1px solid #eeeeee', borderRadius: borderRadius['xl'], boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.04), 0 0 4px 3px rgba(51, 51, 51, 0.02)', position: 'relative',
      }}>
        <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
          <blockquote
            className="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/p/DFxF4K8yG6D/"
            data-instgrm-version="14"
            style={{
              background: "#FFF",
              border: 0,
              borderRadius: "3px",
              boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
              margin: "0",
              maxWidth: "100%",
              minWidth: "100%",
              width: "100%",
              padding: 0,
              boxSizing: "border-box",
            }}
          />
        </Box>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip label="#인기" variant="static" />
            <Chip label="#인기" variant="static" />
            <Chip label="#인기" variant="static" />
          </Box>
          <Box component="img" src={cherryBtn} />
          <IconButton
            sx={{
              position: 'absolute',
              left: 3.789,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: colors.secondary._states.hover,
              borderRadius: '50%',
              padding: '5px',
              '&:hover': {
                backgroundColor: colors.secondary._states.selected,
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            sx={{
              position: 'absolute',
              right: 4.211,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: colors.secondary._states.hover,
              borderRadius: '50%',
              padding: '5px',
              '&:hover': {
                backgroundColor: colors.secondary._states.selected,
              },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{height: '10px'}}>
        <CarouselIndicators />
      </Box>
    </Box>
  );
}
export default InstagramEmbdeSection;