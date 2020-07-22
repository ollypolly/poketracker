import React from "react";
import { Modal } from "reactstrap";
import Card from "../Card/Card";
import styled from "styled-components";
import { CardData } from "../../model/card.model";

const StyledModal = styled(Modal)`
  .modal-content {
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    color: white;
    margin-top: 5rem;
  }
`;

const CardInfo = styled.div`
  margin-bottom: 1rem;
`;

export interface Props {
  cardData?: CardData;
  isOpen: boolean;
  toggle: () => void;
}

const ZoomedCard = (props: Props) => {
  const { cardData } = props;
  return (
    <div>
      <StyledModal isOpen={props.isOpen} toggle={props.toggle}>
        {cardData && (
          <div>
            <CardInfo>
              <small>{cardData.set}</small>
              <h1>{cardData.name}</h1>
              <h3>
                {cardData.rarity} {cardData.subtype} {cardData.supertype}
              </h3>
            </CardInfo>
            <Card hiRes cardData={cardData} />
          </div>
        )}
      </StyledModal>
    </div>
  );
};

export default ZoomedCard;
