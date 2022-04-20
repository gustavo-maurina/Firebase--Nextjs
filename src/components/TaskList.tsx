import { memo, ReactNode, useEffect, useState } from "react";
import { Task } from "../models/Task";
import { TaskCard } from "./TaskCard";
import { TaskDetailed } from "./TaskDetailed";

const TaskListComponent = ({
  tasks,
  removeTask,
}: {
  tasks: Task[];
  removeTask: (id: string) => Promise<void>;
}) => {
  const [list, setList] = useState<ReactNode>();
  const [detailingTask, setDetailingTask] = useState({
    detailing: false,
    task: {} as Task,
  });

  useEffect(() => {
    const listTasks = (): ReactNode => {
      return tasks.map((task: Task, index) => (
        <div
          key={index}
          onClick={() => setDetailingTask({ detailing: true, task: task })}
        >
          <TaskCard removeTask={removeTask} task={task} />
        </div>
      ));
    };

    setList(listTasks());
  }, [tasks, removeTask]);

  return (
    <>
      {detailingTask.detailing && (
        <TaskDetailed
          task={detailingTask.task}
          close={() =>
            setDetailingTask((curr) => ({ ...curr, detailing: false }))
          }
        />
      )}
      <div className="flex flex-col gap-3">
        {tasks.length ? (
          list
        ) : (
          <div className="text-gray-600">Nenhuma tarefa...</div>
        )}
      </div>
    </>
  );
};

const TaskList = memo(TaskListComponent);
export { TaskList };
