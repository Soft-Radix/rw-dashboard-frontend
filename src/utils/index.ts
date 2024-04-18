type localStorage = {
  item: string
}

type sortedRow = {
  rows: any,
  column: string,
  isAsc: boolean
}

/**
 * Get access token from local storage
 */
export const getLocalStorage = (item) => {
  let data = localStorage.getItem(item);
  return data ? JSON.parse(data) : null;
};


