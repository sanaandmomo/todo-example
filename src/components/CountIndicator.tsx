import { client } from "apis";
import { TodoType } from "App";
import { useArnold } from "hooks/useArnold";
import React from "react";

const CountIndicator = ({ completedCount }: { completedCount: number }) => {
  const { isLoading, data: todos, error } = useArnold<TodoType[]>('todo', () => client.get<TodoType[]>("/todos"));

  return <div>Total completed todo : {completedCount}</div>;
};

export default CountIndicator;
