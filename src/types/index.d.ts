export interface UnknownObject {
  [key: string]: any;
}

export interface SearchParamsType {
  setAll: (search: UnknownObject, title?: string) => void;
  set: (search: UnknownObject, title?: string) => void;
  append: (search: UnknownObject, title?: string) => void;
  sync: () => void;
  delete: (keys: Array<string> | string, title?: string) => void;
  getValues: () => void;
  clear: (title?: string) => void;
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
