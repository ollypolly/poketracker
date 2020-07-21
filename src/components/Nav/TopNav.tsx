import React from "react";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";
import { Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSidebar,
  setSidebar,
  setSearchterm,
  selectSearchterm,
} from "../../pages/cardListSlice";

const StyledTopNav = styled.div`
  display: flex;
  background-color: gray;
  padding: 0.5rem;
  position: sticky;
  top: 0;
  z-index: 2;

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
  const searchterm = useSelector(selectSearchterm);
  return (
    <StyledTopNav>
      <div
        className="menu-button"
        onClick={() => dispatch(setSidebar(!sidebar))}
      >
        <FaBars />
      </div>

      <Input
        type="text"
        placeholder="Search card list..."
        value={searchterm ?? ""}
        onChange={(event) => dispatch(setSearchterm(event.target.value))}
      />
    </StyledTopNav>
  );
}
