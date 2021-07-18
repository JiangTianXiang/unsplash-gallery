import { IFeed } from "./feed/feed.types";
import { IThreeColumnFeed } from "./threeColumn.types";
export interface IState {
  feed: IFeed;
  exploreFeed: IThreeColumnFeed;
  searchCollection: IThreeColumnFeed;
  searchPhoto: IThreeColumnFeed;
  collectionFeed: IThreeColumnFeed;
}
