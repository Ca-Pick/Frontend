import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

const imgLiSmile = "https://www.figma.com/api/mcp/asset/157b8ece-c081-4953-b0e0-30c821344207";
const imgLiHeart = "https://www.figma.com/api/mcp/asset/39e8b373-82e9-4f43-8f09-12bdadd64cb0";
const imgLiSearch = "https://www.figma.com/api/mcp/asset/53254d3b-9fd0-48b0-bf51-ad77176981a9";
const imgLiCherry = "https://www.figma.com/api/mcp/asset/0fea1753-7d83-49dc-b3ca-b11580d52a7c";

interface IconProps {
  sx?: SxProps<Theme>;
}

export function LiSmile({ sx }: IconProps) {
  return <Box component="img" src={imgLiSmile} sx={{ width: 24, height: 24, ...sx }} />;
}

export function LiHeart({ sx }: IconProps) {
  return <Box component="img" src={imgLiHeart} sx={{ width: 24, height: 24, ...sx }} />;
}

export function LiSearch({ sx }: IconProps) {
  return <Box component="img" src={imgLiSearch} sx={{ width: 24, height: 24, ...sx }} />;
}

export function LiCherry({ sx }: IconProps) {
  return <Box component="img" src={imgLiCherry} sx={{ width: 24, height: 24, ...sx }} />;
}
