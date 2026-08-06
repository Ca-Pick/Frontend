import { Box, Typography, Button, Chip } from "@mui/material";
import { colors } from "../../../../theme/colors";
import AddIcon from "@mui/icons-material/Add";
import InstagramIcon from "@mui/icons-material/Instagram";
import SavedInstagramEmbed from "../../../../components/SavedInstagramEmbed";
import { HeartToggle } from "../../../../components/HeartToggle";
import { KakaoMap } from "../../../../components/KakaoMap";
import { useState, useEffect, useMemo } from "react";

interface BottomSectionProps {
    activeTab: "info" | "location" | "other";
    onTabChange: (tab: "info" | "location" | "other") => void;
    selectedTags?: string[];
    location?: string;
    latitude?: number;
    longitude?: number;
    name?: string;
    recipient?: string;
    cakeType?: string;
    color?: string;
    mood?: string;
    cakelists?: Array<{ cakeId: number; instagramEmbed: string; saved: boolean }>;
    instagramEmbed?: string;
    instagramUrl?: string;
    price?: string;
    schedule?: string;
    cakeId?: number;
    saved?: boolean;
    onCakeSelect?: (cakeId?: number) => void;
    // 홈처럼 URL이 상세뷰와 동기화되지 않는 곳에 임베드된 경우, 로그인 후 되돌아올 경로를
    // location 대신 실제 상세 라우트로 강제하기 위한 플래그
    useDessertRedirect?: boolean;
    // 로그인 후 되돌아올 케이크 ID(최초 진입한 상세 기준으로 고정). 지정 없으면 cakeId 사용
    redirectCakeId?: number;
}

export function BottomSection({ activeTab, onTabChange, selectedTags = [], location, latitude, longitude, name, cakelists, instagramEmbed, instagramUrl, price, schedule, cakeId, saved, onCakeSelect, useDessertRedirect, redirectCakeId }: BottomSectionProps) {
    const hasOtherCakes = (cakelists?.filter(cake => cake.cakeId !== cakeId).length ?? 0) > 0;

    useEffect(() => {
        if (!hasOtherCakes && activeTab === "other") {
            onTabChange("info");
        }
    }, [hasOtherCakes, activeTab, onTabChange]);

    const handleInstagramClick = () => {
        if (instagramUrl) {
            window.open(instagramUrl, '_blank');
        }
    };

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
                {(["info", "location", "other"] as const).map((tab) => {
                    const disabled = tab === "other" && !hasOtherCakes;
                    return (
                        <Typography
                            key={tab}
                            variant="b2_b"
                            onClick={() => !disabled && onTabChange(tab)}
                            sx={{
                                cursor: disabled ? "not-allowed" : "pointer",
                                color: disabled ? "#bdbdbd" : activeTab === tab ? colors.text.primary : "#757575",
                                transition: "all 0.2s ease",
                                pb: 1,
                                borderBottom: activeTab === tab ? `3px solid ${colors.primary.main}` : "none",
                                px: '6px'
                            }}
                        >
                            {tab === "info" ? "상세정보" : tab === "location" ? "위치" : "다른 케이크"}
                        </Typography>
                    );
                })}
            </Box>
            <Box>
                {activeTab === "info" && <InfoSection tags={selectedTags} location={location} latitude={latitude} longitude={longitude} name={name} price={price} schedule={schedule} instagramUrl={instagramUrl} cakelists={cakelists} cakeId={cakeId} onCakeSelect={onCakeSelect} useDessertRedirect={useDessertRedirect} redirectCakeId={redirectCakeId} />}
                {activeTab === "location" &&
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, padding: '28px 16px 16px 16px' }}>
                        <LocationSection location={location} latitude={latitude} longitude={longitude} name={name} />
                        {hasOtherCakes && <Box sx={{ height: "1px", bgcolor: colors.divider }} />}
                        <OtherSection cakelists={cakelists} instagramEmbed={instagramEmbed} cakeId={cakeId} onCakeSelect={onCakeSelect} useDessertRedirect={useDessertRedirect} redirectCakeId={redirectCakeId} />
                    </Box>
                }
                {activeTab === "other" && hasOtherCakes &&
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, padding: '28px 16px 16px 16px' }}>
                        <OtherSection cakelists={cakelists} instagramEmbed={instagramEmbed} cakeId={cakeId} onCakeSelect={onCakeSelect} useDessertRedirect={useDessertRedirect} redirectCakeId={redirectCakeId} />
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
                    {cakeId !== undefined && (
                        <HeartToggle
                            referenceId={cakeId}
                            initialSaved={saved}
                            redirectPath={useDessertRedirect ? `/desserts/${redirectCakeId ?? cakeId}` : undefined}
                        />
                    )}
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    size="xlarge"
                    fullWidth
                    startIcon={<InstagramIcon />}
                    sx={{ flex: 1 }}
                    onClick={handleInstagramClick}
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
    price?: string;
    schedule?: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    name?: string;
    instagramUrl?: string;
    cakelists?: Array<{ cakeId: number; instagramEmbed: string }>;
    cakeId?: number;
    onCakeSelect?: (cakeId?: number) => void;
    useDessertRedirect?: boolean;
    redirectCakeId?: number;
}

function InfoSection({ tags = [], orderInfo = [], location, latitude, longitude, name, instagramUrl, cakelists, cakeId, onCakeSelect, useDessertRedirect, redirectCakeId }: InfoSectionProps) {
    const allTags = [...orderInfo, ...tags];
    const [showMoreTags, setShowMoreTags] = useState(false);
    const displayedTags = showMoreTags ? allTags : allTags.slice(0, 5);
    const hasOtherCakes = (cakelists?.filter(cake => cake.cakeId !== cakeId).length ?? 0) > 0;
    const handleInstagramClick = () => {
        if (instagramUrl) {
            window.open(instagramUrl, '_blank');
        }
    };

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
            <LocationSection location={location} latitude={latitude} longitude={longitude} name={name} />
            {hasOtherCakes && <Box sx={{ height: "1px", bgcolor: colors.divider }} />}

            <OtherSection cakelists={cakelists} cakeId={cakeId} onCakeSelect={onCakeSelect} useDessertRedirect={useDessertRedirect} redirectCakeId={redirectCakeId} />
        </Box>
    );
}

interface LocationSectionProps {
    location?: string;
    latitude?: number;
    longitude?: number;
    name?: string;
}

function LocationSection({ location, latitude, longitude, name }: LocationSectionProps) {
    const imgMap = "https://www.figma.com/api/mcp/asset/71f041b9-f48e-4b06-9b62-3fa074e58e4d";
    const hasCoordinates = latitude != null && longitude != null;

    return (
        <Box sx={{ display: "flex", gap: 4, alignItems: 'flex-start' }}>
            <Typography variant="t2_b" sx={{ color: "black", whiteSpace: 'nowrap', textAlign: 'left' }}>
                위치
            </Typography>
            <Box sx={{ display: "flex", flexDirection: 'column', gap: 2, alignItems: "flex-start", width: "100%" }}>

                <Typography variant="b2_r" sx={{ color: "black", textAlign: 'left' }}>
                    {location || "서울 서대문구 연희로12길 10-4 1층 FAUCET"}
                </Typography>

                {hasCoordinates ? (
                    <KakaoMap latitude={latitude} longitude={longitude} name={name} />
                ) : (
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
                )}
            </Box>
        </Box>
    );
}

interface OtherSectionProps {
    cakelists?: Array<{ cakeId: number; instagramEmbed: string; saved: boolean }>;
    cakeId?: number;
    onCakeSelect?: (cakeId?: number) => void;
    useDessertRedirect?: boolean;
    redirectCakeId?: number;
}

function OtherSection({ cakelists, cakeId, onCakeSelect, useDessertRedirect, redirectCakeId }: OtherSectionProps) {
    // cakelists/cakeId가 실제로 바뀌지 않았는데도 매 렌더링마다 filter/map으로 새
    // 배열을 만들면, 참조가 매번 달라져 SavedInstagramEmbed의 cakes 변경 감지
    // useEffect가 오작동해 캐러셀 위치(currentIndex)가 계속 첫 번째로 리셋된다.
    const formattedCakes = useMemo(() => {
        const otherCakes = cakelists?.filter(cake => cake.cakeId !== cakeId) ?? [];
        return otherCakes.map(cake => ({
            cakeId: cake.cakeId,
            instagramEmbed: cake.instagramEmbed,
            saved: cake.saved,
            cakeDetailTags: [],
            cakeDetailCount: 0,
        }));
    }, [cakelists, cakeId]);

    if (formattedCakes.length === 0) {
        return null;
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: 'flex-start' }}>
            <Typography variant="t2_b" sx={{ color: "black" }}>
                이 가게의 다른 케이크
            </Typography>
            <SavedInstagramEmbed showCarousel={false} cakes={formattedCakes} showChips={true} onDetailClick={onCakeSelect} useDessertRedirect={useDessertRedirect} redirectCakeId={redirectCakeId ?? cakeId} />
        </Box>
    );
}
