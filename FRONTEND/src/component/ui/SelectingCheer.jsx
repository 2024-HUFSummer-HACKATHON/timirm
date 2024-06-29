import React from "react";
import { Select, Space } from "antd";

const options = [
  { value: "응원석에서 일어나서 응원", label: "응원석에서 일어나서 응원" },
  {
    value: "무난한 가격에 신날 때만 일어서서 응원",
    label: "무난한 가격에 신날 때만 일어서서 응원",
  },
  {
    value: "부담없이 가격이 싼 곳에서 계속 앉아서 응원",
    label: "부담없이 가격이 싼 곳에서 계속 앉아서 응원",
  },
  {
    value: "테이블에서 맛있는거 먹으면서 응원",
    label: "테이블에서 맛있는거 먹으면서 응원",
  },
];

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const SelectingCheer = () => (
  <Select
    showSearch
    placeholder="본인의 응원타입"
    filterOption={(input, option) =>
      (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
    }
    options={options}
    onChange={handleChange}
    style={{ width: "100%" }}
  />
);
export default SelectingCheer;
