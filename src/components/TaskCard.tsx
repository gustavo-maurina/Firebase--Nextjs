import { Task } from "../models/Task";

type TaskCardProps = {
  removeTask(taskId: string): Promise<void>;
  task: Task;
};

export const TaskCard = ({ task, removeTask }: TaskCardProps) => {
  return (
    <div className="bg-white h-full w-[250px] flex justify-between rounded drop-shadow text-lg pl-2 overflow-hidden cursor-pointer">
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
  );
};
