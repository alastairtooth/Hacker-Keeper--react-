import React, { useState } from "react";
import notes from "../notes";

function CreateArea(props) {
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
    event.preventDefault();
  }


  return (
    <div>
      <form>
        <input onChange={handleChange} name="title" placeholder="Title" value={note.title}/>
        <textarea onChange={handleChange} name="content" placeholder="Take a note..." rows="3" value={note.content}/>
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
