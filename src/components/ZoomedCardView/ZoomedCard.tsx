import React, { useEffect } from "react";
import { Modal, UncontrolledTooltip } from "reactstrap";
import Card from "../Card/Card";
import styled from "styled-components";
import { CardData } from "../../model/card.model";
import {
  FaExternalLinkAlt,
  FaChevronCircleRight,
  FaChevronCircleLeft,
  FaShareSquare,
} from "react-icons/fa";
import { StyledFavouritesButton } from "../../pages/CardList/CardList";
import { device } from "../../util/device";
import { useQueryParam, StringParam } from "use-query-params";
import qs from "query-string";

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

  .share-button {
    font-size: 1.5rem;
  }

  .left-right-button {
    position: absolute;
    top: 50%;

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
}

const ZoomedCard = (props: Props) => {
  const { cardData } = props;
  const [, setCard] = useQueryParam("card", StringParam);

  useEffect(() => {
    setCard(cardData?.id);
  }, [cardData, setCard]);

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
                  <a
                    id="tcgplayerlink"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://tcgplayer.com"
                  >
                    <div className=" d-flex align-items-center">
                      <FaExternalLinkAlt className="mr-1" />
                      <p className="font-weight-light mb-0"> approx. $4.20</p>
                    </div>
                  </a>
                </div>

                <UncontrolledTooltip target="tcgplayerlink">
                  View TCG Player Listing
                </UncontrolledTooltip>
                <StyledFavouritesButton id="share-button">
                  <FaShareSquare className="share-button" />
                </StyledFavouritesButton>
                <UncontrolledTooltip target="share-button">
                  Copy link to clipboard
                </UncontrolledTooltip>
              </div>

              <h3>
                {cardData.rarity} {cardData.subtype} {cardData.supertype}
              </h3>
            </CardInfo>
            <CardContainer>
              <Card hiRes cardData={cardData} />
            </CardContainer>
            <div className="left-right-button left-button">
              <StyledFavouritesButton>
                <FaChevronCircleLeft />
              </StyledFavouritesButton>
            </div>

            <div className="left-right-button right-button">
              <StyledFavouritesButton>
                <FaChevronCircleRight />
              </StyledFavouritesButton>
            </div>
          </div>
        )}
      </StyledModal>
    </div>
  );
};

export default ZoomedCard;
