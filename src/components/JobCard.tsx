import React, { useState } from "react";
import { Card, Typography, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Job } from "../interfaces/Job";

const { Title, Paragraph } = Typography;

interface Props {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: number) => void;
}

const JobCard: React.FC<Props> = ({ job, onEdit, onDelete }) => {
    const [expanded, setExpanded] = useState(false);

  return (
    <Card
      hoverable
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "350px",
        borderRadius: "10px",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
        background: "#fff",
      }}
      actions={[
        <EditOutlined key="edit" onClick={() => onEdit(job)} style={{ color: "#1890ff" }} />,
        <DeleteOutlined key="delete" onClick={() => onDelete(job.id)} style={{ color: "red" }} />,
      ]}
    >
      <Space direction="vertical"> 
      <div>
        <Title level={3} style={{  overflow: "hidden", textOverflow: "ellipsis" }}>
          {job.title}
        </Title>
        <Title level={5} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {job.companyName} -  {job.location}
        </Title>
        <Paragraph ellipsis={!expanded ? { rows: 3 } : false}>
          {job.description}
        </Paragraph>
        <Typography.Link onClick={() => setExpanded(!expanded)}>
          {expanded ? "Hide" : "More"}
        </Typography.Link>
      </div>
      
      <div>
        <Tag color="green">{job.type}</Tag>
        <Tag color="blue">{job.salaryRange}</Tag>
      </div>
      </Space>  
    </Card>
  );
};

export default JobCard;
