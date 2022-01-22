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
  selectSets,
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
  setSelectedSet,
} from "../../app/checkboxSlice";
import ZoomedCard from "../../components/ZoomedCardView/ZoomedCard";
import { FaStar, FaShareSquare } from "react-icons/fa";
import { useQueryParam, StringParam } from "use-query-params";
import qs from "query-string";

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

  hr {
    border-color: ${({ theme }) => theme.textFaded};
  }

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

      .set-completion-stats {
        flex-direction: column;
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
  const sets = useSelector(selectSets);
  const selectedSet = useSelector(selectSelectedSet);

  const favourites = useSelector(selectFavourites);

  const [, setSet] = useQueryParam("set", StringParam);

  let currentSet = useSelector(selectCurrentSet);
  const params = qs.parse(window.location.search);
  const querySet: string | undefined | null = params.set as
    | string
    | undefined
    | null;

  if (querySet) {
    currentSet = sets?.find((setFromSets) => setFromSets.name === params.set);
  }

  const currentSetChecked = currentSet && checked && checked[currentSet.code];

  const isFavourite = favourites.includes(currentSet?.code ?? "");

  const [filterCollected, setFilterCollected] = useState(false);

  const [modal, setModal] = useState(false);
  const [clickedCardId, setClickedCardId] = useState<string | undefined>();
  const [shareTooltipText, setShareTooltipText] = useState<string>(
    "Copy URL to clipboard"
  );

  const toggle = () => setModal(!modal);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setShareTooltipText("Copied!");
      setTimeout(() => setShareTooltipText("Copy URL to clipboard"), 1000);
    });
  };

  useEffect(() => {
    if (querySet) {
      // Set current set
      dispatch(setSelectedSet(querySet));
    }
    if (params.card) {
      setClickedCardId(params.card as string);
      setModal(true);
    }
    if (currentSet) {
      dispatch(
        fetchCardsBySet({
          pageSize: 220,
          series: currentSet?.series,
          setCode: currentSet?.code,
        })
      );
      setSet(querySet ? querySet : selectedSet);
    }
    // eslint-disable-next-line
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
            <div className="set-header d-flex align-items-baseline justify-content-between">
              <div className="d-flex align-items-center">
                <img
                  height="30"
                  className="mr-2"
                  src={currentSet?.symbolUrl}
                  alt={`${currentSet?.name} logo`}
                />{" "}
                <div className="title-area">
                  <small>{currentSet?.series}</small>
                  <div className="d-flex align-items-center">
                    <h1 className="mb-0">{currentSet?.name}</h1>{" "}
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
                      {isFavourite
                        ? "Remove from Favourites"
                        : "Add to Favourites"}
                    </UncontrolledTooltip>
                    <StyledFavouritesButton
                      id="share-button"
                      onClick={() => copyToClipboard(window.location.href)}
                    >
                      <FaShareSquare className="share-button" />
                    </StyledFavouritesButton>
                    <UncontrolledTooltip target="share-button">
                      {shareTooltipText}
                    </UncontrolledTooltip>
                  </div>
                </div>
              </div>
              <div className="set-completion-stats d-flex align-items-baseline">
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
                <div className="d-flex flex-column mb-3">
                  <span>{currentSet?.name} set complete! </span>
                  <small className="font-weight-light">
                    (Shout out to your{" "}
                    <span aria-label="credit card" role="img">
                      💳
                    </span>
                    )
                  </small>
                </div>
              </div>
            )}
            <hr />
            <Input
              type="text"
              placeholder="Search card list..."
              value={searchterm ?? ""}
              onChange={(event) => dispatch(setSearchterm(event.target.value))}
            />
          </SetInfo>

          <PageContainer>
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
            setClickedCardId={setClickedCardId}
            cardIdsInSet={cards
              ?.slice()
              .sort((a, b) => parseInt(a.number) - parseInt(b.number))
              .map((card) => card.id)}
          />
        </>
      )}
    </>
  );
};
