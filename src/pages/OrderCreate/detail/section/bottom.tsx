import { Box, Typography, Button, Chip } from "@mui/material";
import { colors } from "../../../../theme/colors";
import AddIcon from "@mui/icons-material/Add";
import InstagramIcon from "@mui/icons-material/Instagram";
import SavedInstagramEmbed from "../../../../components/SavedInstagramEmbed";
import { HeartToggle } from "../../../../components/HeartToggle";
import { useState } from "react";

interface BottomSectionProps {
    activeTab: "info" | "location" | "other";
    onTabChange: (tab: "info" | "location" | "other") => void;
    selectedTags?: string[];
    location?: string;
    recipient?: string;
    cakeType?: string;
    color?: string;
    mood?: string;
}

export function BottomSection({ activeTab, onTabChange, selectedTags = [], location, recipient, cakeType, color, mood }: BottomSectionProps) {
    const orderInfoArray = [location, recipient, cakeType, color, mood].filter(Boolean);
    return (
        <Box sx={{ backgroundColor: '#fff' }}>
            <Box
                sx={{
                    display: "flex",
                    gap: 8,
                    px: 3,
                    py: 2
                }}
            >
                {(["info", "location", "other"] as const).map((tab) => (
                    <Typography
                        key={tab}
                        variant="b2_b"
                        onClick={() => onTabChange(tab)}
                        sx={{
                            cursor: "pointer",
                            color: activeTab === tab ? colors.text.primary : "#757575",
                            transition: "all 0.2s ease",
                            pb: 1,
                            borderBottom: activeTab === tab ? `3px solid ${colors.primary.main}` : "none",
                            px: '6px'
                        }}
                    >
                        {tab === "info" ? "상세정보" : tab === "location" ? "위치" : "다른 케이크"}
                    </Typography>
                ))}
            </Box>
            <Box>
                {activeTab === "info" && <InfoSection tags={selectedTags} orderInfo={orderInfoArray} />}
                {activeTab === "location" &&
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, padding: '28px 16px 16px 16px' }}>
                        <LocationSection />
                        <Button
                            variant="contained"
                            color="primary"
                            size="xlarge"
                            fullWidth
                            startIcon={<InstagramIcon />}
                        >
                            Instagram으로 문의하기
                        </Button>
                        <Box sx={{ height: "1px", bgcolor: colors.divider }} />
                        <OtherSection />
                    </Box>
                }
                {activeTab === "other" &&
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, padding: '28px 16px 16px 16px' }}>
                        <OtherSection />
                    </Box>}
            </Box>

            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    padding: '13px 16px',
                    borderTop: `1px solid ${colors._components.table.border}`,
                    position: 'sticky',
                    bottom: 0,
                    backgroundColor: '#fff',
                    zIndex: 10,
                }}
            >
                <Box
                    sx={{
                        width: "43px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: `1px solid ${colors.divider}`,
                        borderRadius: '14px',
                    }}
                >
                    <HeartToggle />
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    size="xlarge"
                    fullWidth
                    startIcon={<InstagramIcon />}
                    sx={{ flex: 1 }}
                >
                    Instagram으로 문의하기
                </Button>
            </Box>
        </Box>
    );
}

interface InfoSectionProps {
    tags?: string[];
    orderInfo?: string[];
}

function InfoSection({ tags = [], orderInfo = [] }: InfoSectionProps) {
    const allTags = [...orderInfo, ...tags];
    const [showMoreTags, setShowMoreTags] = useState(false);
    const displayedTags = showMoreTags ? allTags : allTags.slice(0, 5);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, padding: '28px 16px 16px 16px' }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="t2_b" sx={{ color: "black", textAlign: 'left' }}>
                    태그 정보
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {displayedTags.map((tag) => (
                        <Chip
                            key={tag}
                            label={tag}
                            variant="static"
                        />
                    ))}
                </Box>
                {allTags.length >= 6 && !showMoreTags && (
                    <Box sx={{ display: "flex" }}>
                        <Button
                            variant="text"
                            size="small"
                            sx={{ display: "flex", alignItems: "center", gap: 1, width: 'fit-content', p: 0 }}
                            onClick={() => setShowMoreTags(true)}
                        >
                            <AddIcon sx={{ fontSize: "16px", color: "#616161" }} />
                            <Typography variant="label_3" sx={{ color: "#616161" }}>
                                태그 더보기
                            </Typography>
                        </Button>
                    </Box>
                )}
            </Box>
            <Box sx={{ height: "1px", bgcolor: colors.divider }} />
            <LocationSection />
            <Button
                variant="contained"
                color="primary"
                size="xlarge"
                fullWidth
                startIcon={<InstagramIcon />}
            >
                Instagram으로 문의하기
            </Button>
            <Box sx={{ height: "1px", bgcolor: colors.divider }} />
            <OtherSection />
        </Box>
    );
}

function LocationSection() {
    const imgMap = "https://www.figma.com/api/mcp/asset/71f041b9-f48e-4b06-9b62-3fa074e58e4d";

    return (
        <Box sx={{ display: "flex", gap: 4 }}>
            <Typography variant="t2_b" sx={{ color: "black", whiteSpace: 'nowrap' }}>
                위치
            </Typography>
            <Box sx={{ display: "flex", flexDirection: 'column', gap: 2, alignItems: "flex-start" }}>

                <Typography variant="b2_r" sx={{ color: "black" }}>
                    서울 서대문구 연희로12길 10-4 1층 FAUCET
                </Typography>

                <Box
                    component="img"
                    src={imgMap}
                    alt="map"
                    sx={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                    }}
                />
            </Box>
        </Box>
    );
}

function OtherSection() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: 'flex-start' }}>
            <Typography variant="t2_b" sx={{ color: "black" }}>
                이 가게의 다른 케이크
            </Typography>
            <SavedInstagramEmbed showCarousel={false} />
        </Box>
    );
}
