import { User } from './users';


export interface Model {
  id?: number | any;
  createdOn?: Date,
  createdBy?: User | any,
  lastUpdatedOn?: Date,
  lastUpdatedBy?: User | any,
}
