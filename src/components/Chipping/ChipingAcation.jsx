import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useEffect } from "react";

export default function ChipsAction({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
    // console.log(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({}); // unmounting
    };
    // eslint-disable-next-line
  }, []);


  const chipAddElement = genres.map((genre) => (
    <Chip
      // className="chip-btn"
      style={{ margin: 2 }}
      label={genre.name}
      key={genre.id}
      // color="primary"
      clickable
      size="small"
      onClick={() => handleAdd(genre)}
    />
  ));

  const chipRemoveElement = selectedGenres.map((genre) => (
    <Chip
      style={{ margin: 2 }}
      label={genre.name}
      key={genre.id}
      color="primary"
      label="primary" 
      clickable
      size="small"
      onDelete={() => handleRemove(genre)}
    />
  ));

  return (
    <div style={{ padding: "6px 0" , backgroundColor: "rgb(216, 216, 226)"}}>
      <Stack direction="row" spacing={1}>
        {chipRemoveElement}
        {chipAddElement}
        {
          // selectedGenres &&
          // selectedGenres.map((genre) => (
          //   <Chip
          //     style={{ margin: 2 }}
          //     label={genre.name}
          //     key={genre.id}
          //     color="primary"
          //     clickable
          //     size="small"
          //     // onDelete={() => handleRemove(genre)}
          //   />
          // ))
        }
        {
          // genres &&
          // genres.map((genre) => (
          //   <Chip
          //     style={{ margin: 2 }}
          //     label={genre.name}
          //     key={genre.id}
          //     // color="primary"
          //     clickable
          //     size="small"
          //     onClick={() => handleAdd(genre)}
          //   />
          // ))
        }
      </Stack>
    </div>
  );
}
