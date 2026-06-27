import { Eye, Pencil, Trash2, Ellipsis, Plus } from "lucide-react";
import { TableListProps } from "@/pages/interfaces/Props";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TableList({
    columns = [],
    data = [],
    actions = [],
    onView,
    onEdit,
    onDelete,
    showIndex = true,
    indexLabel = "No.",
    indexStartFrom = 1,
    emptyTableMessage = "No data available"
}: TableListProps) {
    const totalColumns =
        (showIndex ? 1 : 0) +
        columns.length +
        (actions.length > 0 ? 1 : 0);

    return (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="min-w-full">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                        {showIndex && (
                            <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-14">
                                {indexLabel}
                            </th>
                        )}
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                            >
                                {column.label}
                            </th>
                        ))}
                        {actions.length > 0 && (
                            <th className="px-6 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider w-16">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={totalColumns} className="px-6 py-16 text-center">
                                {typeof emptyTableMessage === 'string' ? (
                                    <p className="text-slate-500 text-sm">{emptyTableMessage}</p>
                                ) : (
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                            {emptyTableMessage.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-900 mb-1">
                                                {emptyTableMessage.title}
                                            </h3>
                                            <p className="text-sm text-slate-500">
                                                {emptyTableMessage.description}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => emptyTableMessage.onActionClick?.()}
                                            className="flex items-center gap-1.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors mt-1"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                            Add {emptyTableMessage.buttonText ?? 'Item'}
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr key={item.id ?? index} className="hover:bg-slate-50 transition-colors">
                                {showIndex && (
                                    <td className="px-6 py-4 text-sm text-slate-400 font-medium">
                                        {indexStartFrom + index}
                                    </td>
                                )}
                                {columns.map((column) => (
                                    <td key={column.key} className="px-6 py-4 text-sm text-slate-700">
                                        {column.render
                                            ? column.render(item[column.key], item)
                                            : item[column.key] ?? '—'}
                                    </td>
                                ))}
                                {actions.length > 0 && (
                                    <td className="px-6 py-4 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                                                    <Ellipsis className="w-4 h-4" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-40" align="end">
                                                <DropdownMenuGroup>
                                                    {/* ✅ Conditions outside DropdownMenuItem — no blank items */}
                                                    {actions.includes('view') && onView && (
                                                        <DropdownMenuItem
                                                            onClick={() => onView(item)}
                                                            className="cursor-pointer"
                                                        >
                                                            <Eye className="w-4 h-4 mr-2 text-slate-400" />
                                                            View
                                                        </DropdownMenuItem>
                                                    )}
                                                    {actions.includes('edit') && onEdit && (
                                                        <DropdownMenuItem
                                                            onClick={() => onEdit(item)}
                                                            className="cursor-pointer"
                                                        >
                                                            <Pencil className="w-4 h-4 mr-2 text-slate-400" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                    )}
                                                    {actions.includes('delete') && onDelete && (
                                                        <>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() => onDelete(item)}
                                                                className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                                                            >
                                                                <Trash2 className="w-4 h-4 mr-2" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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