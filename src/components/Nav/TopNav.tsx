import React from "react";
import { FaBars, FaSun } from "react-icons/fa";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSidebar,
  setSidebar,
  selectCurrentSet,
  selectCardsLoading,
} from "../../pages/CardList/cardListSlice";
import {
  selectChecked,
  selectDarkMode,
  setDarkMode,
} from "../../app/checkboxSlice";

const StyledTopNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.body};
  border-bottom: 2px solid #37a9f8;
  padding: 0.5rem;
  position: sticky;
  top: 0;
  z-index: 999;

  p {
    margin: 0 0.2rem;
    font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-weight: 800;
  }

  .menu-button {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.hover};
    }
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
`;

export function TopNav() {
  const dispatch = useDispatch();
  const sidebar = useSelector(selectSidebar);
  const currentSet = useSelector(selectCurrentSet);
  const checked = useSelector(selectChecked);
  const cardsLoading = useSelector(selectCardsLoading);
  const darkMode = useSelector(selectDarkMode);

  const currentSetChecked = currentSet && checked[currentSet.code];

  return (
    <StyledTopNav>
      <Box>
        <div
          className="menu-button"
          onClick={() => dispatch(setSidebar(!sidebar))}
        >
          <FaBars />
        </div>
        <div
          className="menu-button"
          onClick={() => dispatch(setDarkMode(!darkMode))}
        >
          <FaSun />
        </div>
        <p>PokéTrack</p>
      </Box>

      {!cardsLoading && (
        <Box>
          <p>{currentSet?.name}</p>
          <p className="font-weight-light">
            {currentSetChecked
              ? currentSet &&
                Math.round(
                  (currentSetChecked.length / currentSet.totalCards) * 100
                )
              : 0}
            %
          </p>
        </Box>
      )}
    </StyledTopNav>
  );
}
