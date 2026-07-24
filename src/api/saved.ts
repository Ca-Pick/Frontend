export interface SavedItem {
  id: string;
  title: string;
  image: string;
  storeInfo?: string;
  price?: string;
  liked?: boolean;
  tags?: string[];
}

interface SavedItemsResponse {
  items: SavedItem[];
  total: number;
  sortBy?: string;
  selectedTags?: string[];
}

// API 엔드포인트 (MVP 서버 URL 설정 필요)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Mock data for development
const MOCK_ITEMS: SavedItem[] = [
  {
    id: '1',
    title: 'Strawberry Cake',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    storeInfo: 'Sweet Bakery',
    price: '25,000',
    liked: false,
  },
  {
    id: '2',
    title: 'Chocolate Cake',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    storeInfo: 'Chocolate Dreams',
    price: '28,000',
    liked: false,
  },
  {
    id: '3',
    title: 'Cheesecake',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    storeInfo: 'Creamy Delights',
    price: '30,000',
    liked: false,
  },
  {
    id: '4',
    title: 'Vanilla Cake',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    storeInfo: 'Classic Bakery',
    price: '22,000',
    liked: false,
  },
];

export async function fetchSavedItems(
  sortBy: string = 'popular',
  tags?: string[]
): Promise<SavedItemsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/save`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch saved items: ${response.statusText}`);
    }

    const data = await response.json();

    // API 응답을 SavedItemsResponse 형식으로 변환
    return {
      items: data.data.cakes.map((cake: any) => ({
        id: cake.cakeId.toString(),
        title: cake.cakedetailtags?.[0] || 'Saved Cake',
        image: '', // API에서 이미지 제공 안 함
        storeInfo: undefined,
        price: undefined,
        liked: true, // 저장함에 있는 것들은 모두 liked=true
        tags: cake.cakedetailtags || [],
      })),
      total: data.data.cakes.length,
      sortBy,
      selectedTags: tags,
    };
  } catch (error) {
    console.error('Error fetching saved items:', error);
    throw error;
  }
}

export async function toggleLike(itemId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/saved/${itemId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to toggle like: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
}

export async function updateSelectedTags(tags: string[]): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/saved/tags`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tags }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update tags: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error updating tags:', error);
    throw error;
  }
}
