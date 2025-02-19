import React, { useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authService"; // Import API function

const { Title, Text } = Typography;

const Signup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const onFinish = async (values: { name: string; email: string; password: string }) => {
    try {
      setLoading(true);
      setErrorMessage(null); // Clear previous errors
      
      await register(values);
      
      navigate("/"); // Redirect to login after successful signup
    } catch (error) {
      setErrorMessage("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card} bordered={false}>
        <Title level={3} style={styles.title}>Create an Account</Title>
        <Text type="secondary" style={styles.subtitle}>Sign up to get started</Text>
        <Form name="signup-form" onFinish={onFinish} layout="vertical" style={styles.form}>
          <Form.Item name="name" rules={[{ required: true, message: "Enter your name!" }]}>
            <Input placeholder="Full Name" size="large" style={styles.input} />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, type: "email", message: "Enter a valid email!" }]}>
            <Input placeholder="Email" size="large" style={styles.input} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, min: 6, message: "Password must be at least 6 characters!" }]}>
            <Input.Password placeholder="Password" size="large" style={styles.input} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block size="large" style={styles.button}>
            Sign Up
          </Button>
          {errorMessage && <Text type="danger" style={styles.error}>{errorMessage}</Text>}
        </Form>
        <Text style={styles.loginLink}>
          Already have an account? <a onClick={() => navigate("/")}>Login</a>
        </Text>
      </Card>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f7fc",
  },
  card: {
    width: 400,
    padding: "30px",
    textAlign: "center",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
  },
  title: {
    marginBottom: 8,
    fontWeight: 600,
  },
  subtitle: {
    marginBottom: 20,
    display: "block",
  },
  form: {
    marginTop: 20,
  },
  input: {
    borderRadius: "8px",
  },
  button: {
    borderRadius: "8px",
    fontWeight: "bold",
    marginTop: 10,
  },
  error: {
    display: "block",
    color: "#ff4d4f",
    marginTop: 10,
    fontSize: "14px",
  },
  loginLink: {
    marginTop: 15,
    display: "block",
  },
};

export default Signup;
