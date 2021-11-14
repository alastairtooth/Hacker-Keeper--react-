import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {

  const [isExpanded, setisExpanded] = useState(false)

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    // To be able to pass a note from this component back to the app component the app.jsx page passes a function called onAdd into the CreateArea
    // component, which we can then access (as per the below), which we then pass the note into so it can be processed as though it were a variable
    // on the app page itself.
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  function expand() {
    setisExpanded(true)
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded &&
          <input
            onChange={handleChange}
            name="title"
            placeholder="Title"
            value={note.title}
          />
        }
        <textarea
          onClick={expand}
          onChange={handleChange}
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
          value={note.content}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
