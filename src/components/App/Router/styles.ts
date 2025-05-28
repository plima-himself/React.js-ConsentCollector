import styled from "styled-components";
import { MOBILE_BREAKPOINT_PX } from "config";

export const Root = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: radial-gradient(circle at 100% 100%, #21c6b247, #fff0 40%),
    radial-gradient(circle at 50% 0, #2d62ff4d, #fff0 40%),
    radial-gradient(circle at 0 100%, #dd23bb40, #fff0 41%);
  background-color: #0d2632;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${MOBILE_BREAKPOINT_PX}px) {
    flex-direction: column;
  }
`;

export const OutletContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;
