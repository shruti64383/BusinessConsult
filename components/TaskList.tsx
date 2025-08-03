export default function TaskList({ tasks }: { tasks: any[] }) {
  if (tasks.length === 0) return <p>No tasks to display.</p>

  return (
    <div className="border p-4 rounded-xl shadow bg-white">
      <h2 className="text-xl font-semibold mb-2">📝 Task List</h2>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task._id} className="border-b pb-2">
            <p><strong>{task.title}</strong></p>
            <p>Status: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
