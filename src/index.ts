import { SearchParams, SearchParamsArgs, UnknownObject } from './SearchParams';

interface SearchParamsType {
  setAll: (search: UnknownObject, title?: string) => void;
  set: (search: UnknownObject, title?: string) => void;
  append: (search: UnknownObject, title?: string) => void;
  sync: () => void;
  delete: (keys: Array<string> | string, title?: string) => void;
  getValues: () => void;
  clear: (title?: string) => void;
  buildLink: (path: string) => string;
}

/**
 * Creates a new instance of SearchParams
 * @param args.useHashRouter Set to true if you are using a hash router
 * @param args.useDuplicatesAsArrays Set to true to treat duplicate keys as arrays
 * @returns An instance of SearchParams
 * @namespace dayql/search-params
 */
export function createSearchParams(
  args: SearchParamsArgs = {
    useHashRouter: false,
    useDuplicatesAsArrays: false,
  },
): SearchParamsType {
  return new SearchParams(args);
}
