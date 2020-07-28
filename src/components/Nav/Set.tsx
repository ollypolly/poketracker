import React from "react";
import { SetData } from "../../model/card.model";
import {
  setSelectedSet,
  selectChecked,
  removeFavourite,
} from "../../app/checkboxSlice";
import {
  setSidebar,
  setSidebarSearchterm,
  setSearchterm,
} from "../../pages/CardList/cardListSlice";
import { Progress } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { StyledFavouritesButton } from "../../pages/CardList/CardList";

export interface Props {
  set: SetData;
  favourite?: boolean;
}

export default function Set({ set, favourite }: Props) {
  const dispatch = useDispatch();
  const checked = useSelector(selectChecked);
  const currentSetChecked = set && checked && checked[set.code];

  return (
    <React.Fragment key={set.code}>
      <div
        className="set d-flex justify-content-between align-items-center"
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
        {favourite && (
          <StyledFavouritesButton
            onClick={(event) => {
              event.stopPropagation();
              dispatch(removeFavourite(set.code));
            }}
          >
            <FaTimes />
          </StyledFavouritesButton>
        )}
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
