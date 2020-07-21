import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSets, fetchCardsBySet } from "../../pages/cardListThunks";
import { selectSets, selectSetsLoading } from "../../pages/cardListSlice";
import { Spinner, Progress, Button } from "reactstrap";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";

const StyledNavContainer = styled.div`
  position: fixed;
  padding: 1rem;
  left: 0;
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  z-index: 1;
  background-color: lightgray;
  overflow: auto;

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
`;

export function Nav() {
  const dispatch = useDispatch();
  const sets = useSelector(selectSets);
  const setsLoading = useSelector(selectSetsLoading);

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(fetchSets());
  }, [dispatch]);
  return (
    <StyledNavContainer>
      <Button>
        <FaBars />
      </Button>

      {setsLoading ? (
        <Spinner type="grow" color="primary" />
      ) : (
        sets
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
                onClick={() =>
                  dispatch(
                    fetchCardsBySet({ set: set.name, pageSize: set.totalCards })
                  )
                }
              />
              <Progress value={25}>25/100</Progress>
            </div>
          ))
      )}
    </StyledNavContainer>
  );
}
