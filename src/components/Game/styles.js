import styled from "styled-components";

const waterMelonPink = "#FD5B78";
const greyBlack = "#1b1b1b";

export const GameWrapper = styled.div`
  height: 100vh;
  text-align: center;
`;

export const GameCompleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledButton = styled.div`
  border: 1px solid ${greyBlack};
  border-radius: 4px;
  margin: 12px;
  width: 140px;
  padding: 10px;
  cursor: pointer;
  align-self: center;

  &:hover {
    border: 1px solid ${waterMelonPink};
    color: ${waterMelonPink};
  }
`;
