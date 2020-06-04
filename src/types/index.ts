export interface UnknownObject {
  [key: string]: any;
}

export interface SearchParamsArgs {
  useHashRouter?: boolean;
  useDuplicatesAsArrays?: boolean;
}

export interface EntryIteratorType {
  done: boolean;
  value: Array<string>;
}

export interface EntryOutputType {
  [key: string]: any;
}

export interface SearchParamsType {
  setAll: (search: UnknownObject, title?: string) => void;
  set: (search: UnknownObject, title?: string) => void;
  append: (search: UnknownObject, title?: string) => void;
  sync: () => void;
  remove: (keys: Array<string> | string, title?: string) => void;
  getValues: () => UnknownObject;
  clear: (title?: string) => void;
  buildLink: (path: string) => string;
}
