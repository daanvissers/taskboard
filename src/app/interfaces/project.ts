import { Status } from '../enums/status.enum';

export interface Project {
  name: string;
  description: string;
  status: Status;
  owner: string;
}
