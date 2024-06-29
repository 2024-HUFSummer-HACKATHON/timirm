import React from "react";
import styled from "styled-components";

// TextInput 컴포넌트 : 사용자로부터 텍스트를 입력 받을 수 있게 해주는 컴포넌트
// 여러줄을 받아야 하므로 textarea라는 태그를 사용한다.

// Styled 컴포넌트를 사용해서 text-area 태그에 스타일을 입힌 styled-text-area 컴포넌트를 만듬.
const StyledTextarea = styled.textarea`
  width: calc(100% - 32px);
  ${(props) =>
    props.height &&
    `height: ${props.height}px;
        `}
  padding: 16px;
  font-size: 16px;
  line-height: 20px;
`;

function TextInput(props) {
  // 높이 설정을 위한 height, 입력된 값을 표시하기 위한 value, 변경된 값을 상위 컴포넌트로 전달하기 위한 onChange가 있다.
  const { height, value, onChange } = props;

  return <StyledTextarea height={height} value={value} onChange={onChange} />;
}

export default TextInput;
