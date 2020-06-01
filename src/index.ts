import { UnknownObject, SearchParamsArgs, SearchParamsType } from './types';

class SearchParams {
  URLSearchParams: URLSearchParams;
  useHashRouter: boolean;
  useDuplicatesAsArrays: boolean;

  constructor(
    { useHashRouter, useDuplicatesAsArrays }: SearchParamsArgs = {
      useHashRouter: false,
      useDuplicatesAsArrays: false,
    },
  ) {
    this.URLSearchParams = new URLSearchParams();
    this.useHashRouter = useHashRouter || false;
    this.useDuplicatesAsArrays = useDuplicatesAsArrays || false;
  }

  /**
   * Pushes a new history state into the history stack
   * @param search An object containing all the key value pairs that was used to create the new URL
   * @param title The title of the history object being created
   * @param url The slug to append to the end of the URL
   * @private
   * @namespace dayql/search-params
   */
  _pushHistory(search: UnknownObject, title: string = document.title): void {
    const url = this._buildURL();
    window.history.pushState(search, title, url);
  }

  /**
   * Returns a string to append to the end of the URL
   * @namespace dayql/search-params
   */
  _buildURL(): string {
    const query = this.URLSearchParams.toString();

    if (!query) return '';

    return `?${query}`;
  }

  _getCurrentURLSearch() {
    const baseURL = this.useHashRouter
      ? window.location.hash
      : window.location.search;

    if (this.useHashRouter && baseURL.indexOf('?') !== -1) {
      const [, search] = baseURL.split('?');
      return `?${search}`;
    }

    return baseURL;
  }

  /**
   * Overwrites the current instance of this.URLSearchParams
   * with a new one based on a new object.
   * @param search All the key values pair used to create a new URLSearchParams instance
   * @namespace dayql/search-params
   */
  _createNewInstance(search: UnknownObject): void {
    this.URLSearchParams = new URLSearchParams(search);
  }

  /**
   * Iterates over the entries in the URLSearchParams and builds an array of objects based on their key value pairs.
   * @namespace dayql/search-params
   * TODO: This should return a single object and handle multiples of keys.
   * TODO: We also need some kind of data parser to handle array types and booleans.
   */
  _getCurrentEntries() {
    //@ts-ignore
    const entries = this.URLSearchParams.entries();
    const entryObjects = [];
    let finished = false;

    while (!finished) {
      const { done, value } = entries.next();
      finished = done;
      if (value && value.length) {
        entryObjects.push({
          [value[0]]: value[1],
        });
      }
    }

    console.log(entryObjects);

    return entryObjects;
  }

  /**
   * Destroys the old instance of keys and recreates the URL params based on the new object.
   * @param search All the key values pair used to create a new URLSearchParams instance
   * @param title `optional` The title of the history object being created
   * @namespace dayql/search-params
   */
  setAll(search: UnknownObject, title: string = document.title): void {
    this._createNewInstance(search);
    this._pushHistory(search, title);
  }

  /**
   * Sets or replaces values in the URL params.
   * If there were several matching values, this method deletes the others.
   * @param search The key value pairs to update the URL params with
   * @param title `optional` The title of the history object being created
   * @namespace dayql/search-params
   */
  set(search: UnknownObject, title: string = document.title): void {
    const keys = Object.keys(search);

    if (keys.length) {
      keys.forEach((key) => {
        this.URLSearchParams.set(key, search[key]);
      });
    }

    this._pushHistory(search, title);
  }

  /**
   * Attaches a new instances of a key value pair to the URL.
   * If a key already exists with a different value,
   * this will create a new instance of that key with the new value.
   * @param search The key value pairs to update the URL params with
   * @param title `optional` The title of the history object being created
   * @namespace dayql/search-params
   */
  append(search: UnknownObject, title: string = document.title): void {
    const keys = Object.keys(search);

    if (keys.length) {
      keys.forEach((key) => {
        this.URLSearchParams.append(key, search[key]);
      });
    }

    this._pushHistory(search, title);
  }

  /**
   * Destroys the old instance of keys and recreates
   * the URL params based on the current URL.
   * @namespace dayql/search-params
   */
  sync(): void {
    const search = this._getCurrentURLSearch();
    this.URLSearchParams = new URLSearchParams(search);
  }

  /**
   * Removes keys from the URL. If the key appears multiple times
   * all instances of the key will be removed.
   * @param keys The key or keys to be removed from the URL.
   * @param title `optional` The title of the history object being created
   */
  delete(keys: Array<string> | string, title?: string = document.title): void {
    if (Array.isArray(keys)) {
      keys.forEach((key) => {
        this.URLSearchParams.delete(key);
      });
    } else if (typeof keys === 'string') {
      this.URLSearchParams.delete(keys);
    }
  }

  getValues() {
    return this._getCurrentEntries();
  }
}

export function createSearchParams(
  args: SearchParamsArgs = { useHashRouter: false },
): SearchParamsType {
  return new SearchParams(args);
}
