import styled from "styled-components";

const waterMelonPink = "#FD5B78";

const greyBlack = "#1b1b1b"

export const GameTileContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 20%;
  justify-content: space-evenly;
`;

export const GameTile = styled.div`
  width: 200px;
  height: 200px;
  margin: 12px;
  cursor: pointer;
`;

export const Card = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;

  transform: ${props => (props.show ? "rotateY(180deg)" : "rotateY(0deg)")};

  * {
    position: absolute;
    width: 100%;
    height: 100%;
    line-height: 200px;
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    backface-visibility: hidden;
    margin-top: 12px;
    border-radius: 6px;
    box-shadow: 9px 10px 31px -6px rgba(0, 0, 0, 0.75);
  }
`;

export const Front = styled.div`
  background: ${greyBlack};
  margin: 12px;
  border: 1px solid ${greyBlack};

  &:hover {
    border: 3px solid ${waterMelonPink};
  }
`;

export const Back = styled.div`
  background: ${waterMelonPink};
  border: 1px solid ${waterMelonPink};
  color: #ffcc33;
  transform: rotateY(180deg);
`;
