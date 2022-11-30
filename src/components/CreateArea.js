import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  createNote: {
    position: "relative",
    width: "480px",
    margin: "30px auto 20px auto",
    background: "#fff",
    padding: "15px",
    borderRadius: "7px",
    boxShadow: "0 1px 5px rgb(138, 137, 137)"
  },
  textarea: {
    width: "100%",
    border: "none",
    outline: "none",
    fontSize: "1.2em",
    fontFamily: "inherit",
    resize: "none"
  },
  button: {
    background: "DarkGreen",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
    outline: "none"
  }
}));

function CreateArea(props) {
  const classes = useStyles();
  const [note, setNote] = useState({
    name: "",
    price: "",
    image: "",
    description: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      name: "",
      price: "",
      image: "",
      description: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form className={classes.createNote}>
        {
          <input
            name="name"
            onChange={handleChange}
            value={note.name}
            placeholder="Product Name"
            className={classes.textarea}
            style={{ marginBottom: "20px" }}
          />
        }
        <div style={{ display: "flex" }}>
          <textarea
            name="price"
            onChange={handleChange}
            value={note.price}
            placeholder="Set Price"
            className={classes.textarea}
          />
          <textarea
            name="image"
            onChange={handleChange}
            value={note.image}
            placeholder="Image URL"
            className={classes.textarea}
          />
        </div>
        <textarea
          name="description"
          onChange={handleChange}
          value={note.description}
          placeholder="Description"
          className={classes.textarea}
        />
        <Fab onClick={submitNote}>
          <AddIcon className={classes.button} />
        </Fab>
      </form>
    </div>
  );
}

export default CreateArea;
