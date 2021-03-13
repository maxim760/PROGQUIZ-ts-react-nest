import { ILoadingStatus } from "../store/types";

type IStatusObj = {
  isLoading: boolean,
  isNever: boolean,
  isError: boolean,
  isSuccess: boolean
}

export const statusToObj = (status: ILoadingStatus): IStatusObj => {
  return {
    isLoading: status === ILoadingStatus.LOADING,
    isError: status === ILoadingStatus.ERROR,
    isNever: status === ILoadingStatus.NEVER,
    isSuccess: status === ILoadingStatus.SUCCESS,
  }
}