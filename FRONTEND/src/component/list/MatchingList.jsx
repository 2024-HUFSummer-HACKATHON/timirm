import React from "react";
import styled from "styled-components";
import MatchingListItem from "./MatchingListItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

// Comment-List 컴포넌트의 props로는 comments라는 배열이 들어오게 된다.
// 이 배열에는 comment 객체들이 들어 있으며 이 배열에 map 함수를 사용해서
// 각 댓글 객체를 MatchingListItem 컴포넌트로 넘겨 화면에 댓글을 표시한다.
function MatchingList(props) {
  const { comments } = props;

  return (
    <Wrapper>
      {comments.map((comment, index) => {
        return <MatchingListItem key={comment.id} comment={comment} />;
      })}
    </Wrapper>
  );
}

export default MatchingList;
