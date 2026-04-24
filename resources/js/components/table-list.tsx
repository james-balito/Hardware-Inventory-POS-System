// components/table-list.tsx
import { Eye, Pencil, Plus, Trash } from "lucide-react";
import { Column } from "@/pages/interfaces/Interfaces";
import { TableListProps } from "@/pages/interfaces/Props";
import { Button } from "./ui/button";

export default function TableList({ 
    columns, 
    data, 
    actions = ['view', 'edit', 'delete'], 
    onView, 
    onEdit, 
    onDelete,
    showIndex = true,
    indexLabel = "No.",
    indexStartFrom = 1,
    emptyTableMessage = "No data available"
}: TableListProps) {
    // Calculate total columns for empty message colspan
    const totalColumns = 
        (showIndex ? 1 : 0) + 
        columns.length + 
        (actions.length > 0 ? 1 : 0);

    return (
        <div className="overflow-x-auto border-2 border-gray-200 rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {showIndex && (
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16 border-r-1">
                                {indexLabel}
                            </th>
                        )}
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {column.label}
                            </th>
                        ))}
                        {actions.length > 0 && (
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length === 0 ? (
                        <tr>
                            <td 
                                colSpan={totalColumns} 
                                className="px-6 py-12 text-center text-sm text-gray-500"
                            >
                                {typeof emptyTableMessage === 'string' ? (
                                    <p>{emptyTableMessage}</p>
                                ) : (
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="mb-4">{emptyTableMessage.icon}</div>
                                        <h3 className="text-lg font-medium text-gray-900">{emptyTableMessage.title}</h3>
                                        <p className="text-gray-500">{emptyTableMessage.description}</p>
                                        <Button size='default' onClick={() => {emptyTableMessage.onActionClick?.()}} className="cursor-pointer my-2">
                                           <Plus /> Add {emptyTableMessage.buttonText || 'Item'}
                                        </Button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr key={item.id || index} className="hover:bg-gray-50 transition-colors duration-200">
                                {showIndex && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium border-r-1">
                                        {indexStartFrom + index}
                                    </td>
                                )}
                                {columns.map((column) => (
                                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {column.render 
                                            ? column.render(item[column.key], item)
                                            : item[column.key] || 'No data'}
                                    </td>
                                ))}
                                {actions.length > 0 && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex gap-3">
                                            {actions.includes('view') && onView && (
                                                <button
                                                    onClick={() => onView(item)}
                                                    className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                                                    title="View"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            )}
                                            {actions.includes('edit') && onEdit && (
                                                <button
                                                    onClick={() => onEdit(item)}
                                                    className="text-green-600 hover:text-green-800 transition-colors cursor-pointer"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                            )}
                                            {actions.includes('delete') && onDelete && (
                                                <button
                                                    onClick={() => onDelete(item)}
                                                    className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                                                    title="Delete"
                                                >
                                                    <Trash className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}