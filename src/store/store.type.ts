import { IFeed } from "./feed/feed.types";
import { IThreeColumnFeed } from "./exploreFeed/exploreFeed.types";
export interface IState {
  feed: IFeed;
  exploreFeed: IThreeColumnFeed;
}
