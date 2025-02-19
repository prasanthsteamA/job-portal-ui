import React from "react";
import { Button, Layout, Typography } from "antd";
import JobList from "../components/JobList";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

const JobPage: React.FC = () => {
 const navigate = useNavigate();
 const handleLogout = () => {
        localStorage.clear();
        navigate("/"); 
      };
  return (
    <Layout>
    <Header style={{ 
      background: "#001529", 
      padding: "16px", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center" 
    }}>
      <Typography.Title level={2} style={{ color: "#fff", margin: 0 }}>
      ABC Job's

      </Typography.Title>

      <Button 
        type="primary" 
        onClick={handleLogout} 
        style={{ background: "#ff4d4f", borderColor: "#ff4d4f" }}
      >
        Logout
      </Button>
    </Header>
    <Content style={{ padding: "20px" }}>
        <JobList />
      </Content>
    </Layout>
  );
};

export default JobPage;
