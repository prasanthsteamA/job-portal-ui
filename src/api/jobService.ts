import axios from "axios";
import { Job, PaginatedJobsResponse } from "../interfaces/Job";

const API_BASE_URL = process.env.APP_API_URL || "https://behhobhg56.execute-api.ap-south-1.amazonaws.com/dev/api/jobs";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

export const jobService = {

async fetchJobs(
  title?: string,
  location?: string,
  type?: string,
  page: number = 1,
  pageSize: number = 4
): Promise<PaginatedJobsResponse> {
  const response = await axios.get<PaginatedJobsResponse>(API_BASE_URL, {
    params: { title, location, type, page, limit: pageSize },
    headers: getAuthHeader(),
  });
  return response.data;
},

async createJob(jobData: Partial<Job>): Promise<Job> {
    const postedById = localStorage.getItem("userid"); 
    const response = await axios.post<Job>(
      API_BASE_URL,
      { ...jobData, postedById },
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  async updateJob(id: number, jobData: Partial<Job>): Promise<Job> {
    const postedById = localStorage.getItem("userid");
    const response = await axios.put<Job>(
      `${API_BASE_URL}/${id}`,
      { ...jobData, postedById },
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  async deleteJob(id: number): Promise<void> {
    const postedById = localStorage.getItem("userid");
    await axios.delete(`${API_BASE_URL}/${id}`, {
      headers: getAuthHeader(),
      data: { postedById },
    });
  },
};
