import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSets,
  fetchCardsBySet,
} from "../../pages/CardList/cardListThunks";
import {
  selectSets,
  selectSetsLoading,
  selectSidebar,
  setSidebar,
} from "../../pages/CardList/cardListSlice";
import { Spinner, Progress, Input } from "reactstrap";
import styled from "styled-components";

export interface Props {
  navOpen: boolean;
}

const StyledNavContainer = styled.div<Props>`
  position: fixed;
  padding: 1rem;
  left: ${(props) => (props.navOpen ? 0 : "-300px")};
  width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  z-index: 1;
  background-color: lightgray;
  overflow: auto;
  transition: left 0.3s ease-in-out;

  .set {
    cursor: pointer;
    margin: 0.5rem;

    img {
      width: 120px;
    }

    &:hover > img {
      filter: brightness(0.8);
    }
  }

  input {
    position: sticky;
    top: 0;
  }
`;

export function SideNav() {
  const dispatch = useDispatch();
  const sets = useSelector(selectSets);
  const setsLoading = useSelector(selectSetsLoading);
  const sidebar = useSelector(selectSidebar);

  useEffect(() => {
    dispatch(fetchSets());
  }, [dispatch]);
  return (
    <StyledNavContainer navOpen={sidebar}>
      {setsLoading ? (
        <Spinner type="grow" color="primary" />
      ) : (
        <>
          <Input type="text" placeholder="Search for set..." />
          {sets
            ?.slice()
            .sort(
              (a, b) =>
                Math.abs(new Date(b.releaseDate).getTime()) -
                Math.abs(new Date(a.releaseDate).getTime())
            )
            .map((set) => (
              <div className="set" key={set.code}>
                <img
                  src={set.logoUrl}
                  alt={set.name}
                  onClick={() => {
                    dispatch(
                      fetchCardsBySet({
                        set: set.name,
                        pageSize: set.totalCards,
                      })
                    );
                    dispatch(setSidebar(false));
                  }}
                />
                <Progress value={50}>50/{set.totalCards}</Progress>
              </div>
            ))}
        </>
      )}
    </StyledNavContainer>
  );
}
