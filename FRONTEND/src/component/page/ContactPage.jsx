import React, { useRef } from "react";
import { Button, Form, Input, InputNumber, Flex } from "antd";
import emailjs from "@emailjs/browser";
const { TextArea } = Input;

const onChange = (e) => {
  console.log("Change:", e.target.value);
};

function ContactPage(props) {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_6xu6wib",
        "template_8onf08r",
        form.current,
        "FsZ1ENmQr9iBkeVP_"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("성공적으로 매칭 등록이 완료되었습니다.");
          window.location.reload(); // 홈페이지 새로고침
        },
        (error) => {
          console.log(error.text);
          alert("에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <Flex vertical gap={32}>
        <label>Name</label>
        <Input type="text" name="user_name" />
        <label>Email</label>
        <Input type="email" name="user_email" />
        <label>Message</label>
        <TextArea
          showCount
          maxLength={100}
          onChange={onChange}
          placeholder="문의 내용을 작성해주세요!"
          style={{
            height: 120,
            resize: "none",
          }}
          name="message"
        />
        <Button
          type="primary"
          htmlType="submit"
          value="submit"
          style={{ width: "100%" }}
        >
          문의 이메일 전송하기
        </Button>
      </Flex>
    </form>
  );
}

export default ContactPage;
