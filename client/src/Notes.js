import React, { useState, useEffect } from "react";
import axios from "axios";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("/api/notes");
      Array.isArray(response.data) && response.data.length > 0
        ? setNotes(response.data)
        : setNotes([{ note: "no notes yet. this is a test note" }]);
    } catch (error) {
      console.log(error);
      setNotes([]);
    }
  };
  useEffect(() => {
    async function getNotesFromApi() {
      await fetchNotes();
    }
    getNotesFromApi();
  }, [isSubmitting]);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("/api/notes", {
        note: newNote
      });
    } catch (error) {
      console.log(error);
    } finally {
      setNewNote("");
      setTimeout(() => {
        setIsSubmitting(false);
      }, 100);
    }
  };

  const renderAllNotes = () => {
    return (
      <div>
        {!!notes &&
          notes.map(n => {
            console.log(n);
            return <div key={n.note}>{n.note}</div>;
          })}
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Add a new note:</label>
        <input value={newNote} onChange={e => setNewNote(e.target.value)} />
        <button>Submit</button>
      </form>

      <h3>All notes: </h3>
      {renderAllNotes()}
    </div>
  );
};

export default Notes;
