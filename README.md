# 📊 Advanced Interactive Data Table

A feature-rich data table component with sorting, filtering, pagination, and export functionality built with vanilla JavaScript.

![Data Table](https://via.placeholder.com/800x400/3498db/ffffff?text=Data+Table)

## ✨ Features

- **Column Sorting** - Ascending/descending sort on all columns
- **Advanced Filtering** - Search across all data
- **Pagination** - Navigate large datasets
- **Data Export** - Export to CSV format
- **Inline Editing** - Edit records directly
- **Row Selection** - Multi-select functionality
- **Responsive Design** - Mobile-friendly table
- **Custom Styling** - CSS-powered animations

## 🚀 Live Demo

[View Live Demo](https://ge-lang.github.io/data-table)

## 🛠️ Technologies Used

- **HTML5** - Table semantics
- **CSS3** - Advanced selectors, transitions
- **JavaScript** - DOM manipulation, event handling
- **Local Storage** - Data persistence

## 📦 Installation

```bash
git clone https://github.com/ge-lang/data-table.git
cd data-table
# Open index.html to see demo with sample data
```

🔧 Basic Usage

```javascript
// Initialize table with data
const table = new DataTable({
    container: '#tableContainer',
    data: myDataArray,
    columns: ['id', 'name', 'email', 'status'],
    pageSize: 10
});
```

🎯 API Methods

```javascript
table.sort(column, direction);    // Sort data
table.filter(query);              // Filter rows
table.exportCSV();                // Export to CSV
table.addRow(data);               // Add new row
table.updateRow(id, data);        // Update row
```

📊 Supported Features

· Client-side Processing - No server required
· Custom Column Renderers - Format cell content
· Keyboard Navigation - Accessibility support
· Theme Customization - CSS variables
· Performance Optimized - Virtual scrolling for large datasets

🤝 Contributing

We welcome issues and pull requests!

📄 License

MIT License
