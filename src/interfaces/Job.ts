export interface Job {
    id: number;
    title: string;
    description: string;
    location: string;
    type: string;
    postedById: string;
    companyName: string;
    salaryRange: string;
  }
  
  export interface PaginatedJobsResponse {
    jobs: Job[];
    totalCount: number;
    currentPage: number;
    pageSize: number;
  }
  