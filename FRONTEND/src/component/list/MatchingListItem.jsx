// 스타일 제외하면 PostListItem과 동일함.

import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: calc(100% - 32px);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: 1px solid grey;
  border-radius: 8px;
  cursor: pointer;
  background: white;
  :hover {
    background: lightgrey;
  }
`;

// styledComponent 통해 만든 ContentText 라는 컴포넌트를 이용해서 화면에 표시함
const ContentText = styled.p`
  font-size: 14px;
`;

// MatchingListItem 컴포넌트 : props에서 comment 객체 하나만 사용한다.
// comment 객체에는 사용자가 작성한 댓글 내용이 들어 있다.
// 글은 클릭이 가능하지만 댓글은 별도로 클릭하는 기능이 없기 때문에 onclick 이벤트를 따로 처리하지 않아도 됨.
function MatchingListItem(props) {
  const { comment } = props;

  return (
    <Wrapper>
      <ContentText>{comment.content}</ContentText>
    </Wrapper>
  );
}

export default MatchingListItem;
