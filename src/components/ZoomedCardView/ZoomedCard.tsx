import React from "react";
import { Modal } from "reactstrap";
import Card from "../Card/Card";
import styled from "styled-components";

const ZoomedCard = (props: any) => {
  const StyledModal = styled(Modal)`
    .modal-content {
      background-color: transparent;
      border: none;
      display: flex;
      justify-content: center;
    }
  `;

  return (
    <div>
      <StyledModal isOpen={props.isOpen} toggle={props.toggle}>
        <Card hiRes cardData={props.cardData} />
      </StyledModal>
    </div>
  );
};

export default ZoomedCard;
