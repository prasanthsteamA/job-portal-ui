import React, { useEffect, useState } from "react";
import { Input, Select, Row, Col, Button, Spin, Card, Empty, message, Pagination } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import JobCard from "./JobCard";
import JobForm from "./JobForm";
import { jobService } from "../api/jobService";
import { Job, PaginatedJobsResponse } from "../interfaces/Job";

const { Option } = Select;

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState({ title: "", location: "", type: "" });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 4,
    totalCount: 0,
  });
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    loadJobs();
  }, [filters, pagination.currentPage, pagination.pageSize]);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const data: PaginatedJobsResponse = await jobService.fetchJobs(
        filters.title,
        filters.location,
        filters.type,
        pagination.currentPage,
        pagination.pageSize
      );
      console.log("data",data);
      
      setJobs(data.jobs);
      setPagination({
        ...data,
      });
    } catch (error) {
      message.error("Failed to load jobs");
    }
    setLoading(false);
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
      pageSize: pageSize || prev.pageSize, // Update pageSize if changed
    }));
  };

  const handleAdd = () => {
    setSelectedJob(null);
    setIsModalVisible(true);
  };

  const handleEdit = (job: Job) => {
    setSelectedJob(job);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await jobService.deleteJob(id);
      message.success("Job deleted successfully");
      loadJobs();
    } catch (error) {
      message.error("Failed to delete job");
    }
  };

  const handleFormSubmit = async (jobData: Partial<Job>) => {
    try {
      if (selectedJob) {
        await jobService.updateJob(selectedJob.id, jobData);
        message.success("Job updated successfully");
      } else {
        await jobService.createJob(jobData);
        message.success("Job added successfully");
      }
      setIsModalVisible(false);
      loadJobs();
    } catch (error) {
      message.error("Failed to save job");
    }
  };

  return (
    <Card style={{ padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
      {/* 🔎 FILTERS SECTION */}
      <Row gutter={[16, 16]} align="middle">
  <Col xs={24} sm={12} md={6}>
    <Input
      placeholder="🔍 Search Title"
      onChange={(e) => setFilters({ ...filters, title: e.target.value })}
    />
  </Col>
  <Col xs={24} sm={12} md={6}>
    <Input
      placeholder="📍 Location"
      onChange={(e) => setFilters({ ...filters, location: e.target.value })}
    />
  </Col>
  <Col xs={24} sm={12} md={6}>
    <Select
      placeholder="📌 Type"
      style={{ width: "100%" }}
      onChange={(value) => setFilters({ ...filters, type: value })}
      allowClear
    >
      <Option value="Full-time">Full-time</Option>
      <Option value="Part-time">Part-time</Option>
      <Option value="Internship">Internship</Option>
    </Select>
  </Col>
  <Col xs={24} sm={12} md={6}>
    <Row gutter={[8, 0]} justify="space-between">
    <Col>
        <Button
          type="default"
          onClick={() => setFilters({ title: "", location: "", type: "" })}
          block
        >
          Clear Filters
        </Button>
      </Col>
      <Col>
        <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />} block>
          Add Job
        </Button>
      </Col>
     
    </Row>
  </Col>
</Row>

      {/* 🏗️ JOB LIST SECTION */}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Spin size="large" />
        </div>
      ) : jobs.length > 0 ? (
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          {jobs.map((job) => (
            <Col xs={24} sm={12} md={12} lg={12} key={job.id}>
              <JobCard job={job} onEdit={handleEdit} onDelete={handleDelete} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description="No Jobs Found" style={{ marginTop: "20px" }} />
      )}

      {/* ✍️ ADD/EDIT JOB FORM MODAL */}
      <JobForm visible={isModalVisible} onClose={() => setIsModalVisible(false)} onSubmit={handleFormSubmit} job={selectedJob || undefined} />

      {/* PAGINATION */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <Pagination
      current={pagination.currentPage}
      pageSize={pagination.pageSize}
      total={pagination.totalCount}
      showSizeChanger
      onChange={handlePageChange}
      onShowSizeChange={handlePageChange}
      pageSizeOptions={["4", "8", "16", "24"]}
      style={{ textAlign: "center" }}
    />
  </div>
    </Card>
  );
};

export default JobList;
