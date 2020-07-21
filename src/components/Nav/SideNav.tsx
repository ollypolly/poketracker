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
import { Spinner, Input, Progress } from "reactstrap";
import styled from "styled-components";
import { selectChecked } from "../../app/checkboxSlice";

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
  display: inline-block;

  .set {
    cursor: pointer;
    padding: 1rem;
    height: 100px;
    background-size: 180px;
    background-repeat: no-repeat;
    background-position: center;
    transition: all 0.4s ease 0s;

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
  const checked = useSelector(selectChecked);

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

          {filteredSets?.map((set) => {
            const currentSetChecked = set && checked[set.code];
            return (
              <React.Fragment key={set.code}>
                <div
                  className="set"
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
                  style={{ backgroundImage: `url(${set.logoUrl})` }}
                ></div>
                <Progress
                  value={
                    currentSetChecked &&
                    set &&
                    (currentSetChecked.length / set.totalCards) * 100
                  }
                >
                  {currentSetChecked?.length}/{set?.totalCards}
                </Progress>
              </React.Fragment>
            );
          })}
        </>
      )}
    </StyledNavContainer>
  );
}
