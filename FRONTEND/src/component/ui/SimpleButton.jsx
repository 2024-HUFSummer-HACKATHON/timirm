import React from "react";
import styled from "styled-components";

// Styled Component를 사용해서 버튼 태그에 스타일을 입힌 StyledButton이라는 컴포넌트를 만든다.
const StyledButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  border-width: 1px;
  border-radius: 8px;
  cursor: pointer;
`;

// 버튼 컴포넌트
function Button(props) {
  const { title, onClick } = props; // 버튼 컴포넌트에서 props로 받은 타이틀이 버튼 목록에 표시되도록 해줌

  // Styled 버튼에 온클릭을 넣어줌으로써 클릭 이벤트를 상위 컴포넌트에서 받을 수 있도록 함.
  return <StyledButton onClick={onClick}>{title || "button"}</StyledButton>;
}

export default Button;
