import GitHubCorners from '@uiw/react-github-corners';
import styled from 'styled-components';
import BackToUp from '@uiw/react-back-to-top';
import '@wcj/dark-mode';
import { Document } from './Document';

const Warpper = styled.div`
  padding-bottom: 120px;
`;

const Content = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;

export const App = () => {
  return (
    <Warpper>
      <GitHubCorners target="__blank" fixed href="https://github.com/uiwjs/react-tabs-draggable" />
      <BackToUp>Top</BackToUp>
      <dark-mode permanent style={{ fontSize: 24 }}></dark-mode>
      <Content>
        <Document />
      </Content>
    </Warpper>
  );
};
