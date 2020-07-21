import React, { useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCards,
  selectCardsLoading,
  selectSearchterm,
} from "./cardListSlice";
import { fetchCardsBySet } from "./cardListThunks";
import { Spinner } from "reactstrap";
import { SideNav } from "../components/Nav/SideNav";
import { TopNav } from "../components/Nav/TopNav";

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  max-width: 1100px;
  margin: 1rem auto;
`;

export default () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const cardsLoading = useSelector(selectCardsLoading);
  const searchterm = useSelector(selectSearchterm);

  useEffect(() => {
    dispatch(
      fetchCardsBySet({
        set: "Rebel Clash",
        pageSize: 220,
      })
    );
  }, [dispatch]);

  const filteredCards = cards
    ?.slice()
    .filter((card) => card.name.toLowerCase().includes(searchterm ?? ""));

  return (
    <>
      <TopNav />
      <SideNav />
      {cardsLoading ? (
        <CardContainer>
          <Spinner type="grow" color="primary" />
        </CardContainer>
      ) : (
        <CardContainer>
          {filteredCards?.map((card) => (
            <Card key={card.id} cardData={card} />
          ))}
        </CardContainer>
      )}
    </>
  );
};
