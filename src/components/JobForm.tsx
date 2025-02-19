import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { Job } from "../interfaces/Job";

const { Option } = Select;

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (job: Partial<Job>) => void;
  job?: Job;
}

const JobForm: React.FC<Props> = ({ visible, onClose, onSubmit, job }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(job || { title: "", description: "", location: "", type: "Full-time" });
  }, [job, form]);

  return (
    <Modal open={visible} title={job ? "Edit Job" : "Add Job"} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please enter job title" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please enter job description" }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="location" label="Location" rules={[{ required: true, message: "Please enter location" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="salaryRange" label="Salary Range" rules={[{ required: true, message: "Please enter Salary Range" }]}>
          <Input />
        </Form.Item>
        <Form.Item  name="postedById" label="postedById" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Type">
          <Select>
            <Option value="Full-time">Full-time</Option>
            <Option value="Part-time">Part-time</Option>
            <Option value="Internship">Internship</Option>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          {job ? "Update Job" : "Add Job"}
        </Button>
      </Form>
    </Modal>
  );
};

export default JobForm;
