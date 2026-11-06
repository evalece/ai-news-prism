
export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange
}) {
  return (
    <div className="filter">
      <label htmlFor="category-filter">
        Category
      </label>

      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="all">All Categories</option>

        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
