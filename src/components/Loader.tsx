import React from 'react';

import styled from '@emotion/styled';

const LoaderSpan = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 0.6em;
  height: 0.6em;
  margin: 0.19em;
  background: #007db6;
  border-radius: 0.6em;
  animation: loading 1s infinite alternate;

  :nth-of-type(2) {
    background: #008fb2;
    animation-delay: 0.2s;
  }

  :nth-of-type(3) {
    background: #009b9e;
    animation-delay: 0.4s;
  }

  :nth-of-type(4) {
    background: #00a77d;
    animation-delay: 0.6s;
  }

  :nth-of-type(5) {
    background: #00b247;
    animation-delay: 0.8s;
  }

  :nth-of-type(6) {
    background: #5ab027;
    animation-delay: 1s;
  }

  :nth-of-type(7) {
    background: #a0b61e;
    animation-delay: 1.2s;
  }
`;

export default function Loader() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 200px)',
      }}
    >
      <LoaderSpan></LoaderSpan>
      <LoaderSpan></LoaderSpan>
      <LoaderSpan></LoaderSpan>
      <LoaderSpan></LoaderSpan>
      <LoaderSpan></LoaderSpan>
      <LoaderSpan></LoaderSpan>
      <LoaderSpan></LoaderSpan>
    </div>
  );
}
