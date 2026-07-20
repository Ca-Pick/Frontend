export type CakeData = {
  cakeId: number;
  instagramEmbed: string;
  saved: boolean;
  cakedetailtags: string[];
};

export type ApiResponse = {
  success: boolean;
  data: {
    cakes: CakeData[];
    tags: string[];
  };
  timestamp: string;
};
