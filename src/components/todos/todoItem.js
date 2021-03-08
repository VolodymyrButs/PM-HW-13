import styled from "styled-components";
const TodoItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #000;
  margin: 5px 0;
  padding: 3px 10px;
  width: 1000px;
  p {
    width: 100%;
    text-align: left;
    margin: 0;
    padding: 0px 10px;
  }
  input[checked] ~ p {
    text-decoration: line-through;
  }
  input {
    display: none;
  }
`;

export const TodoItem = ({ todo, index, onDone, search }) => {
  let text =
    search === "" ? todo.title : todo.title.replace(search, `<b>${search}</b>`);
  return (
    <TodoItemWrapper>
      <span>{index + 1}</span>
      <input type="checkbox" defaultChecked={todo.completed} />

      <p dangerouslySetInnerHTML={{ __html: text }} />
      {todo.completed ? "" : <button onClick={() => onDone(todo)}>X</button>}
    </TodoItemWrapper>
  );
};
// onClick={() => completeHandler({ todos: {...todos, todos[data.id].completed:true} })}
