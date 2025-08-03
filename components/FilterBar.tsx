export default function FilterBar({ showPendingOnly, setShowPendingOnly }: {
  showPendingOnly: boolean
  setShowPendingOnly: (v: boolean) => void
}) {
  return (
    <div className="flex items-center gap-4">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={showPendingOnly}
          onChange={() => setShowPendingOnly(!showPendingOnly)}
        />
        Show Pending Only
      </label>
    </div>
  )
}
