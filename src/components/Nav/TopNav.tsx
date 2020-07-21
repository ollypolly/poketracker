import React from "react";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectSidebar, setSidebar } from "../../pages/CardList/cardListSlice";

const StyledTopNav = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-bottom: 2px solid gray;
  padding: 0.5rem;
  position: sticky;
  top: 0;
  z-index: 2;

  p {
    margin: 0 0.5rem;
    margin-right: 1rem;
    font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-weight: 800;
  }

  .menu-button {
    padding: 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: lightgray;
    }
  }
`;

export function TopNav() {
  const dispatch = useDispatch();
  const sidebar = useSelector(selectSidebar);
  return (
    <StyledTopNav>
      <div
        className="menu-button"
        onClick={() => dispatch(setSidebar(!sidebar))}
      >
        <FaBars />
      </div>
      <p>PokéTrack</p>
    </StyledTopNav>
  );
}
