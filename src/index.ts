import { SearchParamsType, SearchParamsArgs } from './types';
import { SearchParams } from './SearchParams';

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
