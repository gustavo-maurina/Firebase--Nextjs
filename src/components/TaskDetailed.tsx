import { Task } from "../models/Task";

export const TaskDetailed = ({
  task,
  close,
}: {
  task: Task;
  close: () => void;
}) => {
  function getDisplayDate() {
    const timestamp = (task.created_at as string)
      .replace("Timestamp(seconds=", "")
      .split(",")[0];
    console.log(timestamp);

    const date = new Date(parseInt(timestamp) * 1000);
    const dia = date.getDate() + 1;
    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  return (
    <div
      className="w-full h-full bg-[rgba(0,0,0,0.8)] absolute z-10"
      onClick={close}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-2xl mb-5">Detalhe da tarefa</p>
        <p>
          <strong>Descrição</strong>: {task.description}
        </p>
        <p>
          <strong>Data</strong>: {getDisplayDate()}
        </p>
      </div>
    </div>
  );
};
