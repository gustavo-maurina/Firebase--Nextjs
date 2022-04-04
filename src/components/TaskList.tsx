import { memo, ReactNode, useEffect, useState } from "react";
import { Task } from "../models/Task";

const TaskListComponent = ({
  tasks,
  removeTask,
}: {
  tasks: Task[];
  removeTask: (id: string) => Promise<void>;
}) => {
  const [list, setList] = useState<ReactNode>();

  useEffect(() => {
    const listTasks = (): ReactNode => {
      return tasks.map((task: Task, index) => (
        <div
          key={`task${index}`}
          className="bg-white w-[250px] px-2 py-2 rounded drop-shadow text-lg"
        >
          <span className="font-bold">Tarefa</span>: {task.description}
          <button
            onClick={() => removeTask(task.id as string)}
            className="bg-red-500 float-right h-8 w-8 text-white rounded"
          >
            X
          </button>
        </div>
      ));
    };

    setList(listTasks());
  }, [tasks, removeTask]);

  return (
    <div className="flex flex-col gap-3">
      {tasks.length ? (
        list
      ) : (
        <div className="text-gray-600">Nenhuma tarefa...</div>
      )}
    </div>
  );
};

const TaskList = memo(TaskListComponent);
export { TaskList };
