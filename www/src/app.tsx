import GitHubCorners from '@uiw/react-github-corners';
import styled from "styled-components";
import '@wcj/dark-mode';
import { Document } from './Document'

const Warpper = styled.div`
  
`;

const Content = styled.div`
   max-width: 980px;
   margin: 0 auto;
`;

export const App = () => {
  return (
    <Warpper>
      <GitHubCorners target="__blank" fixed href="https://github.com/uiwjs/react-tabs-draggable" />
      <dark-mode permanent></dark-mode>
      <Content>
        <Document />
      </Content>
    </Warpper>
  )
}