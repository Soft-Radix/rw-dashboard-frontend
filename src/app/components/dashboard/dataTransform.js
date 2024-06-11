const transformData = (data) => {
  const tasks = {};
  const columns = {};
  const columnOrder = [];

  data?.forEach((column) => {
    const taskIds = column?.tasks?.map((task) => {
      tasks[task?.id.toString()] = { ...task };
      return task.id.toString();
    });

    columns[column.id] = {
      id: column?.id.toString(),
      title: column.name,
      taskIds,
    };

    columnOrder.push(column?.id.toString());
  });

  return {
    tasks,
    columns,
    columnOrder,
  };
};

export default transformData;
