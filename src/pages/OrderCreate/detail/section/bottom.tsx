import { Box, Typography, Button, Chip } from "@mui/material";
import { colors } from "../../../../theme/colors";
import AddIcon from "@mui/icons-material/Add";
import InstagramIcon from "@mui/icons-material/Instagram";
import SavedInstagramEmbed from "../../../../components/SavedInstagramEmbed";
import cherryBtn from "../../../../assets/images/cherry.svg";

interface BottomSectionProps {
    activeTab: "info" | "location" | "other";
    onTabChange: (tab: "info" | "location" | "other") => void;
}

export function BottomSection({ activeTab, onTabChange }: BottomSectionProps) {
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
                            borderBottom: activeTab === tab ? `2px solid ${colors.primary.main}` : "none",
                        }}
                    >
                        {tab === "info" ? "상세정보" : tab === "location" ? "위치" : "다른 케이크"}
                    </Typography>
                ))}
            </Box>
            <Box sx={{ padding: '28px 16px 16px 16px' }}>
                {activeTab === "info" && <InfoSection />}
                {activeTab === "location" && <LocationSection />}
                {activeTab === "other" && <OtherSection />}
            </Box>

            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    padding: '13px 16px',
                    borderTop: `1px solid ${colors._components.table.border}`,
                }}
            >
                <Box
                    sx={{
                        width: "43px",
                        height: "48px",
                        padding: '6px 9px',
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: `1px solid ${colors.divider}`,
                        borderRadius: '14px',
                    }}
                >
                    <Box component="img" src={cherryBtn} />

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

function InfoSection() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pb: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: '4px' }}>
                <Typography variant="t2_b" sx={{ color: "black", textAlign: 'left' }}>
                    태그 정보
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {["#생일", "#분홍", "#쥬얼리"].map((tag) => (
                        <Chip
                            key={tag}
                            label={tag}
                            variant="static"
                        />
                    ))}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AddIcon sx={{ fontSize: "16px", color: "#616161" }} />
                    <Typography variant="label_3" sx={{ color: "#616161" }}>
                        태그 더보기
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ height: "1px", bgcolor: colors.divider }} />

            <Box sx={{ display: "flex", gap: '28px', flexDirection: 'column', }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography variant="t2_b" sx={{ color: "black", textAlign: 'left' }}>
                        주문정보
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Typography variant="t3_b" sx={{ color: "black", pt: '4px' }}>
                            가격
                        </Typography>
                        <Box
                            sx={{
                                flex: 1,
                                pl: 2,
                            }}
                        >
                            {[
                                { size: "미니", price: "18,000원~" },
                                { size: "1호", price: "25,000원~" },
                                { size: "2호", price: "37,000원~" },
                            ].map(({ size, price }) => (
                                <Box
                                    key={size}
                                    sx={{
                                        display: "flex",
                                        gap: 2,
                                        py: '4px',
                                    }}
                                >
                                    <Typography variant="b1_m" sx={{ color: "black", minWidth: '50px', textAlign: 'left' }}>
                                        {size}
                                    </Typography>
                                    <Typography variant="b2_r" sx={{ color: "black" }}>
                                        {price}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ display: "flex", gap: '32px', alignItems: "center" }}>
                    <Typography variant="t3_b" sx={{ color: "black" }}>
                        일정
                    </Typography>
                    <Typography variant="b2_r" sx={{ color: "black" }}>
                        수령일 <span style={{ fontWeight: 600 }}>3일 전</span> 까지 주문
                    </Typography>
                </Box>
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

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="t2_b" sx={{ color: "black" }}>
                        이 가게의 다른 케이크
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: '4px' }}>
                        <AddIcon sx={{ fontSize: "16px", color: "#616161" }} />
                        <Typography variant="label_3" sx={{ color: "#616161" }}>
                            더보기
                        </Typography>
                    </Box>
                </Box>

<SavedInstagramEmbed />
            </Box>
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pb: 2 }}>
            <Typography variant="t2_b" sx={{ color: "black" }}>
                다른 케이크들
            </Typography>
            <Typography variant="b2_r" sx={{ color: "#757575" }}>
                더 많은 케이크를 보려면 스크롤하세요
            </Typography>
        </Box>
    );
}
