import React, { useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { selectCards, selectCardsLoading } from "./cardListSlice";
import { fetchCardsBySet } from "./cardListThunks";
import { Spinner } from "reactstrap";
import { SideNav } from "../components/Nav/SideNav";
import { TopNav } from "../components/Nav/TopNav";

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  max-width: 1100px;
  margin: auto;
`;

export default () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const cardsLoading = useSelector(selectCardsLoading);

  useEffect(() => {
    dispatch(fetchCardsBySet({ set: "Rebel Clash", pageSize: 192 }));
  }, [dispatch]);

  return (
    <>
      <TopNav />
      <SideNav />
      {cardsLoading ? (
        <Spinner type="grow" color="primary" />
      ) : (
        <CardContainer>
          {cards?.map((card) => (
            <Card key={card.id} cardData={card} />
          ))}
        </CardContainer>
      )}
    </>
  );
};
