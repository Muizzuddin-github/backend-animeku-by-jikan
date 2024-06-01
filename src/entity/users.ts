interface History {
  mal_id: Number;
  url: string;
  images: string;
  trailer: string;
  title: string;
  status: string;
  score: number;
  year: number;
  created_at: Date;
}

export interface UserColEntity {
  _id: string;
  username: string;
  email: string;
  password: string;
  history: History[];
}
