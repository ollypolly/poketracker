import React, { useEffect, useState } from "react";
import { Modal, UncontrolledTooltip } from "reactstrap";
import Card from "../Card/Card";
import styled from "styled-components";
import { CardData } from "../../model/card.model";
import {
  FaShareSquare,
  FaExternalLinkAlt,
  FaChevronCircleLeft,
  FaChevronCircleRight,
} from "react-icons/fa";
import { StyledFavouritesButton } from "../../pages/CardList/CardList";
import { device } from "../../util/device";
import { useQueryParam, StringParam } from "use-query-params";

const StyledModal = styled(Modal)`
  position: relative;
  .modal-content {
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    color: white;
    margin-top: 5rem;
  }

  .left-right-button {
    position: absolute;
    top: 40vh;

    font-size: 2rem;

    div {
      margin-left: 0;
    }
  }

  .left-button {
    left: 0;
  }

  .right-button {
    right: 0;
  }

  .share-button {
    font-size: 1.5rem;
  }

  .card-title-area {
    h1 {
      margin-bottom: 0;
    }
  }

  @media ${device.tablet} {
    .card-title-area {
      flex-direction: column;
    }
  }
`;

const CardInfo = styled.div`
  margin-bottom: 1rem;
`;

const CardContainer = styled.div`
  padding: 0.5rem;
`;

export interface Props {
  cardData?: CardData;
  isOpen: boolean;
  toggle: () => void;
  setClickedCardId: (cardId: string) => void;
  cardIdsInSet?: string[];
}

const ZoomedCard = (props: Props) => {
  const { cardData } = props;
  const [, setCard] = useQueryParam("card", StringParam);
  // Get current set
  // Get position of selected card in array
  const currentIndex = props.cardIdsInSet?.findIndex(
    (cardId) => cardId === cardData?.id
  );
  // Make function to return id of next/previous

  const [shareTooltipText, setShareTooltipText] = useState<string>(
    "Copy URL to clipboard"
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setShareTooltipText("Copied!");
      setTimeout(() => setShareTooltipText("Copy URL to clipboard"), 1000);
    });
  };

  useEffect(() => {
    if (props.isOpen) {
      setCard(cardData?.id);
    }
  }, [cardData, setCard, props.isOpen]);

  return (
    <div>
      <StyledModal
        isOpen={props.isOpen}
        toggle={() => {
          setCard(undefined);
          props.toggle();
        }}
      >
        {cardData && (
          <div>
            <CardInfo>
              <small>{cardData.set}</small>
              <div className="d-flex align-items-center justify-content-between">
                <div className="card-title-area d-flex align-items-baseline">
                  <h1 className="mr-2">{cardData.name} </h1>
                </div>

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

              <h3>
                {cardData.rarity} {cardData.subtype} {cardData.supertype}
              </h3>
              <a
                id="tcgplayerlink"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&q=${cardData.name}`}
              >
                <div className=" d-flex align-items-center">
                  <FaExternalLinkAlt className="mr-1" />
                  <p className="font-weight-light mb-0">TCG Player</p>
                </div>
              </a>
              <UncontrolledTooltip target="tcgplayerlink">
                View TCG Player Listing
              </UncontrolledTooltip>
            </CardInfo>
            <CardContainer>
              <Card hiRes cardData={cardData} />
              {currentIndex !== 0 && (
                <div
                  className="left-right-button left-button"
                  onClick={() => {
                    props.setClickedCardId(
                      (props.cardIdsInSet &&
                        props.cardIdsInSet[currentIndex! - 1]) ??
                        ""
                    );
                  }}
                >
                  <StyledFavouritesButton>
                    <FaChevronCircleLeft />
                  </StyledFavouritesButton>
                </div>
              )}

              {currentIndex !== props.cardIdsInSet?.length! - 1 && (
                <div
                  className="left-right-button right-button"
                  onClick={() => {
                    props.setClickedCardId(
                      (props.cardIdsInSet &&
                        props.cardIdsInSet[currentIndex! + 1]) ??
                        ""
                    );
                  }}
                >
                  <StyledFavouritesButton>
                    <FaChevronCircleRight />
                  </StyledFavouritesButton>
                </div>
              )}
            </CardContainer>
          </div>
        )}
      </StyledModal>
    </div>
  );
};

export default ZoomedCard;
