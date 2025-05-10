import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskItem from './components/TaskItem';
import './styles.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);
      const currentDate = now.toISOString().split('T')[0];
      tasks.forEach(task => {
        if (
          task.startTime === currentTime &&
          task.date === currentDate &&
          !task.done
        ) {
          alert(`🔔 Task "${task.title}" is starting now!`);
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [tasks]);

  const addTask = () => {
    if (!title || !date || !start || !end) {
      return alert("Please make sure all information is correct!");
    }
    setTasks([...tasks, {
      id: uuidv4(),
      title,
      date,
      startTime: start,
      endTime: end,
      done: false
    }]);
    setTitle('');
    setDate('');
    setStart('');
    setEnd('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleDone = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const renameTask = (id, newTitle) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, title: newTitle } : task
    ));
  };

  return (
    <>
      <nav>
        <div className="logo">Schedule Management System</div>
      </nav>
      <div className="app-container">
        <div className="left-panel">
          <div className="task-form">
            <div className="task-line">
              <input
                placeholder="Create Task"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="task-line">
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
              <input
                type="time"
                value={start}
                onChange={e => setStart(e.target.value)}
              />
              <input
                type="time"
                value={end}
                onChange={e => setEnd(e.target.value)}
              />
            </div>
            <button onClick={addTask}>Add Task</button>
            <div className="credits">
              Project by <strong>Kushagra Singh</strong>, <strong>Mohnish Sadiza</strong> and <strong>Mannu Ojha</strong>
            </div>
          </div>
          <div className="task-list">
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onToggleDone={toggleDone}
                onRename={renameTask}
              />
            ))}
          </div>
        </div>

        <div className="right-panel">
          <div className="calendar">
            <h3>May 2025</h3>
            <div className="calendar-grid">
              {Array.from({ length: 30 }, (_, i) => {
                const day = i + 1;
                const dateString = new Date();
                dateString.setDate(day);
                const formatted = dateString.toISOString().split('T')[0];

                const tasksForDate = tasks.filter(t => t.date === formatted);
                const hasTasks = tasksForDate.length > 0;
                const allDone = hasTasks && tasksForDate.every(t => t.done);
                const somePending = hasTasks && tasksForDate.some(t => !t.done);

                let dayClass = 'calendar-day';
                if (allDone) dayClass += ' completed';
                else if (somePending) dayClass += ' pending';

                return (
                  <div key={i} className={dayClass}>
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
