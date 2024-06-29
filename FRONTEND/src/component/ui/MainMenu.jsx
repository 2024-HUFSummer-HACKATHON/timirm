import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

function MainMenu() {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home">
        <Link to="/">홈</Link>
      </Menu.Item>
      <Menu.Item key="survey">
        <Link to="https://forms.gle/PqZjek9CBT9YnMNHA">만족도 조사</Link>
      </Menu.Item>
      <Menu.Item key="contact">
        <Link to="/contact">문의하기</Link>
      </Menu.Item>
    </Menu>
  );
}

export default MainMenu;
