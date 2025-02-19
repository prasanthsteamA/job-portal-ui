import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authService";

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      setErrorMessage(null);

      const response = await login(values);
      localStorage.setItem("token", response.token);
      localStorage.setItem("userid", response.userId);

      message.success("Login successful!");
      navigate("/jobpage");
    } catch (error) {
      setErrorMessage("Invalid credentials. Please try again.");
      message.error("Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card} bordered={false}>
        <Title level={3} style={styles.title}>
          Welcome Back
        </Title>
        <Text type="secondary" style={styles.subtitle}>
          Please enter your credentials to log in.
        </Text>
        <Form name="login-form" onFinish={onFinish} layout="vertical" style={styles.form}>
          <Form.Item
            name="email"
            rules={[{ required: true, type: "email", message: "Enter a valid email!" }]}
          >
            <Input placeholder="Email" size="large" style={styles.input} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Enter your password!" }]}
          >
            <Input.Password placeholder="Password" size="large" style={styles.input} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block size="large" style={styles.button}>
            Login
          </Button>
          <Text style={styles.loginLink}>
           New User? <a onClick={() => navigate("/signup")}>SignUp</a>
           </Text>
          {errorMessage && <Text type="danger" style={styles.error}>{errorMessage}</Text>}
           
        </Form>
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

export default Login;
