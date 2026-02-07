export interface Task {
  id: string;
  title: string;
}

export interface Column {
  id: string;
  name: string;
}

export const useCreateTask = () => {
  return {
    mutateAsync: async (data: {
      columnId: string;
      projectId: string;
      title: string;
    }) => {
      console.log('Creating task:', data);
      return Promise.resolve();
    },
  };
};
