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
import {
  Spinner,
  Input,
  Progress,
  UncontrolledTooltip,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { SideNav } from "../../components/Nav/SideNav";
import { TopNav } from "../../components/Nav/TopNav";
import moment from "moment";
import { device } from "../../util/device";
import {
  selectChecked,
  selectSelectedSet,
  selectFavourites,
  addFavourite,
  removeFavourite,
  checkAll,
  uncheckAll,
} from "../../app/checkboxSlice";
import ZoomedCard from "../../components/ZoomedCardView/ZoomedCard";
import { FaStar } from "react-icons/fa";

export const PageContainer = styled.div`
  .cards-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  max-width: 1100px;
  margin: 1rem auto;
`;

const SetInfo = styled.div`
  text-align: left;
  max-width: 1000px;
  margin: 1rem auto;
  padding: 0 1rem;

  .title-area {
    line-height: 0.3;
  }

  .set-header {
    @media ${device.tablet} {
      flex-direction: column;

      .percentage-complete {
        margin-left: 0;
        margin-right: 0;
      }
    }
  }

  .percentage-complete {
    margin-left: 1rem;
    margin-right: 1rem;
    font-weight: 300;
    margin-bottom: 0;
    font-size: 1.5rem;
  }

  small {
    font-weight: 400;
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

interface ButtonProps {
  isFavourite?: boolean;
}

export const StyledFavouritesButton = styled.div<ButtonProps>`
  cursor: pointer;
  margin-left: 1rem;
  color: ${(props) => props.isFavourite && "#37a9f8"};

  &:hover {
    color: #37a9f8;
  }
`;

export default () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const cardsLoading = useSelector(selectCardsLoading);
  const searchterm = useSelector(selectSearchterm);
  const checked = useSelector(selectChecked);
  const currentSet = useSelector(selectCurrentSet);
  const favourites = useSelector(selectFavourites);

  const selectedSet = useSelector(selectSelectedSet);

  const currentSetChecked = currentSet && checked && checked[currentSet.code];

  const isFavourite = favourites.includes(currentSet?.code ?? "");

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
          <div className="cards-container">
            <Spinner type="grow" color="primary" />
          </div>
        </PageContainer>
      ) : (
        <>
          <SetInfo>
            <div className="set-header d-flex align-items-baseline">
              <div className="d-flex align-items-center">
                <img
                  height="30"
                  className="mr-2"
                  src={currentSet?.symbolUrl}
                  alt={`${currentSet?.name} logo`}
                />{" "}
                <div className="title-area">
                  <small>{currentSet?.series}</small>
                  <h1 className="mb-0">{currentSet?.name}</h1>{" "}
                </div>
                <StyledFavouritesButton
                  isFavourite={isFavourite}
                  id="favourites-button"
                  onClick={() =>
                    isFavourite
                      ? dispatch(removeFavourite(currentSet?.code))
                      : dispatch(addFavourite(currentSet?.code))
                  }
                >
                  <FaStar />
                </StyledFavouritesButton>
                <UncontrolledTooltip target="favourites-button">
                  {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
                </UncontrolledTooltip>
              </div>
              <p className="percentage-complete">
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
            <div className="d-flex justify-content-between align-items-center my-3">
              <StyledCheckbox check>
                <Input
                  type="checkbox"
                  checked={filterCollected}
                  onChange={() => setFilterCollected(!filterCollected)}
                />
                <span className="checkmark"></span>
                Not collected
              </StyledCheckbox>
              <div>
                {/* <UncontrolledButtonDropdown>
                  <DropdownToggle outline color="primary" size="sm" caret>
                    Sort
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => {}}>Set Order</DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown> */}
                <UncontrolledButtonDropdown className="ml-2">
                  <DropdownToggle outline color="primary" size="sm" caret>
                    More Actions
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() =>
                        dispatch(
                          checkAll({
                            id: currentSet?.code,
                            cardIds: cards?.map((card) => card.id),
                          })
                        )
                      }
                    >
                      Check all
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => dispatch(uncheckAll(currentSet?.code))}
                    >
                      Uncheck all
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
            </div>
          </SetInfo>

          <PageContainer>
            {cards?.length === currentSetChecked?.length && (
              <div className="text-center">
                <h4>
                  <span aria-label="celebration" role="img">
                    🎉
                  </span>{" "}
                  Congratz you did it!{" "}
                  <span aria-label="celebration" role="img">
                    🎉
                  </span>
                </h4>
                <p>
                  {currentSet?.name} set complete! (Shout out to your{" "}
                  <span aria-label="credit card" role="img">
                    💳
                  </span>
                  )
                </p>
              </div>
            )}
            <div className="cards-container">
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
            </div>
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
