import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Eye, Pencil, Trash2, Ellipsis, Plus } from 'lucide-react';
import { TableListProps } from '@/interfaces/Props';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function TableList({
    columns = [],
    data = [],
    actions = [],
    onView,
    onEdit,
    onDelete,
    showIndex = true,
    indexLabel = 'No.',
    indexStartFrom = 1,
    emptyTableMessage = 'No data available',
    useDropdown = false,
}: TableListProps) {
    const totalColumns =
        (showIndex ? 1 : 0) + columns.length + (actions.length > 0 ? 1 : 0);

    // Refs for the row pop-in animation, re-populated on every render via
    // the callback ref on each <tr> below.
    const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);
    rowRefs.current = [];

    // Re-runs every time the `data` array reference changes — not just on
    // mount — since this component gets reused across the app with data
    // that changes over its lifetime (pagination, filters, CRUD updates).
    // Note: this re-triggers on ANY new array reference, even if the
    // actual rows are unchanged — fine for a table whose parent typically
    // only passes a new array when data genuinely changed, but worth
    // knowing if a parent ever does something like `data={[...items]}`
    // on every render for unrelated reasons.
    useLayoutEffect(() => {
        if (data.length === 0) return;

        gsap.fromTo(
            rowRefs.current.filter(Boolean),
            { opacity: 0, scale: 0.95, y: 6 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.35,
                stagger: 0.04,
                ease: 'back.out(1.4)', // slight overshoot — the "pop" in pop-in
            },
        );
    }, [data]);

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <table className="min-w-full">
                <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                        {showIndex && (
                            <th className="w-14 px-6 py-3.5 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                {indexLabel}
                            </th>
                        )}
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="px-6 py-3.5 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
                            >
                                {column.label}
                            </th>
                        ))}
                        {actions.length > 0 && (
                            <th className="w-16 px-6 py-3.5 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={totalColumns}
                                className="px-6 py-16 text-center"
                            >
                                {typeof emptyTableMessage === 'string' ? (
                                    <p className="text-sm text-slate-500">
                                        {emptyTableMessage}
                                    </p>
                                ) : (
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                            {emptyTableMessage.icon}
                                        </div>
                                        <div>
                                            <h3 className="mb-1 text-sm font-semibold text-slate-900">
                                                {emptyTableMessage.title}
                                            </h3>
                                            <p className="text-sm text-slate-500">
                                                {emptyTableMessage.description}
                                            </p>
                                        </div>
                                        {/* <button
                                            onClick={() =>
                                                emptyTableMessage.onActionClick?.()
                                            }
                                            className="mt-1 flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-600"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                            Add{' '}
                                            {emptyTableMessage.buttonText ??
                                                'Item'}
                                        </button> */}
                                    </div>
                                )}
                            </td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr
                                key={item.id ?? index}
                                ref={(el) => {
                                    rowRefs.current[index] = el;
                                }}
                                className="transition-colors hover:bg-slate-50"
                            >
                                {showIndex && (
                                    <td className="px-6 py-4 text-sm font-medium text-slate-400">
                                        {indexStartFrom + index}
                                    </td>
                                )}
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className="px-6 py-4 text-sm text-left text-slate-700"
                                    >
                                        {column.render
                                            ? column.render(
                                                  item[column.key],
                                                  item,
                                              )
                                            : (item[column.key] ?? '—')}
                                    </td>
                                ))}
                                {actions.length > 0 && (
                                    <td className="px-6 py-4 text-right">
                                        {/* Single view button */}
                                        {actions.length === 1 &&
                                        actions[0] === 'view' &&
                                        onView ? (
                                            <button
                                                onClick={() => onView(item)}
                                                className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                        ) : useDropdown ? (
                                            /* Dropdown menu */
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
                                                        <Ellipsis className="h-4 w-4" />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    className="w-40"
                                                    align="end"
                                                >
                                                    <DropdownMenuGroup>
                                                        {actions.includes(
                                                            'view',
                                                        ) &&
                                                            onView && (
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        onView(
                                                                            item,
                                                                        )
                                                                    }
                                                                    className="cursor-pointer text-blue-500 focus:text-blue-400"
                                                                >
                                                                    <Eye className="mr-2 h-4 w-4 text-blue-500 hover:text-blue-600" />{' '}
                                                                    View
                                                                </DropdownMenuItem>
                                                            )}
                                                        {actions.includes(
                                                            'edit',
                                                        ) &&
                                                            onEdit && (
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        onEdit(
                                                                            item,
                                                                        )
                                                                    }
                                                                    className="cursor-pointer text-amber-400 focus:text-amber-500"
                                                                >
                                                                    <Pencil className="mr-2 h-4 w-4 text-amber-400 hover:text-amber-600" />{' '}
                                                                    Edit
                                                                </DropdownMenuItem>
                                                            )}
                                                        {actions.includes(
                                                            'delete',
                                                        ) &&
                                                            onDelete && (
                                                                <>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            onDelete(
                                                                                item,
                                                                            )
                                                                        }
                                                                        className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600"
                                                                    >
                                                                        <Trash2 className="mr-2 h-4 w-4 text-red-600" />{' '}
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </>
                                                            )}
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        ) : (
                                            /* Inline buttons */
                                            <div className="flex items-center justify-end gap-1">
                                                {actions.includes('view') &&
                                                    onView && (
                                                        <button
                                                            onClick={() =>
                                                                onView(item)
                                                            }
                                                            className="cursor-pointer rounded-lg p-1.5 text-blue-500 transition-colors hover:bg-slate-100 hover:text-blue-400"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                {actions.includes('edit') &&
                                                    onEdit && (
                                                        <button
                                                            onClick={() =>
                                                                onEdit(item)
                                                            }
                                                            className="cursor-pointer rounded-lg p-1.5 text-amber-500 transition-colors hover:bg-slate-100 hover:text-amber-400"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                {actions.includes('delete') &&
                                                    onDelete && (
                                                        <button
                                                            onClick={() =>
                                                                onDelete(item)
                                                            }
                                                            className="cursor-pointer rounded-lg p-1.5 text-red-500 transition-colors hover:bg-slate-100 hover:text-red-400"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    )}
                                            </div>
                                        )}
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
