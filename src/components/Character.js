import React, { useState, useEffect } from "react";
import { useHttp } from "./hooks/http";

import Summary from "./Summary";

const Character = props => {
  const [loading, data] = useHttp(
    "https://swapi.co/api/people/" + props.selectedChar,
    [props.selectedChar]
  );
  const loadedCharacter = data
    ? {
        id: props.selectedChar,
        name: data.name,
        height: data.height,
        colors: {
          hair: data.hair_color,
          skin: data.skin_color
        },
        gender: data.gender,
        movieCount: data.films.length
      }
    : [];

  useEffect(() => {
    return () => {
      console.log("Cleaning up..........");
    };
  }, [props.selectedChar]);

  useEffect(
    () => () => {
      console.log("Component unmount");
    },
    []
  );

  let content = <p>Loading Character...</p>;

  if (!loading && loadedCharacter.id) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!loading && !loadedCharacter.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

export default React.memo(Character);
