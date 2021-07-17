import { IThreeColumnFeed } from "store/threeColumn.types";

export default interface SearchCollectionProps {
  searchCollection: IThreeColumnFeed;
  getSearchCollectionResult(searchInput: string, page: number): void;
  resetCollectionState(): void;
  incrementCollectionPage(): void;
}
