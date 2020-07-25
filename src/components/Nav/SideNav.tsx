import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSets } from "../../pages/CardList/cardListThunks";
import {
  selectSets,
  selectSetsLoading,
  selectSidebar,
  selectSidebarSearchterm,
  setSidebarSearchterm,
} from "../../pages/CardList/cardListSlice";
import { Spinner, Input, Button } from "reactstrap";
import styled from "styled-components";
import { selectFavourites } from "../../app/checkboxSlice";
import { FaStar, FaDownload, FaUpload } from "react-icons/fa";
import { SetData } from "../../model/card.model";
import Series from "./Series";
import Set from "./Set";

export interface Props {
  navOpen: boolean;
}

const StyledNavContainer = styled.div<Props>`
  position: fixed;
  left: ${(props) => (props.navOpen ? 0 : "-300px")};
  width: 300px;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  z-index: 1;
  background-color: ${({ theme }) => theme.body};
  overflow: auto;
  transition: left 0.3s ease-in-out;
  display: inline-block;
  border-right: 2px solid #37a9f8;

  hr {
    background-color: ${({ theme }) => theme.text};
  }

  .set {
    cursor: pointer;
    padding: 1rem;
    height: 60px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    color: white;

    h3 {
      margin-bottom: 0;
    }

    &:hover {
      filter: brightness(0.8);
    }
  }

  .series {
    cursor: pointer;
    padding: 1rem;
    height: 60px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    h3 {
      margin-bottom: 0;
    }

    &:hover {
      background-color: ${({ theme }) => theme.hover};
    }
  }

  .search {
    position: sticky;
    top: 0;
    padding: 0.5rem;
  }
`;

export function SideNav() {
  const dispatch = useDispatch();
  const sets = useSelector(selectSets);
  const setsLoading = useSelector(selectSetsLoading);
  const sidebar = useSelector(selectSidebar);
  const sidebarSearchterm = useSelector(selectSidebarSearchterm);
  const favourites = useSelector(selectFavourites);

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

  const series: { [id: string]: SetData[] } = {};

  // Group sets by series
  filteredSets?.forEach((set) =>
    series[set.series]
      ? series[set.series].push(set)
      : (series[set.series] = [set])
  );

  useEffect(() => {
    dispatch(fetchSets());
  }, [dispatch]);
  return (
    <StyledNavContainer navOpen={sidebar}>
      {setsLoading ? (
        <div className="d-flex justify-content-center p-3">
          <Spinner type="grow" color="primary" />
        </div>
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
          <div className="pt-0 pb-3">
            <h4 className="px-3 d-flex align-items-center">
              <FaStar className="mr-2" /> Favourites
            </h4>
            {favourites.length === 0 ? (
              <div className="px-3">
                <small>
                  Add a set to your favourites by clicking the <FaStar /> Icon
                  next to the set name
                </small>
              </div>
            ) : (
              filteredSets
                ?.filter((set) => favourites.includes(set.code))
                .map((set) => {
                  return <Set favourite={true} key={set.code} set={set} />;
                })
            )}
          </div>
          <div className="px-3">
            <h4>All Sets</h4>
          </div>
          {Object.keys(series).map((key) => {
            return <Series key={key} series={key} sets={series[key]} />;
          })}
          <div className="px-3">
            <Button
              disabled
              color="primary"
              outline
              size="sm"
              className="my-2 w-100"
            >
              <FaDownload /> Backup my collection
            </Button>
            <Button
              disabled
              color="primary"
              outline
              size="sm"
              className="mb-3 w-100"
            >
              <FaUpload /> Restore collection
            </Button>
          </div>
        </>
      )}
    </StyledNavContainer>
  );
}
