# 개발 가이드라인

## 컴포넌트 구조

### 1. 섹션별 컴포넌트화
- 페이지를 섹션 단위로 분해
- 각 섹션은 독립적인 컴포넌트로 구성
- 예: HeroSection, RecommendCurationSection, BottomTabNavigation 등

### 2. MUI 컴포넌트 사용
- **필수**: 가능한 모든 경우에 MUI 컴포넌트 활용
- **주요 컴포넌트**:
  - `Box`: 레이아웃 기본 단위
  - `Stack`: Flexbox 레이아웃 (방향 지정)
  - `Typography`: 텍스트 스타일링
  - `Button`: 버튼
  - `Card`: 카드 컨테이너
  - `Chip`: 작은 태그/라벨
  - `IconButton`: 아이콘 버튼
  - `Grid`: 그리드 레이아웃
  - `Image`: 이미지 (필요시)

### 3. 컬러 팔레트 사용
- **절대 금지**: 하드코딩된 컬러값 (#ad2426, #616161 등)
- **필수**: theme.palette 값 사용
  
#### 자주 사용되는 팔레트 값:
```typescript
// 주색
theme.palette.primary.main      // 주요 색상
theme.palette.primary.light     // 밝은 버전
theme.palette.primary.dark      // 어두운 버전
theme.palette.primary.contrastText // 텍스트 색상

// 배경색
theme.palette.background.default  // 기본 배경
theme.palette.background.paper    // 카드/종이 배경

// 텍스트색
theme.palette.text.primary       // 주요 텍스트
theme.palette.text.secondary     // 보조 텍스트
theme.palette.text.disabled      // 비활성 텍스트

// 기타
theme.palette.divider            // 구분선
theme.palette.grey[50]           // 밝은 회색
theme.palette.grey[700]          // 어두운 회색
```

### 4. sx prop 최소화
- **피해야 할 것**: sx prop에 많은 스타일 집어넣기
- **권장**: 
  - 기본 컴포넌트 props 사용 (variant, size, color 등)
  - 필요시에만 sx 사용 (일반 CSS로는 불가능한 경우)
  - 최소한의 스타일만 sx에 포함

#### 올바른 예:
```typescript
<Button variant="contained" color="primary" size="large">
  버튼
</Button>
```

#### 피해야 할 예:
```typescript
<Button sx={{ padding: '16px', fontSize: '14px', backgroundColor: '#ad2426' }}>
  버튼
</Button>
```

### 5. 최소한의 수정
- 기존 구조와 기능 유지
- 필요한 부분만 변경
- Figma 디자인 충실 유지

---

## 파일 구조

```
src/components/
├── HomePage/
│   ├── index.tsx                    # HomePage 메인
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── RecommendCurationSection.tsx
│   │   ├── BottomTabNavigation.tsx
│   │   └── UrlBar.tsx
│   ├── components/
│   │   ├── StatusBar.tsx
│   │   ├── Indicators.tsx
│   │   └── TabItem.tsx
│   └── index.css                    # 필요시만 사용
```

---

## 체크리스트

개발 시작 전 확인사항:

- [ ] 섹션별로 컴포넌트 분리했나?
- [ ] MUI 컴포넌트를 사용했나?
- [ ] 하드코딩된 컬러값은 없나?
- [ ] 모든 컬러는 palette에서 가져왔나?
- [ ] sx prop 사용을 최소화했나?
- [ ] 기본 props (variant, size, color)로 스타일링했나?
- [ ] 타입스크립트 에러는 없나?
- [ ] 린트 에러는 없나?

---

## 참고사항

- **Tailwind 클래스**: 직접 사용하지 않기 (이미 MUI에서 커버됨)
- **inline CSS**: 피하기 (sx prop 사용)
- **컬러 상수**: 필요시 theme에서 추출해서 사용
- **아이콘**: MUI Icons 사용
- **폰트**: theme.typography에서 설정

---

# Typography 스타일 추가 가이드

## 개요

이 프로젝트의 typography 시스템은 Material-UI의 TypeScript 기반 테마 시스템을 사용합니다. 새로운 글꼴 스타일을 추가하려면 네 개의 파일을 수정해야 합니다.

## 추가 단계

### 1단계: `src/theme/typography.ts` - 스타일 정의

해당하는 스타일 그룹 객체에 새로운 스타일을 추가합니다.

#### Heading 스타일 추가 예시
```typescript
export const headingStyles = {
  // ... 기존 스타일들
  h4_b: {
    fontSize: 24,
    lineHeight: 1.3,
    fontWeight: fontWeights.bold,
  },
};
```

#### Title 스타일 추가 예시
```typescript
export const titleStyles = {
  // ... 기존 스타일들
  t1_b: {
    fontSize: 24,
    lineHeight: 1.4,
    fontWeight: fontWeights.semibold,
    letterSpacing: '-0.6px',
  },
};
```

#### Body/Label 스타일 추가 예시
```typescript
export const bodyStyles = {
  b2_m: {
    fontSize: 14,
    lineHeight: 1.45,
    fontWeight: fontWeights.medium,
    letterSpacing: '-0.35px',
  },
  // ... 기존 스타일들
};
```

**주의사항:**
- `letterSpacing`은 필요한 경우에만 추가
- `lineHeight`는 십진수 형식 (1.4 = 140%)
- `fontSize`는 픽셀 단위 (숫자)

### 2단계: `src/theme/typography.ts` - typographyConfig에 추가

`typographyConfig` 객체에 새로운 스타일을 spread 연산자로 추가합니다.

```typescript
export const typographyConfig = {
  fontFamily,
  // ... 기존 variants
  
  // Heading variants
  h4_b: { ...headingStyles.h4_b },
  
  // Title variants
  t1_b: { ...titleStyles.t1_b },
  
  // Body variants
  b2_m: { ...bodyStyles.b2_m },
} as const;
```

### 3단계: `src/theme/theme.d.ts` - TypeScript 타입 정의

두 개의 인터페이스에 새로운 variant를 추가합니다.

```typescript
declare module '@mui/material/styles' {
  interface TypographyVariants {
    // ... 기존 variant들
    h4_b: React.CSSProperties;
    t1_b: React.CSSProperties;
    b2_m: React.CSSProperties;
  }

  interface TypographyPropsVariantOverrides {
    // ... 기존 variant들
    h4_b: true;
    t1_b: true;
    b2_m: true;
  }
}
```

### 4단계: `src/theme/index.ts` - MuiTypography variants에 추가

테마의 `MuiTypography.variants` 배열에 새로운 variant를 추가합니다.

```typescript
components: {
  MuiTypography: {
    variants: [
      // ... 기존 variants
      { props: { variant: 'h4_b' as const }, style: { ...headingStyles.h4_b } },
      { props: { variant: 't1_b' as const }, style: { ...titleStyles.t1_b } },
      { props: { variant: 'b2_m' as const }, style: { ...bodyStyles.b2_m } },
    ] as unknown as any,
  },
}
```

## 명명 규칙

| 그룹 | 접두사 | 사이즈 | 가중치 | 예시 |
|------|--------|--------|--------|------|
| Heading | h | 1-3 | _b (bold), _m (medium), _r (normal) | h1_b, h2_m |
| Title | t | 1-4 | _b (bold), _m (medium), _r (normal), _l (light) | t1_b, t2_r |
| Body | b, body | 2-3 | _b (bold), _m (medium), _r (normal) | b2_m, body_b3_r |
| Label | label | 1-4 | 고정 (semibold) | label_1, label_4 |

## 사용 예시

```tsx
import { Typography } from '@mui/material';

<Typography variant='t1_b'>
  제목 텍스트
</Typography>

<Typography variant='b2_m'>
  본문 텍스트
</Typography>
```

## Font Weights

```typescript
{
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
}
```

## Typography 체크리스트

새로운 typography 스타일을 추가할 때 다음을 확인하세요:

- [ ] `typography.ts`에 스타일 정의 추가
- [ ] `typography.ts`의 `typographyConfig`에 variant 추가
- [ ] `theme.d.ts`의 `TypographyVariants` 인터페이스에 추가
- [ ] `theme.d.ts`의 `TypographyPropsVariantOverrides` 인터페이스에 추가
- [ ] `index.ts`의 `MuiTypography.variants` 배열에 추가
- [ ] TypeScript 컴파일 오류 확인 (`npm run type-check`)

