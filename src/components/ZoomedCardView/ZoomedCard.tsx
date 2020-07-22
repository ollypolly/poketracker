import React from "react";
import { Modal } from "reactstrap";
import Card from "../Card/Card";

const ZoomedCard = (props: any) => {
  const { className } = props;

  return (
    <div>
      <Modal isOpen={props.isOpen} toggle={props.toggle} className={className}>
        <Card hiRes cardData={props.cardData} />
      </Modal>
    </div>
  );
};

export default ZoomedCard;
