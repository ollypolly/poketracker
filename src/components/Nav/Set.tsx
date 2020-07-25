import React from "react";
import { SetData } from "../../model/card.model";
import { setSelectedSet, selectChecked } from "../../app/checkboxSlice";
import {
  setSidebar,
  setSidebarSearchterm,
  setSearchterm,
} from "../../pages/CardList/cardListSlice";
import { Progress } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

export interface Props {
  set: SetData;
}

export default function Set({ set }: Props) {
  const dispatch = useDispatch();
  const checked = useSelector(selectChecked);
  const currentSetChecked = set && checked[set.code];

  return (
    <React.Fragment key={set.code}>
      <div
        className="set"
        onClick={() => {
          dispatch(setSelectedSet(set.name));
          dispatch(setSidebar(false));
          dispatch(setSidebarSearchterm(""));
          dispatch(setSearchterm(""));
        }}
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ), url(${set.logoUrl})`,
        }}
      >
        <strong>{set.name}</strong>
      </div>
      <Progress
        value={
          currentSetChecked &&
          set &&
          (currentSetChecked.length / set.totalCards) * 100
        }
      >
        {currentSetChecked?.length}/{set?.totalCards}
      </Progress>
    </React.Fragment>
  );
}
