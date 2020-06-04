import {
  SearchParamsArgs,
  UnknownObject,
  EntryOutputType,
  EntryIteratorType,
} from './types';

export class SearchParams {
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

    this.sync();
  }

  /**
   * Pushes a new history state into the history stack.
   * @param search An object containing all the key value pairs that was used to create the new URL.
   * @param title The title of the history object being created.
   * @param url The slug to append to the end of the URL.
   */
  _pushHistory(search: UnknownObject, title: string = document.title): void {
    const url = this._buildQuery();
    window.history.pushState(search, title, url);
  }

  /**
   * Returns a string to append to the end of the URL.
   * @returns The constructed query from the current URLSearchParam instance
   */
  _buildQuery(): string {
    const query = this.URLSearchParams.toString();

    if (!query) return '';

    return `?${query}`;
  }

  /**
   * Reads the current URL search.
   * Will pull the search off the hash if this.useHashRouter is set.
   */
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
   * @param search All the key values pair used to create a new URLSearchParams instance.
   * @private
   */
  _createNewInstance(search: UnknownObject): void {
    this.URLSearchParams = new URLSearchParams(search);
  }

  /**
   * Iterates over the entries in the URLSearchParams and builds an array of objects based on their key value pairs.
   * @private
   */
  _getCurrentEntries() {
    //@ts-ignore - This is ignored because typescript is angry about .entries
    const entries = this.URLSearchParams.entries();
    const output: EntryOutputType = {};
    let finished = false;

    while (!finished) {
      const { done, value }: EntryIteratorType = entries.next();
      finished = done;
      if (value && value.length) {
        const [key, val] = value;

        if (this.useDuplicatesAsArrays && output[key]) {
          output[key] = [output[key], val].reduce(
            (acc, cur) => acc.concat(cur),
            [],
          );
        } else {
          output[key] = val;
        }
      }
    }

    return output;
  }

  /**
   * Creates an object with keys to indicate special types. (e.g. Arrays).
   * @param search The object containg the data needing converting.
   * @returns An object with type specific names.
   * @private
   */
  _getURLKeyObject(search: UnknownObject): UnknownObject {
    return Object.keys(search).reduce((acc: UnknownObject, cur: string) => {
      const urlKey: string = Array.isArray(search[cur]) ? `${cur}[]` : cur;
      acc[urlKey] = search[cur];
      return acc;
    }, {});
  }

  /**
   * Reads the object created by this._getURLKeyObject and translate it to the original values.
   * @param search The object containg the data needing converting.
   * @returns An object with values restored from type specific names.
   * @private
   */
  _readURLKeyObject(search: UnknownObject): UnknownObject {
    return Object.keys(search).reduce((acc: UnknownObject, cur: string) => {
      const isArray = cur.indexOf('[]') !== -1;
      const trueKey = cur.replace('[]', '');
      const outputVal = isArray ? search[cur].split(',') : search[cur];
      acc[trueKey] = outputVal;
      return acc;
    }, {});
  }

  /**
   * Gets the current base URL
   * @returns The base URL
   * @private
   */
  _getBaseURL() {
    const search = this._getCurrentURLSearch();
    return window.location.href.replace(search, '');
  }

  /**
   * Destroys the old instance of keys and recreates the URL params based on the new object.
   * Clears the params if you provide an empty search object.
   * @param search All the key values pair used to create a new URLSearchParams instance.
   * @param title `optional` The title of the history object being created.
   */
  setAll(search: UnknownObject, title: string = document.title): void {
    if (!Object.keys(search).length) {
      this.clear();
      return;
    }
    const urlFriendlySearch = this._getURLKeyObject(search);
    this._createNewInstance(urlFriendlySearch);
    this._pushHistory(search, title);
  }

  /**
   * Sets or replaces values in the URL params.
   * If there were several matching values, this method deletes the others.
   * @param search The key value pairs to update the URL params with.
   * @param title `optional` The title of the history object being created.
   */
  set(search: UnknownObject, title: string = document.title): void {
    const urlFriendlySearch = this._getURLKeyObject(search);
    const keys = Object.keys(urlFriendlySearch);

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
   * @param search The key value pairs to update the URL params with.
   * @param title `optional` The title of the history object being created.
   */
  append(search: UnknownObject, title: string = document.title): void {
    const urlFriendlySearch = this._getURLKeyObject(search);
    const keys = Object.keys(urlFriendlySearch);

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
   */
  sync(): void {
    const search = this._getCurrentURLSearch();
    this.URLSearchParams = new URLSearchParams(search);
  }

  /**
   * Removes keys from the URL. If the key appears multiple times
   * all instances of the key will be removed.
   * @param keys The key or keys to be removed from the URL.
   * @param title `optional` The title of the history object being created.
   */
  delete(keys: Array<string> | string, title: string = document.title): void {
    if (Array.isArray(keys)) {
      keys.forEach((key) => {
        this.URLSearchParams.delete(key);
      });
    } else if (typeof keys === 'string') {
      this.URLSearchParams.delete(keys);
    }

    const urlValues = this._getCurrentEntries();
    const search = this._readURLKeyObject(urlValues);
    this._pushHistory(search, title);
  }

  /**
   * Gets all values from the current object.
   * @returns An object containing all values in the current state.
   */
  getValues() {
    const urlValues = this._getCurrentEntries();
    return this._readURLKeyObject(urlValues);
  }

  /**
   * Clears all params in the URL
   * @param title `optional` The title of the history object being created.
   */
  clear(title: string = document.title) {
    const baseURL = this._getBaseURL();
    window.history.pushState({}, title, baseURL);
    this._createNewInstance({});
  }

  /**
   * Builds a link with the current URL Search Params
   * @param path The path to use to build the link
   * @returns The built link
   */
  buildLink(path: string): string {
    const { origin, hash } = window.location;
    const truePath = path[0] === '/' ? path : `/${path}`;
    if (this.useHashRouter) {
      return `${origin}${truePath}${hash}${this._buildQuery()}`;
    }

    return `${origin}${truePath}${this._buildQuery()}`;
  }
}
