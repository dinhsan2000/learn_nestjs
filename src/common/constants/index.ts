export class PaginationParam {
  static DEFAULT_PAGE_SIZE: number = 10;
  static DEFAULT_PAGE: number = 1;
  static DEFAULT_SORT: string = 'id';
  static DEFAULT_ORDER: string = 'DESC';
  static DEFAULT_FILTER: string = '';
  static DEFAULT_RELATIONS = [];
  static DEFAULT_SEARCH: string = '';
  static DEFAULT_SEARCH_BY: string = '';
  static DEFAULT_SEARCH_OPERATOR: string = 'OR';
  static DEFAULT_SEARCH_FIELDS = [];
  static DEFAULT_LIMIT: number = 10;
  static DEFAULT_OFFSET: number = 0;

  limit: number;
  offset: number;
}
