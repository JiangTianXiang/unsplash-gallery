import { IThreeColumnFeed } from "store/threeColumn.types";

export default interface ExploreProps {
  exploreFeed: IThreeColumnFeed;
  getExploreFeed(page: number): void;
  resetState(): void;
  incrementPage(): void;
}
