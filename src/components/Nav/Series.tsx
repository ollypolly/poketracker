import React, { useState } from "react";
import { SetData } from "../../model/card.model";
import Set from "./Set";
import { Collapse } from "reactstrap";
import { useSelector } from "react-redux";
import { selectSidebarSearchterm } from "../../pages/CardList/cardListSlice";

export interface Props {
  series: string;
  sets: SetData[];
}

export default function Series({ series, sets }: Props) {
  const [expanded, setExpanded] = useState(false);
  const sidebarSearchTerm = useSelector(selectSidebarSearchterm);

  return (
    <>
      <div
        className="series"
        onClick={() => !!!sidebarSearchTerm && setExpanded(!expanded)}
      >
        <h5>{series}</h5>
      </div>
      <Collapse isOpen={expanded || (!!sidebarSearchTerm ?? false)}>
        {sets?.map((set) => {
          return <Set key={set.code} set={set} />;
        })}
      </Collapse>
    </>
  );
}
