import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSearch, FaTimesCircle, FaAlignLeft } from "react-icons/fa";
import Card from "../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCards,
  selectCardsLoading,
  selectSidebar,
  setSidebar,
} from "./cardListSlice";
import { fetchCardsBySet } from "./cardListThunks";
import { Spinner, Button } from "reactstrap";
import { Nav } from "../components/Nav/Nav";

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const StyledFilterContainer = styled.div`
  display: flex;
  align-items: top;

  .clear {
    cursor: pointer;
  }

  svg {
    margin: 0.5rem;
    margin-top: 10px;
    font-size: 1.5em;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  font-size: 1.2em;
  border-bottom: 2px solid lightgray;
  padding-bottom: 0.2em;
  margin-bottom: 0.3em;
  outline: none;
  font-weight: 600;
`;

export default () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const cardsLoading = useSelector(selectCardsLoading);
  const sidebar = useSelector(selectSidebar);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCardsBySet({ set: "Rebel Clash", pageSize: 192 }));
  }, [dispatch]);

  const filteredEvents =
    cards &&
    [...cards].filter((card) =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <Nav />
      <Button color="info" onClick={() => dispatch(setSidebar(!sidebar))}>
        <FaAlignLeft />
      </Button>
      {cardsLoading ? (
        <Spinner type="grow" color="primary" />
      ) : (
        <>
          <StyledFilterContainer>
            <FaSearch />
            <StyledInput
              placeholder="Search..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            {searchTerm && (
              <FaTimesCircle
                className="clear"
                onClick={() => setSearchTerm("")}
              />
            )}
          </StyledFilterContainer>
          <CardContainer>
            {filteredEvents?.map((event) => (
              <Card key={event.id} cardData={event} />
            ))}
          </CardContainer>
        </>
      )}
    </>
  );
};
