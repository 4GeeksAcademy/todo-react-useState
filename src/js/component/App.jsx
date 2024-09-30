import React, { useState } from "react";

// CSS styles
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Gupter:wght@400;500;700&family=Lora:ital,wght@0,400..700;1,400..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200&display=swap');

body {
  font-family: "Poppins", sans-serif;
}
.poppins-thin {
  font-weight: 100;
  font-style: normal;
}
.poppins-extralight {
  font-weight: 200;
  font-style: normal;
}
.input {
  border: none;
  outline: none;
}
.input:focus {
  border: none;
  box-shadow: none;
}
.input:active {
  border: none;
}
.button {
  background: none; 
  border: none;   
  padding: 0;   
  margin: 0;
  font: inherit;  
  cursor: pointer; 
  outline: none;
  color:red;
  font-size:"110px";
}
`;


const Form = ({ addTask }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="input poppins-extralight fs-4 w-100 mb-3"
        type="text"
        placeholder="What needs to be done?"
        onChange={(e) => setTask(e.target.value)}
        value={task}
      />
    </form>
  );
};


const Task = ({ task, deleteTask }) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <p className="poppins-extralight fs-4">{task.task}</p>
      <button className="button" onClick={() => deleteTask(task.id)}>
        X
      </button>
    </div>
  );
};

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    if (task.trim() === "") {
      alert("You need to add something");
      return;
    }
    const newTask = {
      id: Date.now(),
      task,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="mx-auto" style={{ width: "45vw" }}>
        <h2
          className="text-center poppins-thin"
          style={{ color: "red", fontSize: "110px" }}
        >
          todos
        </h2>
        <div className="border border-top-0 px-5">
          <Form addTask={addTask} />
          {tasks.map((task) => (
            <Task key={task.id} task={task} deleteTask={deleteTask} />
          ))}
          <div className="poppins-thin">{tasks.length} item left</div>
        </div>
      </div>
    </>
  );
}

export default App;
