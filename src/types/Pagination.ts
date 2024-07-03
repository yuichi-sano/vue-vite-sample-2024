export interface Pagination {
  prev: number | null;
  next: number | null;
  currentPage: number;
  lastPage: number | null;
  total: number;
  from: number;
  to: number;
}
