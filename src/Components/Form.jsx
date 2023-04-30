import React, { useEffect, useState } from "react";
import "./Form.css";
import TodoNote from "./TodoNote";

const Form = () => {
  const [inpVal, setInpVal] = useState("");
  const [todo, setTodo] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("LocalTodo")) {
      setTodo(JSON.parse(localStorage.getItem("LocalTodo")));
    } else {
      setTodo([]);
    }
  }, []);

  const onSubmit = () => {
    if (inpVal == "") {
      alert("Please fill the notes...");
    } else if (inpVal && !toggleBtn) {
      const updateNotes = todo.map((elem) => {
        if (elem.id === selectedId) {
          return { ...elem, name: inpVal };
        }
        return elem;
      });
      setTodo(updateNotes);
      localStorage.setItem('LocalTodo',JSON.stringify(updateNotes))

      setToggleBtn(true);
      setInpVal("");
      setSelectedId(null);
    } else {
      setTodo([...todo, { id: new Date().getTime().toString(), name: inpVal }]);
      localStorage.setItem(
        "LocalTodo",
        JSON.stringify([
          ...todo,
          { id: new Date().getTime().toString(), name: inpVal },
        ])
      );
      setInpVal("");
    }
  };

  const onEditt = (id) => {
    const userEditItem = todo.find((elem) => {
      return elem.id === id;
    });
    console.log(userEditItem);
    setToggleBtn(false);
    setInpVal(userEditItem.name);
    setSelectedId(id);
  };

  const onDelete = (id) => {
    const RemainingList = todo.filter((elem) => {
      return elem.id !== id;
    });
    setTodo(RemainingList);
    localStorage.setItem("LocalTodo", JSON.stringify(RemainingList));
  };

  return (
    <>
      <div className="form">
        <input
          id="inputVal"
          type="text"
          value={inpVal}
          onChange={(e) => setInpVal(e.target.value)}
          placeholder="Write a note"
        />
        {toggleBtn ? (
          <button className="btn" onClick={onSubmit}>
            <i class="fa-solid fa-plus"></i>
          </button>
        ) : (
          <button className="btn" onClick={onSubmit}>
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        )}
      </div>
      <TodoNote todosList={todo} onEdit={onEditt} onDel={onDelete} />
    </>
  );
};

export default Form;
