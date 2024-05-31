export interface ResponseBodySearchJikan {
  mal_id: number;
  url: string;
  images: string;
  trailer: string;
  title: string;
  score: number;
  year: number;
}

export interface ResponseBodyMsg {
  message: string;
}

export interface ResponseBodyData<T> {
  message: string;
  data: T;
}
