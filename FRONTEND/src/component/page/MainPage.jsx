import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CardSlider from "../ui/CardSlider"; // 매칭된 카드를 슬라이드 형태로 보여주는 컴포넌트
import axios from "axios"; // HTTP 요청을 위한 라이브러리
import { Divider, Button, DatePicker, Form, Input, InputNumber } from "antd"; // UI 구성 요소
import moment from "moment"; // 날짜와 시간 조작을 위한 라이브러리
import backgroundImage from "../assets/sting-mainpage.jpg"; // 배경 이미지
import SelectingCheer from "../ui/SelectingCheer";

// ------------- styled-components -------------
// Wrapper: 전체 페이지 레이아웃을 위한 컨테이너
const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 100vh;
`;
// Container: 콘텐츠를 감싸는 컨테이너
const Container = styled.div`
  width: 100%;
  max-width: 720px;
  text-align: center;
  font-weight: 700;

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;
// TitleBox: 페이지 상단 타이틀 박스
const TitleBox = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${backgroundImage});
  background-size: cover;
  background-position: center;
  padding: 32px;
  border-radius: 8px;
  margin-bottom: 16px;
  width: 100%;
  text-align: center;
  color: white; /* 텍스트 색상 */
  font-weight: 900; /* 글꼴 두껍게 설정 */
  font-size: 48px; /* 글꼴 크기 설정 */
`;
// SubtitleBox: 타이틀 아래의 부제목 박스
const SubtitleBox = styled.div`
  font-size: 18px;
  color: #fff;
`;
// Footer: 페이지 하단 고정 푸터
const Footer = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  text-align: left;
  color: #666;
  font-size: 14px;
`;

const dateFormat = "YYYY/MM/DD";
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

function MainPage(props) {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios
      .get("http://43.202.3.34:5000/api/host/main") // 서버로부터 매칭 리스트를 가져옴
      .then((response) => {
        setMatches(response.data); // 매칭 리스트를 상태에 저장
      })
      .catch((error) => {
        console.error("There was an error fetching the matches!", error);
      });
  }, []);
  // 폼 제출 시 호출되는 함수
  const onFinish = (values) => {
    console.log(values);
    axios
      .post("http://43.202.3.34:5000/api/host", values) // 서버로 매칭 데이터를 전송
      .then((response) => {
        if (response.status === 201) {
          alert("성공적으로 매칭 등록이 완료되었습니다.");
          const newMatches = [...matches, response.data];
          setMatches(newMatches);
          navigate("/");
          window.location.reload(); // 홈페이지 새로고침
        }
      })
      .catch((error) => {
        if (error.response.status === 401) alert("오류가 발생했습니다.");
      });
  };

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <Wrapper>
      <TitleBox>
        <h1>STING</h1>
        <SubtitleBox>
          <p>
            Sport Meeting: <br />
            같이 스포츠 경기를 보러갈 상대를 매칭해드립니다 :)
          </p>
        </SubtitleBox>
      </TitleBox>
      <Container>
        <div>
          <Divider />
          <h1>매칭 리스트</h1>

          <CardSlider cards={matches} setMatches={setMatches} />
        </div>
      </Container>
      <Divider plain orientationMargin={50}>
        <b>직관 메이트 구하기 😀 </b>
      </Divider>
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 18,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
      >
        <Form.Item // Form.Item: 매칭 리스트에 등록하기 전 입력하는 사전 정보들
          name="matchTeam1"
          label="응원팀: "
          rules={[{ required: true, message: "응원팀을 입력하세요!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="matchTeam2"
          label="상대팀: "
          rules={[{ required: true, message: "상대팀을 입력하세요!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="내용: "
          rules={[{ required: true, message: "내용을 입력하세요!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="matchDay"
          label="경기 날짜: "
          rules={[{ required: true, message: "경기 날짜를 입력하세요!" }]}
        >
          <DatePicker
            format={dateFormat}
            disabledDate={(current) =>
              current && current < moment().startOf("day")
            } // 달력 형식
          />
        </Form.Item>
        <Form.Item
          name="recruitNumber"
          label="모집 인원: "
          rules={[
            { required: true, message: "모집 인원을 입력하세요!" },
            {
              validator: (_, value) => {
                if (value < 1) {
                  return Promise.reject(
                    "모집 인원은 최소 1명 이상이어야 합니다."
                  );
                } else {
                  return Promise.resolve();
                }
              },
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name="cheerType" label="나의 응원타입: ">
          <Input />
        </Form.Item>
        <Form.Item
          name="instaID"
          label="Instagram ID: "
          rules={[
            {
              required: true,
              message: "인스타그램 ID을 입력해주세요.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            매칭 등록
          </Button>
        </Form.Item>
      </Form>
      <Footer>
        HUFSummer HACKATHON
        <br />
        티미름
      </Footer>
      <Divider plain orientationMargin={50}></Divider>
    </Wrapper>
  ); // footer: 좌측하단에 나타나는 박스(주최측/개발팀)
}

export default MainPage;
