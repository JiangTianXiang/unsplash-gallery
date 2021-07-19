import { IThreeColumnFeed } from "store/threeColumn.types";

export default interface SearchPhotoProps {
  searchPhoto: IThreeColumnFeed;
  getSearchResult(searchInput: string, page: number): void;
  resetState(): void;
  incrementPage(): void;
}
