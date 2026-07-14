import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

const imgLiSmile = "https://www.figma.com/api/mcp/asset/157b8ece-c081-4953-b0e0-30c821344207";
const imgLiHeart = "https://www.figma.com/api/mcp/asset/39e8b373-82e9-4f43-8f09-12bdadd64cb0";
const imgLiSearch = "https://www.figma.com/api/mcp/asset/53254d3b-9fd0-48b0-bf51-ad77176981a9";
const imgLiCherry = "https://www.figma.com/api/mcp/asset/0fea1753-7d83-49dc-b3ca-b11580d52a7c";
const imgLiArrowLeft = "https://www.figma.com/api/mcp/asset/e10f0abc-2bda-48d2-81d8-b17aa6b1053b";
const imgLiChevronDown = "https://www.figma.com/api/mcp/asset/6a38ce55-3570-45d6-9d82-ef9ba47c781a";
const imgCancelFilled = "https://www.figma.com/api/mcp/asset/e1c70c70-b9c5-496b-b220-519d707ee637";

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

export function LiArrowLeft({ sx }: IconProps) {
  return <Box component="img" src={imgLiArrowLeft} sx={{ width: 24, height: 24, ...sx }} />;
}

export function LiChevronDown({ sx }: IconProps) {
  return <Box component="img" src={imgLiChevronDown} sx={{ width: 16, height: 16, ...sx }} />;
}

export function CancelFilled({ sx }: IconProps) {
  return <Box component="img" src={imgCancelFilled} sx={{ width: 16, height: 16, ...sx }} />;
}
