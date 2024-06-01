import { HistoryEntity } from "../entity/history";

export interface ResponseHistory {
  username: string;
  history: HistoryEntity;
}
