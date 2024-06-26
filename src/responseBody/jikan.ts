interface Webp {
  image_url: string;
}

interface Images {
  webp: Webp;
}

interface Trailer {
  embed_url: string;
}

export interface SearchJikan {
  mal_id: number;
  url: string;
  images: Images;
  trailer: Trailer;
  title: string;
  status: string;
  score: number;
  year: number;
}

export interface ResponseJikan {
  message: string;
  data: any[];
}
