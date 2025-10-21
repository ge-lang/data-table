   
        class AdvancedTable {
            constructor() {
                this.data = [];
                this.filteredData = [];
                this.currentSort = { column: 'id', direction: 'asc' };
                this.currentPage = 1;
                this.rowsPerPage = 8;
                this.init();
            }

            init() {
                this.generateSampleData();
                this.renderTable();
                this.setupEventListeners();
            }

            generateSampleData() {
                const departments = ['engineering', 'marketing', 'sales', 'support'];
                const positions = ['Developer', 'Manager', 'Analyst', 'Specialist', 'Director'];
                const statuses = ['active', 'pending', 'inactive'];
                
                for (let i = 1; i <= 50; i++) {
                    this.data.push({
                        id: i,
                        name: ⁠ Employee ${i} ⁠,
                        department: departments[Math.floor(Math.random() * departments.length)],
                        position: positions[Math.floor(Math.random() * positions.length)],
                        salary: Math.floor(Math.random() * 90000) + 30000,
                        progress: Math.floor(Math.random() * 100) + 1,
                        status: statuses[Math.floor(Math.random() * statuses.length)]
                    });
                }
                
                this.filteredData = [...this.data];
            }

            renderTable() {
                const tbody = document.getElementById('tableBody');
                const startIndex = (this.currentPage - 1) * this.rowsPerPage;
                const endIndex = startIndex + this.rowsPerPage;
                const pageData = this.filteredData.slice(startIndex, endIndex);

                tbody.innerHTML = '';

                pageData.forEach((row, index) => {
                    const tr = document.createElement('tr');
                    tr.classList.add('fade-in');
                    tr.style.animationDelay = ⁠ ${index * 0.1}s ⁠;
                    
                    tr.innerHTML = `
                        <td>#${row.id}</td>
                        <td>${row.name}</td>
                        <td>${this.capitalize(row.department)}</td>
                        <td>${row.position}</td>
                        <td>$${row.salary.toLocaleString()}</td>
                        <td>
                            <div class="progress-bar">
                                <div class="progress-value ${this.getProgressClass(row.progress)}" 
                                     style="width: ${row.progress}%"></div>
                            </div>
                            <small>${row.progress}%</small>
                        </td>
                        <td><span class="status status-${row.status}">${row.status}</span></td>
                        <td>
                            <button class="btn btn-primary" onclick="table.editRow(${row.id})">Edit</button>
                            <button class="btn btn-secondary" onclick="table.deleteRow(${row.id})">Delete</button>
                        </td>
                    `;                    tbody.appendChild(tr);
                });

                this.updateTableInfo();
                this.renderPagination();
                this.updateSortIndicators();
            }

            getProgressClass(progress) {
                if (progress >= 70) return 'progress-high';
                if (progress >= 40) return 'progress-medium';
                return 'progress-low';
            }

            capitalize(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }

            setupEventListeners() {
                // Search functionality
                document.getElementById('searchInput').addEventListener('input', (e) => {
                    this.filterData(e.target.value);
                });

                // Filter functionality
                document.getElementById('statusFilter').addEventListener('change', (e) => {
                    this.filterData();
                });

                document.getElementById('departmentFilter').addEventListener('change', (e) => {
                    this.filterData();
                });

                // Sort functionality
                document.querySelectorAll('.sortable').forEach(th => {
                    th.addEventListener('click', () => {
                        const column = th.dataset.sort;
                        this.sortData(column);
                    });
                });

                // Add row functionality
                document.getElementById('addRowBtn').addEventListener('click', () => {
                    this.addRandomRow();
                });

                // Export functionality
                document.getElementById('exportBtn').addEventListener('click', () => {
                    this.exportToCSV();
                });
            }

            filterData(searchTerm = '') {
                const statusFilter = document.getElementById('statusFilter').value;
                const departmentFilter = document.getElementById('departmentFilter').value;
                
                this.filteredData = this.data.filter(row => {
                    const matchesSearch = !searchTerm || Object.values(row).some(value => 
                        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                    );
                    
                    const matchesStatus = !statusFilter || row.status === statusFilter;
                    const matchesDepartment = !departmentFilter || row.department === departmentFilter;
                    
                    return matchesSearch && matchesStatus && matchesDepartment;
                });
                
                this.currentPage = 1;
                this.renderTable();
            }

            sortData(column) {
                if (this.currentSort.column === column) {
                    this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
                } else {
                    this.currentSort.column = column;
                    this.currentSort.direction = 'asc';
                }
                
                this.filteredData.sort((a, b) => {
                    let aValue = a[column];
                    let bValue = b[column];
                    
                    if (typeof aValue === 'string') {
                        aValue = aValue.toLowerCase();
                        bValue = bValue.toLowerCase();
                    }
                    
                    if (aValue < bValue) return this.currentSort.direction === 'asc' ? -1 : 1;
                    if (aValue > bValue) return this.currentSort.direction === 'asc' ? 1 : -1;
                    return 0;
                });
                
                this.renderTable();
            }

            updateSortIndicators() {
                document.querySelectorAll('.sortable').forEach(th => {
                    th.classList.remove('sort-asc', 'sort-desc');
                    if (th.dataset.sort === this.currentSort.column) {
                        th.classList.add(⁠ sort-${this.currentSort.direction} ⁠);
                    }
                });
            }

            renderPagination() {
                const totalPages = Math.ceil(this.filteredData.length / this.rowsPerPage);
                const pagination = document.getElementById('pagination');
                
                pagination.innerHTML = '';
                
                for (let i = 1; i <= totalPages; i++) {
                    const pageBtn = document.createElement('button');
                    pageBtn.className = ⁠ page-btn ${i === this.currentPage ? 'active' : ''} ⁠;
                    pageBtn.textContent = i;
                    pageBtn.addEventListener('click', () => {
                        this.currentPage = i;
                        this.renderTable();
                    });
                    pagination.appendChild(pageBtn);
                }
            }

            updateTableInfo() {
                const startIndex = (this.currentPage - 1) * this.rowsPerPage + 1;
                const endIndex = Math.min(startIndex + this.rowsPerPage - 1, this.filteredData.length);
                const total = this.filteredData.length;
                
                document.getElementById('tableInfo').textContent = 
                    ⁠ Showing ${startIndex} to ${endIndex} of ${total} entries ⁠;
            }

            addRandomRow() {
                const departments = ['engineering', 'marketing', 'sales', 'support'];
                const positions = ['Developer', 'Manager', 'Analyst', 'Specialist'];
                const statuses = ['active', 'pending'];
                
                const newRow = {
                    id: this.data.length + 1,
                    name: ⁠ New Employee ${this.data.length + 1} ⁠,
                    department: departments[Math.floor(Math.random() * departments.length)],
                    position: positions[Math.floor(Math.random() * positions.length)],
                    salary: Math.floor(Math.random() * 80000) + 40000,
                    progress: Math.floor(Math.random() * 100) + 1,
                    status: 'pending'
                };
                
                this.data.unshift(newRow);
                this.filterData();
            }

            editRow(id) {
                const row = this.data.find(r => r.id === id);
                alert(⁠ Editing: ${row.name}\nPosition: ${row.position}\nSalary: $${row.salary} ⁠);
                // In real implementation, open a modal form
            }

            deleteRow(id) {
                if (confirm('Are you sure you want to delete this row?')) {
                    this.data = this.data.filter(r => r.id !== id);
                    this.filterData();
                }
            }

            exportToCSV() {
                const headers = ['ID', 'Name', 'Department', 'Position', 'Salary', 'Progress', 'Status'];
                const csvContent = [
                    headers.join(','),
                    ...this.filteredData.map(row => [
                        row.id,
                        ⁠ "${row.name}" ⁠,
                        row.department,
                        row.position,
                        row.salary,
                        row.progress,
                        row.status
                    ].join(','))
                ].join('\n');
                
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'table_data.csv';
                a.click();
                window.URL.revokeObjectURL(url);
            }
        }

        // Initialize the table when page loads
        const table = new AdvancedTable();
   
