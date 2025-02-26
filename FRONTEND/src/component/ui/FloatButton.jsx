import React from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
const FloatingActionButton = () => (
  <>
    <FloatButton
      icon={<QuestionCircleOutlined />}
      type="primary"
      style={{
        right: 24,
      }}
    />
    <FloatButton
      icon={<QuestionCircleOutlined />}
      type="default"
      style={{
        right: 94,
      }}
    />
  </>
);
export default FloatingActionButton;
