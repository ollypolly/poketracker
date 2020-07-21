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
  selectSidebarSearchterm,
  setSidebarSearchterm,
  setSearchterm,
} from "../../pages/CardList/cardListSlice";
import { Spinner, Input } from "reactstrap";
import styled from "styled-components";

export interface Props {
  navOpen: boolean;
}

const StyledNavContainer = styled.div<Props>`
  position: fixed;
  left: ${(props) => (props.navOpen ? 0 : "-300px")};
  width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  z-index: 1;
  background-color: #eeeeee;
  overflow: auto;
  transition: left 0.3s ease-in-out;

  .set {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 1rem;
    height: 100px;

    img {
      max-width: 100%;
      max-height: 100%;
      display: block;
    }

    &:hover {
      background-color: lightgray;
    }
  }

  .search {
    background-color: #eeeeee;
    position: sticky;
    top: 0;
    padding: 0.5rem;

    input {
    }
  }
`;

export function SideNav() {
  const dispatch = useDispatch();
  const sets = useSelector(selectSets);
  const setsLoading = useSelector(selectSetsLoading);
  const sidebar = useSelector(selectSidebar);
  const sidebarSearchterm = useSelector(selectSidebarSearchterm);

  const filteredSets = sets
    ?.slice()
    .filter((set) =>
      set.name.toLowerCase().includes(sidebarSearchterm?.toLowerCase() ?? "")
    )
    .sort(
      (a, b) =>
        Math.abs(new Date(b.releaseDate).getTime()) -
        Math.abs(new Date(a.releaseDate).getTime())
    );

  useEffect(() => {
    dispatch(fetchSets());
  }, [dispatch]);
  return (
    <StyledNavContainer navOpen={sidebar}>
      {setsLoading ? (
        <Spinner type="grow" color="primary" />
      ) : (
        <>
          <div className="search">
            <Input
              type="text"
              placeholder="Search for set..."
              value={sidebarSearchterm ?? ""}
              onChange={(event) =>
                dispatch(setSidebarSearchterm(event.target.value))
              }
            />
          </div>

          {filteredSets?.map((set) => (
            <div
              className="set"
              key={set.code}
              onClick={() => {
                dispatch(
                  fetchCardsBySet({
                    set: set.name,
                    pageSize: set.totalCards,
                  })
                );
                dispatch(setSidebar(false));
                dispatch(setSidebarSearchterm(""));
                dispatch(setSearchterm(""));
              }}
            >
              <img src={set.logoUrl} alt={set.name} />
              {/* <Progress value={50}>50/{set.totalCards}</Progress> */}
            </div>
          ))}
        </>
      )}
    </StyledNavContainer>
  );
}
