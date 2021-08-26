import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useContext, useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';
import { dbUrl } from './config';
import Tasks from './components/Tasks/Tasks';

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const transformedData = (tasksObj) => {
    const loadedTasks = [];

    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }

    setTasks(loadedTasks);
  };

  const { sendRequest, isLoading, error } = useHttp({ url: `${dbUrl}tasks.json` }, transformedData);

  useEffect(() => {
    sendRequest();
  }, []);

  const taskAddHandler = (task) => {
    // setTasks((prevTasks) => prevTasks.concat(task));
    sendRequest();
  };
  return (
    <Layout>
      <ToastContainer />
      <Switch>
        {isLoggedIn && (
          <Route path='/' exact>
            <HomePage />
          </Route>
        )}
        {!isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        {isLoggedIn && (
          <Route path='/profile'>
            <UserProfile />
          </Route>
        )}
        {isLoggedIn && (
          <Route path='/tasks'>
            <>
              <NewTask onAddTask={taskAddHandler} />
              <Tasks items={tasks} loading={isLoading} error={error} onFetch={sendRequest} />
            </>
          </Route>
        )}
        <Route path='*'>
          <Redirect to='/auth' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
