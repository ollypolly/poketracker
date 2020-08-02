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
import moment from "moment";
import { useQueryParam, StringParam } from "use-query-params";

export interface Props {
  setProp: SetData;
  favourite?: boolean;
}

export default function Set({ setProp, favourite }: Props) {
  const dispatch = useDispatch();
  const checked = useSelector(selectChecked);
  const currentSetChecked = setProp && checked && checked[setProp.code];
  const [, setSet] = useQueryParam("set", StringParam);

  return (
    <React.Fragment key={setProp.code}>
      <div
        className="set d-flex justify-content-between align-items-center"
        onClick={() => {
          setSet(setProp.name);
          dispatch(setSelectedSet(setProp.name));
          dispatch(setSidebar(false));
          dispatch(setSidebarSearchterm(""));
          dispatch(setSearchterm(""));
        }}
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ), url(${setProp.logoUrl})`,
        }}
      >
        <div className="d-flex flex-column">
          <strong>
            {setProp.name}{" "}
            {currentSetChecked?.length / setProp?.totalCards >= 1 && (
              <span aria-label="checkmark" role="img">
                🎉
              </span>
            )}
          </strong>
          <small className="release-date">
            {moment(setProp.releaseDate).format("LL")}
          </small>
        </div>
        {favourite && (
          <StyledFavouritesButton
            onClick={(event) => {
              event.stopPropagation();
              dispatch(removeFavourite(setProp.code));
            }}
          >
            <FaTimes />
          </StyledFavouritesButton>
        )}
      </div>
      <Progress
        value={
          currentSetChecked &&
          setProp &&
          (currentSetChecked.length / setProp.totalCards) * 100
        }
      >
        {currentSetChecked?.length}/{setProp?.totalCards}
      </Progress>
    </React.Fragment>
  );
}
