import Section from './Section';
import TaskForm from './TaskForm';
import { dbUrl } from '../../config';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
  const requestConfig = {
    url: `${dbUrl}tasks.json`,
    method: 'POST',
    body: true,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { sendRequest: enterTaskHandler, isLoading, error } = useHttp(requestConfig, () => props.onAddTask());

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
