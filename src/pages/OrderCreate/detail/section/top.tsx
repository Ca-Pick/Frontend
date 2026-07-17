import { Box, Typography, IconButton } from "@mui/material";
import { colors } from "../../../../theme/colors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { InstagramEmbed } from '../../../../components/InstagramEmbed';

interface TopSectionProps {
    activeTab: "info" | "location" | "other";
    onTabChange: (tab: "info" | "location" | "other") => void;
    onBack?: () => void;
}

export function TopSection({ activeTab, onTabChange, onBack }: TopSectionProps) {
    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    display: "flex",
                    alignItems: "flex-start",
                    px: 2,
                    py: 2,
                    bgcolor: "#ffffff",
                    borderBottom: `1px solid ${colors.divider}`,
                    flexDirection: 'column'
                }}
            >
                <IconButton onClick={onBack}>
                    <ArrowBackIcon />
                </IconButton>
                <InstagramEmbed url="https://www.instagram.com/p/DFxF4K8yG6D/" />
            </Box>
            <Box
                sx={{
                    height: "60px",
                    mt: -5,
                    position: "relative",
                    zIndex: 1,
                }}
            />

            <Box
                sx={{
                    mt: -4,
                    position: "relative",
                    zIndex: 2,
                    padding: '24px 18px 24px 17px',
                    bgcolor: colors.background,
                    borderTopLeftRadius: '24px',
                    borderTopRightRadius: '24px',
                    borderBottom: `1px solid ${colors.divider}`
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: '4px', width: "100%" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="t1_b" sx={{ color: "black" }}>
                            FAUCET 포싵
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: '4px', alignItems: "center", color: "#757575" }}>
                        <LocationOnIcon fontSize="15" />
                        <Typography variant="bm_3">
                            서울 서대문구 연희로12길 10-4 1층 FAUCET
                        </Typography>
                    </Box>
                </Box>
            </Box>




        </>
    );
}
