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
    <div className="bg-indigo-100 h-screen w-screen relative">
      <div className="flex flex-col gap-8 items-center justify-center h-full">
        <p className="text-5xl font-bold drop-shadow pt-[5%]">Minhas tarefas</p>
        <div className="flex items-center rounded overflow-hidden">
          <input
            onInput={({ currentTarget }) =>
              setTaskDescription(currentTarget.value)
            }
            placeholder="Nova tarefa..."
            className="px-2 w-[250px] h-10"
          />
          <button
            onClick={addTask}
            className="text-3xl bg-blue-600 w-10 flex items-center justify-center pb-1 text-white"
          >
            +
          </button>
        </div>
        <TaskList tasks={taskList} removeTask={removeTask} />
      </div>
    </div>
  );
};
