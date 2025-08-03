export default function MonthlyStats({tasks}: { tasks: any[] }) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "completed").length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    return(
        <div className="border p-4 rounded-xl shadow bg-white">
            <h2 className="text-xl font-semibold">📊 Monthly Summary</h2>
            <p>Total Tasks: {total}</p>
            <p>Completed: {completed}</p>
            <p>Completion: {percent}%</p>
        </div>
    )
}