import { useHistory, useParams } from "react-router-dom";
import GenreForm from "./GenreForm";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlGenres } from "../endpoints";
import { genresCreationDTO } from "./genres.model";
import Loading from "../utils/Loading";
import DisplayErrors from "../utils/DisplayErrors";

export default function EditGenre() {
  const { id }: any = useParams();
  const [genre, setGenre] = useState<genresCreationDTO>();
  const [error, setErrors] = useState<string[]>([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${urlGenres}/${id}`)
      .then((response: AxiosResponse<genresCreationDTO>) => {
        setGenre(response.data);
      });
  }, [id]);

  async function edit(genreToEdit: genresCreationDTO) {
    try {
      await axios.put(`${urlGenres}/${id}`, genreToEdit);
      history.push("/genres");
    } catch (error) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }

  return (
    <>
      <h3>Edit Genre</h3>
      <DisplayErrors errors={error} />
      {genre ? (
        <GenreForm
          model={genre}
          onSubmit={async (value) => {
            //when the form is posted
            await edit(value);
          }}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
