import * as React from "react";
import styled from "styled-components";
import { CardData } from "../../model/card.model";
import { useSpring, animated } from "react-spring";
import { Input, Label } from "reactstrap";
import { useState } from "react";
import { device } from "../../util/device";
import { checkCard, selectChecked } from "../../app/checkboxSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentSet } from "../../pages/CardList/cardListSlice";

interface Props {
  cardData: CardData;
}

const EventCardContainer = styled.div`
  width: 245px;
  height: 342px;
  margin: 0.5rem;
  padding: 1rem;
  border-radius: 10px;

  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: transform 0.1s ease-in-out, color 0.1s ease-in-out,
    box-shadow 0.4s ease-in-out;

  color: white;
  text-decoration: none;

  cursor: pointer;

  &:hover {
    color: lightgrey;
    box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
  }

  h2 {
    margin: 0;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
  }

  h3 {
    font-weight: 400;
    font-size: 15px;
  }

  .card-info {
    text-align: left;
  }

  small {
    color: lightgray;
  }

  p {
    color: lightgray;
  }

  @media ${device.tablet} {
    h2 {
      font-size: 12px;
    }

    h3 {
      font-size: 10px;
    }
    width: 146px;
    height: 200px;
    margin: 0.2rem;
    padding: 0.5rem;
  }

  @media ${device.mobileL} {
    width: 115px;
    height: 160px;
    margin: 0.2rem;
    border-radius: 5px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledCheckbox = styled(Label)`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-top: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 15px;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
  }

  &:hover input ~ .checkmark {
    background-color: lightgreen;
  }

  input:checked ~ .checkmark {
    background-color: green;
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  input:checked ~ .checkmark:after {
    display: block;
  }

  .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

// Use the height and width of the card
const cardWidth = 289;
const cardHeight = 297;
const calc = (x: number, y: number) => [
  -(y - cardWidth / 2) / 20,
  (x - cardHeight / 2) / 20,
  1.05,
];
const trans = (x: number, y: number, s: number) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export default function Card({ cardData }: Props) {
  const dispatch = useDispatch();
  const currentSet = useSelector(selectCurrentSet);
  const checked = useSelector(selectChecked);

  const isCardChecked =
    currentSet && checked[currentSet?.code]?.includes(cardData.id);

  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 0.5, tension: 300, friction: 40 },
  }));

  const [disableAnimation, setDisableAnimation] = useState(false);

  return (
    <animated.div
      onMouseMove={({ clientX: x, clientY: y, currentTarget }) => {
        // On Mouse move use x and y position relative to the current card
        let cardRect = currentTarget.getBoundingClientRect();

        const offsetX = x - cardRect.left,
          offsetY = y - cardRect.top;

        if (!disableAnimation) {
          set({ xys: calc(offsetX, offsetY) });
        } else {
          set({ xys: [0, 0, 1] });
        }
      }}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      //@ts-ignore
      style={{ transform: props.xys.interpolate(trans) }}
    >
      <EventCardContainer
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8) ), url(${cardData.imageUrl})`,
        }}
      >
        <FlexContainer>
          {/* <UncontrolledButtonDropdown >
            <DropdownToggle>
              <FaEllipsisV />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Add to deck</DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown> */}
          <StyledCheckbox
            onMouseEnter={() => setDisableAnimation(true)}
            onMouseLeave={() => setDisableAnimation(false)}
            check
          >
            <Input
              type="checkbox"
              checked={isCardChecked ?? false}
              onChange={() =>
                dispatch(
                  checkCard({
                    set: currentSet?.code,
                    id: cardData.id,
                    currentChecked: isCardChecked,
                  })
                )
              }
            />
            <span className="checkmark"></span>
          </StyledCheckbox>
          <div className="card-info">
            <h2>
              #{cardData.number} {cardData.name}
            </h2>
            <h3>
              {cardData.rarity} {cardData.subtype} {cardData.supertype}
            </h3>
          </div>
        </FlexContainer>
      </EventCardContainer>
    </animated.div>
  );
}
