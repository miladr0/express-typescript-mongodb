import { LeanDocument } from 'mongoose';

export default interface CRUD<T> {
  findAll: (
    limit: number,
    page: number,
  ) => Promise<{
    docs: Array<T> | Array<LeanDocument<T>>;
    meta: {
      totalDocs: number;
      totalPages: number;
      page: number;
    };
  }>;
  getById: (id: string) => Promise<any>;
}
