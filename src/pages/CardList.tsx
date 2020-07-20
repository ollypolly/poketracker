import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import EventCard from "../components/EventCard";
import { Event } from "../model/event.model";
import moment from "moment";
import { FaSearch, FaTimesCircle } from "react-icons/fa";
import Card from "../features/card/Card";

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

// Would usually come from endpoint e.g. api.testacle.com/events
export const events: Event[] = [
  {
    title: "Event 1",
    subtitle: "Subtitle",
    date: "2021-10-21T09:30:00+00:00",
    id: "event-id-1",
    background: "https://i.imgur.com/MU7818R.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    title: "Event 2",
    subtitle: "Subtitle",
    date: "2020-03-21T09:30:00+00:00",
    id: "event-id-2",
    background: "https://i.imgur.com/5pEhk7G.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    title: "Event 3",
    subtitle: "Subitile",
    date: "2020-10-15T09:30:00+00:00",
    id: "event-id-3",
    background:
      "https://i.pinimg.com/736x/67/df/66/67df669eac7974b02cf5d263f91ec32f.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    title: "Peace",
    subtitle: "✌️",
    date: "2020-10-22T09:30:00+00:00",
    id: "event-id-4",
    background:
      "https://mystickermania.com/cdn/stickers/memes/bored-shrek-meme.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    title: "Peace in the middle east",
    subtitle: "✌️",
    date: "2020-10-31T09:30:00+00:00",
    id: "event-id-5",
    background:
      "https://mystickermania.com/cdn/stickers/memes/bored-shrek-meme.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    title: "Event YOLO",
    subtitle: "Subitile",
    date: "2020-10-17T09:30:00+00:00",
    id: "event-id-6",
    background:
      "https://i.pinimg.com/736x/67/df/66/67df669eac7974b02cf5d263f91ec32f.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];

export default () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = [...events]
    .filter(
      event =>
        moment(event.date) > moment() &&
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => moment(a.date) - moment(b.date));

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
        {filteredEvents.map(event => (
          <Card key={event.id} event={event} />
        ))}
      </EventContainer>
    </>
  );
};
