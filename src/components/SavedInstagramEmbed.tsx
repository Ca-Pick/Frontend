import {
  Box,
  Button
} from '@mui/material';
import { borderRadius } from "../theme/radius";
import { colors } from "../theme/colors";
import { InstagramEmbed } from '../components/InstagramEmbed';

const cherryBtn = "/src/assets/images/cherry.svg";
const INSTAGRAM_URL = "https://www.instagram.com/p/DFxF4K8yG6D/";

function SavedInstagramEmbed() {

  return (
      <Box sx={{
        width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #eeeeee', borderRadius: borderRadius['small'], boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.04), 0 0 4px 3px rgba(51, 51, 51, 0.02)', position: 'relative',
      }}>
       <InstagramEmbed url={INSTAGRAM_URL} width="100%" height="300" />
            <Box sx={{ height: "1px", bgcolor: colors.divider }} />
        <Box sx={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2
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