import React, { useEffect } from "react";
import { TopNav } from "../../components/Nav/TopNav";
import { SideNav } from "../../components/Nav/SideNav";
import { PageContainer } from "../CardList/CardList";
import Deck from "../../components/Deck/Deck";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentSet,
  selectCards,
  selectCardsLoading,
} from "../CardList/cardListSlice";
import { selectSelectedSet } from "../../app/checkboxSlice";
import { fetchCardsBySet } from "../CardList/cardListThunks";
import { Spinner } from "reactstrap";

export default function DeckBuilder() {
  const dispatch = useDispatch();
  const currentSet = useSelector(selectCurrentSet);
  const cards = useSelector(selectCards);
  const cardsLoading = useSelector(selectCardsLoading);

  const selectedSet = useSelector(selectSelectedSet);

  useEffect(() => {
    if (currentSet) {
      dispatch(
        fetchCardsBySet({
          set: selectedSet,
          pageSize: 220,
          series: currentSet?.series,
          setCode: currentSet?.code,
        })
      );
    }
  }, [dispatch, selectedSet, currentSet]);

  const cardImages = cards?.map((card) => card.imageUrl).slice(0, 59);
  console.log(cardImages);

  return (
    <>
      <TopNav />
      <SideNav />
      <PageContainer>
        {cardsLoading ? (
          <Spinner type="grow" color="primary" />
        ) : (
          //@ts-ignore
          <Deck cards={cardImages} />
        )}

        <div>
          <h1>Battle Mind</h1>
          <small>Fire Psychic Theme Deck</small>
        </div>
      </PageContainer>
    </>
  );
}
