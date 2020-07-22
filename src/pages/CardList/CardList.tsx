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

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  max-width: 1100px;
  margin: 1rem auto;
`;

const SetInfo = styled.div`
  text-align: left;
  align-items: baseline;
  max-width: 1000px;
  margin: 1rem auto;
  padding: 0 1rem;

  p {
    margin-left: 0.8rem;
    margin-bottom: 0;
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

  useEffect(() => {
    dispatch(
      fetchCardsBySet({
        set: selectedSet,
        pageSize: 220,
      })
    );
  }, [dispatch, selectedSet]);

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
        <CardContainer>
          <Spinner type="grow" color="primary" />
        </CardContainer>
      ) : (
        <>
          <SetInfo>
            <div className="d-flex align-items-center">
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

          <CardContainer>
            {filteredCards?.map((card) => (
              <Card key={card.id} cardData={card} />
            ))}
          </CardContainer>
        </>
      )}
    </>
  );
};
