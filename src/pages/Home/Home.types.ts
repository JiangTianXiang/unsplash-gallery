export default interface PageProps {
  feed: IFeed;
  getData(page: number): void;
  resetState(): void;
  incrementPage(): void;
}

export interface IFeed {
  isLoading: boolean;
  hasError: boolean;
  data: Array<object>;
  page: number;
}
