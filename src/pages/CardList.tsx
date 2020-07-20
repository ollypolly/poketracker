import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { FaSearch, FaTimesCircle } from "react-icons/fa";
import Card from "../components/Card/Card";
import { CardData } from '../model/card.model';
import { cardClient } from "../network/cardClient";
import { useDispatch, useSelector } from "react-redux";
import { selectCards } from "../components/Card/cardSlice";
import { fetchCardsBySet } from "../components/cardThunks";

const EventContainer = styled.div`
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
  font-size: 2em;
  border-bottom: 3px solid lightgray;
  padding-bottom: 0.2em;
  margin-bottom: 0.3em;
  outline: none;
  font-weight: 600;
`;

export default () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => { dispatch(fetchCardsBySet('swsh2')) }, [dispatch])

  const filteredEvents = cards && [...cards]
  // .filter(
  //   event =>
  //     moment(event.date) > moment() &&
  //     event.title.toLowerCase().includes(searchTerm.toLowerCase())
  // )
  //.sort((a, b) => Math.abs(new Date(a.date).getTime()) - Math.abs(new Date(b.date).getTime()));

  return (
    <>
      <StyledFilterContainer>
        <FaSearch />
        <StyledInput
          placeholder="Search..."
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
        {searchTerm && (
          <FaTimesCircle className="clear" onClick={() => setSearchTerm("")} />
        )}
      </StyledFilterContainer>
      <EventContainer>
        {filteredEvents?.map(event => (
          <Card key={event.id} cardData={event} />
        ))}
      </EventContainer>
    </>
  );
};
