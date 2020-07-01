import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface Sprint {
    title: string,
    description: string,
    startDate: any,
    endDate: any,
    projectId: string,
    isActive: boolean
}
