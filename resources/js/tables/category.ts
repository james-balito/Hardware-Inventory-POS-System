export function CategoryTable() {
    const columns = [
        { key: 'category_name', label: 'Category Name' },
        { 
            key: 'description', 
            label: 'Description',
            render: (value: string) => value || 'No description'
        },
    ];

    const actions = ['view', 'edit', 'delete'];

    return { columns, actions };
}