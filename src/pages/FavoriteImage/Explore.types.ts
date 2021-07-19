import { IFavoriteFeed } from "store/threeColumn.types";

export default interface FavoriteProps {
  favoriteFeed: IFavoriteFeed;
  getFavoriteFeed(): void;
}
