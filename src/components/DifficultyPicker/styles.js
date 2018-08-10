import styled from "styled-components";

const waterMelonPink = "#FD5B78";
const greyBlack = "#1b1b1b";

export const DPWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
export const DifficultyButton = styled.div`
  border: 1px solid ${greyBlack};
  border-radius: 4px;
  margin: 12px;
  width: 90px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    border: 1px solid ${waterMelonPink};
    color: ${waterMelonPink};
  }
`;
