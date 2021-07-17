import { IThreeColumnFeed } from "store/exploreFeed/exploreFeed.types";

export default interface ExploreProps {
  exploreFeed: IThreeColumnFeed;
  getExploreFeed(page: number): void;
  resetState(): void;
  incrementPage(): void;
}
