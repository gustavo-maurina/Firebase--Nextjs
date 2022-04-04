import { addDoc, collection, deleteDoc, doc } from "firebase/firestore/lite";
import { useState } from "react";
import { Task } from "../models/Task";
import { _database } from "../utils/_firebase";
import { TaskList } from "./TaskList";

export const TarefasHome = ({ tasks }: { tasks: any[] }) => {
  const [taskDescription, setTaskDescription] = useState("");
  const [taskList, setTaskList] = useState(tasks);

  const addTask = async (): Promise<void> => {
    const task: Task = {
      description: taskDescription,
      created_at: new Date(),
    };

    try {
      const { id } = await addDoc(collection(_database, "tasks"), task);
      setTaskList((curList) => [...curList, { id, ...task }]);
    } catch (err) {
      console.log(err);
    }
  };

  const removeTask = async (id: string): Promise<void> => {
    try {
      await deleteDoc(doc(_database, "tasks", id));
      const arr = taskList;
      arr.splice(
        taskList.find((task) => task.id === id),
        1
      );
      setTaskList([...arr]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-indigo-100 h-screen w-screen grid place-items-center">
      <div className="flex flex-col gap-8 items-center">
        <p className="text-5xl font-bold">Minhas tarefas</p>
        <div className="flex items-center">
          <input
            onInput={({ currentTarget }) =>
              setTaskDescription(currentTarget.value)
            }
            placeholder="Nova tarefa..."
            className="px-2 w-[250px] h-8 mr-2 drop-shadow"
          />
          <button
            onClick={addTask}
            className="text-3xl bg-blue-600 h-8 w-8 flex items-center justify-center pb-1 text-white rounded"
          >
            +
          </button>
        </div>
        <TaskList tasks={taskList} removeTask={removeTask} />
      </div>
    </div>
  );
};
