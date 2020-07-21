import React from "react";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";
import { Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectSidebar, setSidebar } from "../../pages/cardListSlice";

const StyledTopNav = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
`;

export function TopNav() {
  const dispatch = useDispatch();
  const sidebar = useSelector(selectSidebar);
  return (
    <StyledTopNav>
      <FaBars onClick={() => dispatch(setSidebar(!sidebar))} />
      <Input type="text" placeholder="Search card list..." />
    </StyledTopNav>
  );
}
