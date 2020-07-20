import * as React from "react";
import styled from "styled-components";
import moment from "moment";
import { Event } from "../model/card.model";
import { useSpring, animated } from "react-spring";

interface Props {
  event: Event;
}

const EventCardContainer = styled.div`
  width: 297px;
  min-height: 289px;
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

  h1 {
    margin: 0;
    font-style: normal;
    font-weight: bold;
    font-size: 35px;
    line-height: 41px;
  }

  h2 {
    font-weight: 300;
    font-size: 24px;
    line-height: 28px;
  }

  small {
    color: lightgray;
  }

  p {
    color: lightgray;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// Use the height and width of the card
const cardWidth = 289;
const cardHeight = 297;
const calc = (x: number, y: number) => [
  -(y - cardWidth / 2) / 20,
  (x - cardHeight / 2) / 20,
  1.05
];
const trans = (x: number, y: number, s: number) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export default function Card({ event }: Props) {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 2, tension: 300, friction: 40 }
  }));

  return (
    <animated.div
      onMouseMove={({ clientX: x, clientY: y, currentTarget }) => {
        // On Mouse move use x and y position relative to the current card
        let cardRect = currentTarget.getBoundingClientRect();

        const offsetX = x - cardRect.left,
          offsetY = y - cardRect.top;

        set({ xys: calc(offsetX, offsetY) });
      }}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      //@ts-ignore
      style={{ transform: props.xys.interpolate(trans) }}
    >
        <EventCardContainer
          style={{
            backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${
              event.background
            })`
          }}
        >
          <FlexContainer>
            <p>{moment(event.date).format("Do MMMM YYYY")}</p>
          </FlexContainer>
          <h1>{event.title}</h1>
          <h2>{event.subtitle}</h2>
        </EventCardContainer>
    </animated.div>
  );
}
