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
          className="bg-white h-full w-[250px] flex justify-between rounded drop-shadow text-lg pl-2 overflow-hidden"
        >
          <div className="py-2">
            <p className="font-bold">Tarefa</p>
            {task.description}
          </div>

          <div>
            <button
              onClick={() => removeTask(task.id as string)}
              className="bg-red-500 w-8 text-white  h-full"
            >
              X
            </button>
          </div>
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
