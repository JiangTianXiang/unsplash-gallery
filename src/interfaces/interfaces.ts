export interface IState {
  data: Array<object>;
  hasError: boolean;
  page: number;
  isLoading: boolean;
}

export interface IFetchSuccessAction {
  type: string;
  payload: Array<object>;
}

export interface IFunctionalAction {
  type: string;
}
