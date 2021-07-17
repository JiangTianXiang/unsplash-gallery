import { IFeed } from "store/feed/feed.types";
export default interface PageProps {
  feed: IFeed;
  getData(page: number): void;
  resetState(): void;
  incrementPage(): void;
}
