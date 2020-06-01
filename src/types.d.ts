export interface UnknownObject {
  [key: string]: any;
}

export interface SearchParamsType {
  setAll: (search: UnknownObject, title?: string) => void;
  set: (search: UnknownObject, title?: string) => void;
  append: (search: UnknownObject, title?: string) => void;
  sync: () => void;
  delete: (keys: Array<string> | string, title?: string) => void;
}

export interface SearchParamsArgs {
  useHashRouter?: boolean;
  useDuplicatesAsArrays?: boolean;
}
