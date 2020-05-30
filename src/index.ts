interface UnknownObject {
  [key: string]: any
}

export function setURLParams(search: UnknownObject, title: string = document.title): void {
  const searchString = `?${new URLSearchParams(search)}`;
  window.history.pushState(search, title, searchString);
}
