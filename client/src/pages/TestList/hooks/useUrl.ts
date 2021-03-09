import { useHistory, useLocation } from "react-router-dom";

type IParams = {
  [key: string]: string | null;
};
export const useUrl = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search)
  const urlSearch = Object.fromEntries(searchParams.entries())
  const replaceState = (params: IParams) => {
    const url = Object.entries(params).reduce((acc: string[], [key, value]) => {
      if (value) {
        const changedValue = value.replace(/\s/g, "%20")
        // чтобы "т " не превращалось в "т"
        acc.push(`${key}=${changedValue}`);
      }
      return acc;
    }, []);
    history.replace({
      search: url.join("&"),
    });
  };
  return {
    replaceState,
    searchParams: urlSearch
  }
};
