import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card, { StyledCheckbox } from "../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCards,
  selectCardsLoading,
  selectSearchterm,
  setSearchterm,
  selectCurrentSet,
} from "./cardListSlice";
import { fetchCardsBySet } from "./cardListThunks";
import { Spinner, Input, Progress } from "reactstrap";
import { SideNav } from "../../components/Nav/SideNav";
import { TopNav } from "../../components/Nav/TopNav";
import moment from "moment";
import { device } from "../../util/device";
import { selectChecked, selectSelectedSet } from "../../app/checkboxSlice";
import ZoomedCard from "../../components/ZoomedCardView/ZoomedCard";

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  max-width: 1100px;
  margin: 1rem auto;
`;

const SetInfo = styled.div`
  text-align: left;
  max-width: 1000px;
  margin: 1rem auto;
  padding: 0 1rem;

  p {
    margin-left: 0.8rem;
    margin-right: 0.8rem;
    font-weight: 200;
    margin-bottom: 0;
    font-size: 1.5rem;
  }

  small {
    font-weight: 200;
  }

  input,
  .progress {
    margin-top: 1rem;
  }

  @media ${device.tablet} {
    h1 {
      font-size: 2rem;
    }
    max-width: 800px;
  }
`;

export default () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const cardsLoading = useSelector(selectCardsLoading);
  const searchterm = useSelector(selectSearchterm);
  const checked = useSelector(selectChecked);
  const currentSet = useSelector(selectCurrentSet);

  const selectedSet = useSelector(selectSelectedSet);

  const currentSetChecked = currentSet && checked[currentSet.code];

  const [filterCollected, setFilterCollected] = useState(false);

  const [modal, setModal] = useState(false);
  const [clickedCardId, setClickedCardId] = useState<string | undefined>();

  const toggle = () => setModal(!modal);

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

  const filteredCards = cards
    ?.slice()
    .filter((card) =>
      filterCollected
        ? currentSet &&
          !checked[currentSet?.code]?.includes(card.id) &&
          card.name.toLowerCase().includes(searchterm?.toLowerCase() ?? "")
        : card.name.toLowerCase().includes(searchterm?.toLowerCase() ?? "")
    )
    .sort((a, b) => parseInt(a.number) - parseInt(b.number));

  return (
    <>
      <TopNav />
      <SideNav />
      {cardsLoading ? (
        <PageContainer>
          <Spinner type="grow" color="primary" />
        </PageContainer>
      ) : (
        <>
          <SetInfo>
            <div className="d-flex align-items-baseline">
              <img
                height="30"
                className="mr-2"
                src={currentSet?.symbolUrl}
                alt={`${currentSet?.name} logo`}
              />{" "}
              <h1>{currentSet?.name}</h1>
              <p>
                {currentSetChecked
                  ? currentSet &&
                    Math.round(
                      (currentSetChecked.length / currentSet.totalCards) * 100
                    )
                  : 0}
                %
              </p>
              <small>
                {currentSetChecked?.length ?? 0}/{currentSet?.totalCards}
              </small>
            </div>
            <small>
              Released{" "}
              {currentSet &&
                moment(new Date(currentSet.releaseDate)).format("LL")}
              {currentSet?.standardLegal && " • Standard"}
            </small>
            <Progress
              value={
                currentSetChecked &&
                currentSet &&
                (currentSetChecked.length / currentSet.totalCards) * 100
              }
            >
              {currentSetChecked?.length}/{currentSet?.totalCards}
            </Progress>

            <Input
              type="text"
              placeholder="Search card list..."
              value={searchterm ?? ""}
              onChange={(event) => dispatch(setSearchterm(event.target.value))}
            />
            <StyledCheckbox check>
              <Input
                type="checkbox"
                checked={filterCollected}
                onChange={() => setFilterCollected(!filterCollected)}
              />
              <span className="checkmark"></span>
              Not collected
            </StyledCheckbox>
          </SetInfo>

          <PageContainer>
            {filteredCards?.map((card) => (
              <Card
                key={card.id}
                cardData={card}
                onClick={() => {
                  setClickedCardId(card.id);
                  setModal(true);
                }}
              />
            ))}
          </PageContainer>
          <ZoomedCard
            toggle={toggle}
            isOpen={modal}
            cardData={filteredCards?.find((card) => clickedCardId === card.id)}
          />
        </>
      )}
    </>
  );
};
