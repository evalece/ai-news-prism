
export default function SourceFilter({
  sources,
  selectedSource,
  onSourceChange
}) {
  return (
    <div className="filter">
      <label htmlFor="source-filter">
        News Source
      </label>

      <select
        id="source-filter"
        value={selectedSource}
        onChange={(e) => onSourceChange(e.target.value)}
      >
        <option value="all">All Sources</option>

        {sources.map(source => (
          <option key={source} value={source}>
            {source}
          </option>
        ))}
      </select>
    </div>
  );
}
