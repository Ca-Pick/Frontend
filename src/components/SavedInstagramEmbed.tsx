import {
  Box,
  Button
} from '@mui/material';
import { borderRadius } from "../theme/radius";
import { InstagramEmbed } from '../components/InstagramEmbed';

const cherryBtn = "/src/assets/images/cherry.svg";
const INSTAGRAM_URL = "https://www.instagram.com/p/DFxF4K8yG6D/";

function SavedInstagramEmbed() {

  return (
      <Box sx={{
        width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', px: 2, border: '1px solid #eeeeee', borderRadius: borderRadius['small'], boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.04), 0 0 4px 3px rgba(51, 51, 51, 0.02)', position: 'relative',
      }}>
       <InstagramEmbed url={INSTAGRAM_URL} width="120px" />
        <Box sx={{
            display: 'flex', gap: 1, alignItems: 'center'
        }}>
            <Button size="small" variant="contained" color="secondary" fullWidth>
                 상세보기
            </Button>
             <Box component="img" src={cherryBtn} />
        </Box>
    </Box>
  );
}
export default SavedInstagramEmbed;