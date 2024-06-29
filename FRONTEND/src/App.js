// 가장 맨 처음에 렌더링 되는 파일
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

// Pages
import MainPage from "./component/page/MainPage";
import MainMenu from "./component/ui/MainMenu";
import ErrorPage from "./component/page/ErrorPage";
import ErrorBoundary from "./component/hooks/ErrorBoundary";
import ContactPage from "./component/page/ContactPage";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MainTitle = styled.h1`
  font-size: 32px; /* 폰트 크기를 키움 */
  font-weight: bolder; /* 폰트 두께를 더 굵게 */
  margin-left: 20px; /* 추가적인 왼쪽 마진으로 더 오른쪽으로 이동 */
  margin-right: 16px; /* STING과 메뉴 사이 간격 조정 */
`;

// App 컴포넌트 : 타이틀, 라우터 외엔 기능 없음
// 라우트 설정(:/postId : 동적으로 아이디 받음(by useParams))
function App() {
  return (
    <BrowserRouter>
      <HeaderContainer>
        <MainTitle>STING</MainTitle>
        <MainMenu />
      </HeaderContainer>
      <ErrorBoundary>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
