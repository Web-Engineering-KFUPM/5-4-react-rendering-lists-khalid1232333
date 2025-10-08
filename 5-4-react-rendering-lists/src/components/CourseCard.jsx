import { useState } from "react";
import TaskItem from "./TaskItem";

export default function CourseCard({ course, index, onMutateCourse }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  // 📘 TASK 4 — PART A (Anchor): Implement toggle using onMutateCourse + .map()
  function toggleTask(id) {
    onMutateCourse(index, (course) => ({
      ...course,
      tasks: course.tasks.map(task =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      ),
    }));
  }

  // 📘 TASK 4 — PART A (Anchor): Implement delete using onMutateCourse + .filter()
  function deleteTask(id) {
    onMutateCourse(index, (course) => ({
      ...course,
      tasks: course.tasks.filter(task => task.id !== id),
    }));
  }

  // 📘 TASK 4 — PART A (Anchor): Implement add using onMutateCourse
  function addTask(e) {
    e.preventDefault();
    if (!title.trim() || !date) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      dueDate: date,
      isDone: false,
    };

    onMutateCourse(index, (course) => ({
      ...course,
      tasks: [...course.tasks, newTask],
    }));

    setTitle("");
    setDate("");
  }

  return (
    <article className="course card">
      <header className="cardHeader">
        <h2>{course.title}</h2>
        {/* 🟩 PART A (Anchor): Show "All caught up" badge when ALL tasks are done (logical &&) */}
        {course.tasks.length > 0 && course.tasks.every(task => task.isDone) && (
          <span className="badge allCaughtUp">All caught up</span>
        )}
      </header>

      {/* 🟩 PART A (Anchor): If NO tasks → show message; ELSE → render the list (ternary ?: ) */}
      <section className="tasksSection">
        {course.tasks.length === 0 ? (
          <p className="noTasksMsg">No tasks yet. Add your first one below.</p>
        ) : (
          <ul className="tasks">
            {course.tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </ul>
        )}
      </section>

      {/* Add Form (provided) */}
      <form onSubmit={addTask} className="newTask">
        <input
          className="titleField"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          aria-label="Task title"
        />
        <div className="dateRow">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label="Due date"
          />
          <button type="submit" className="primary">Add</button>
        </div>
      </form>
    </article>
  );
}
