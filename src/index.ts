interface UnknownObject {
  [key: string]: any
}

export class SearchParams {
  URLSearchParams: URLSearchParams;
  constructor() {
    this.URLSearchParams = new URLSearchParams();
  }

  /**
   * A private method that can be called to push a new history state into the history stack
   * @param search An object containing all the key value pairs that was used to create the new URL
   * @param title The title of the history object being created
   * @param url The slug to append to the end of the URL
   * @private
   * @namespace dayql/search-params
   */
  _pushHistory(search: UnknownObject, url: string, title: string = document.title) {
    window.history.pushState(search, title, url);
  }

  /**
   * Returns a string to append to the end of the URL
   * @namespace dayql/search-params
   */
  _buildURL() {
    const query = this.URLSearchParams.toString();

    if (!query) return '';

    return `?${query}`;
  }

  /**
   * Overwrites the current instance of this.URLSearchParams with a new one based on a new object.
   * @param search All the key values pair used to create a new URLSearchParams instance
   * @namespace dayql/search-params
   */
  _createNewInstance(search: UnknownObject) {
    this.URLSearchParams = new URLSearchParams(search);
  }

  /**
   * Destroys the old instance of keys and recreates the URL params based on the new object.
   * @param search All the key values pair used to create a new URLSearchParams instance
   * @param title `optional` The title of the history object being created
   * @namespace dayql/search-params
   */
  set(search: UnknownObject, title: string = document.title) {
    this._createNewInstance(search);


  }
}
