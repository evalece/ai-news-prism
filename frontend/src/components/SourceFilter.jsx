export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange
}) {
  return (
    <div>
      <label htmlFor="category">Category: </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={e => onCategoryChange(e.target.value)}
      >
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}