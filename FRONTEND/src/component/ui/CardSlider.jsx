import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, message, Popconfirm, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";

const InstagramLink = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: #000;
`;

const Icon = styled.span`
  margin-right: 8px;
`;

const InstagramLinkWithIcon = ({ instaID }) => (
  <InstagramLink
    href={`https://instagram.com/${instaID}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon>
      <FontAwesomeIcon icon={faInstagram} size="lg" />
    </Icon>
    {instaID}
  </InstagramLink>
);

const SliderContainer = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100%;
  max-width: 720px;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
`;

const Card = styled.div`
  min-width: 200px;
  padding: 16px;
  margin: 16px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  flex-shrink: 0;
  text-align: left;
  scroll-snap-align: start;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const CardCount = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin-bottom: 16px;
`;

const { Option } = Select;

function formatDate(dateString) {
  return new Date(dateString).toISOString().split("T")[0];
}

function CardSlider({ cards }) {
  const [visibleCards, setVisibleCards] = useState([]);
  const [filterValue, setFilterValue] = useState("전체"); // 초기 선택 박스 값

  useEffect(() => {
    // 최신순으로 정렬된 카드 리스트 생성
    const sortedCards = [...cards].sort(
      (a, b) => new Date(b.matchDay) - new Date(a.matchDay)
    );

    // 조회수를 기준으로 재정렬
    const sortedByViews = [...sortedCards].sort((a, b) => b.views - a.views);

    const initialVisibleCards = sortedByViews.map((card) => ({
      ...card,
      showInsta: false,
    }));
    setVisibleCards(initialVisibleCards);

    // 조회수 가져오기 및 초기화
    initialVisibleCards.forEach((card, index) => {
      axios
        .post("http://43.202.3.34:5000/api/host/view", { documentId: card._id })
        .then((response) => {
          const updatedCards = [...initialVisibleCards];
          updatedCards[index].views = response.data.views;
          setVisibleCards(updatedCards);
        })
        .catch((error) => {
          console.error("Error fetching views", error);
        });
    });
  }, [cards]);

  const handleAccept = (index) => {
    const updatedCards = [...visibleCards];
    updatedCards[index].showInsta = true;
    setVisibleCards(updatedCards);
    console.log(updatedCards[index]._id);

    axios
      .patch(
        `http://43.202.3.34:5000/api/host/accept/${updatedCards[index]._id}`
      )
      .then((response) => {
        console.log("Match accepted", response.data);
        // 조회수 증가 요청
        axios
          .patch(
            `http://43.202.3.34:5000/api/host/increment-views/${updatedCards[index]._id}`
          )
          .then((res) => {
            const updatedViews = [...updatedCards];
            updatedViews[index].views = res.data.views;
            setVisibleCards(updatedViews);
            console.log("Views incremented", res.data);
          })
          .catch((err) => {
            console.error("Error incrementing views", err);
          });
      })
      .catch((error) => {
        console.error("Error accepting match", error);
      });
  };

  const handleConfirm = (index) => {
    handleAccept(index);
    message.success(
      "매칭을 수락했습니다. 이제 Instagram ID를 누르시면 상대방의 인스타그램 페이지로 리다이렉트됩니다!"
    );
  };

  const handleCancel = () => {
    message.error("매칭 수락을 취소했습니다.");
  };

  // 선택 박스 값에 따라 카드를 필터링하는 함수
  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  // 선택 박스 값이 "전체"이거나 카드의 응원 타입이 선택 박스 값과 일치할 때 true 반환
  const filterCards = (card) => {
    if (filterValue === "전체") {
      return true;
    }
    return card.cheerType === filterValue;
  };

  return (
    <div>
      <Select
        defaultValue="전체"
        style={{ width: 350, marginBottom: 16 }}
        onChange={handleFilterChange}
      >
        <Option value="전체">전체</Option>
        <Option value="1">응원석에서 일어나서 응원</Option>
        <Option value="2">무난한 가격에 신날 때만 일어서서 응원</Option>
        <Option value="3">부담없이 가격이 싼 곳에서 계속 앉아서 응원</Option>
        <Option value="4">테이블에서 맛있는거 먹으면서 응원</Option>
      </Select>
      <CardCount>총 {visibleCards.length}개</CardCount>
      <SliderContainer>
        {visibleCards.filter(filterCards).map((card, index) => (
          <Card key={index}>
            <h3>
              {card.matchTeam1} vs {card.matchTeam2}
            </h3>
            <p>{card.content}</p>
            <p>경기 날짜: {formatDate(card.matchDay)}</p>
            <p>모집 인원: {card.recruitNumber}</p>
            <p>조회수: {card.views}</p>
            <p>응원 타입: {card.cheerType}</p>
            {card.showInsta && (
              <p>
                인스타그램 ID: <InstagramLinkWithIcon instaID={card.instaID} />
              </p>
            )}
            {!card.showInsta && (
              <ButtonGroup>
                <Popconfirm
                  title="매칭을 수락하시겠습니까?"
                  onConfirm={() => handleConfirm(index)}
                  onCancel={handleCancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary">수락</Button>
                </Popconfirm>
              </ButtonGroup>
            )}
          </Card>
        ))}
      </SliderContainer>
    </div>
  );
}

export default CardSlider;
