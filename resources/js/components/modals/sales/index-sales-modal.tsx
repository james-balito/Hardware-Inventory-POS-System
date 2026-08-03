import { Dialog, DialogContent} from '@/components/ui/dialog'; // or your UI library
import { Sale } from '@/interfaces/Interfaces';
import { formatDate, formatTime } from '@/components/format-time-and-date';
import { PhilippinePeso, ReceiptText, X } from 'lucide-react';

interface SalesModalProps {
    isOpen: boolean;
    onClose: () => void;
    sale?: Sale | null; // Optional: pass the selected sale
}

export default function SalesModal({ isOpen, onClose, sale }: SalesModalProps) {
    // Use the prop, don't create internal state
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <div
                className="fixed inset-0 backdrop-blur-lg"
                aria-hidden="true"
            />

            <div className="fixed inset-0 flex items-center justify-center">
                <DialogContent className="w-full max-w-sm overflow-hidden rounded-xl bg-white p-0 [&>button]:hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-slate-900 px-5 py-4">
                        <div className="flex items-center gap-2">
                            <ReceiptText className="h-4 w-4 text-slate-400" />
                            <p className="text-sm font-semibold text-white">
                                Order Sale Details
                            </p>
                        </div>
                        <button onClick={onClose}>
                            <X className = {`text-white h-4 w-4 hover:text-slate-400 cursor-pointer`} />
                        </button>
                    </div>

                    {/* Sale details here */}
                    {sale && (
                        <div className="p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                                    Invoice #
                                </span>
                                <span className="font-mono text-sm font-semibold text-slate-900">
                                    {sale.invoice_number}
                                </span>
                            </div>

                            <div className="my-4 border-t border-dashed border-slate-300" />

                            <p className="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                                Items Purchased
                            </p>
                            <div className="flex flex-col divide-y divide-slate-100">
                                {sale.products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center justify-between gap-3 py-2"
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-slate-800">
                                                {product.product_name}
                                            </p>
                                            <p className="flex items-center text-xs text-slate-500">
                                                <PhilippinePeso className="h-3 w-3 shrink-0" />
                                                {product.pivot.item_price} ×{' '}
                                                {product.pivot.quantity}{' '}
                                                {product.pivot.unit}
                                            </p>
                                        </div>

                                        <p className="shrink-0 font-mono text-sm text-slate-800">
                                            ₱
                                            {(
                                                Number(
                                                    product.pivot.item_price,
                                                ) *
                                                Number(product.pivot.quantity)
                                            ).toLocaleString('en-PH', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="my-4 border-t border-dashed border-slate-300" />

                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                                    Date Purchased
                                </span>
                                <span className="text-sm text-slate-700">
                                    {formatDate(sale.created_at)} ·{' '}
                                    {formatTime(sale.created_at)}
                                </span>
                            </div>

                            <div className="my-4 border-t-2 border-slate-800" />

                            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5">
                                <span className="text-sm font-bold text-slate-900">
                                    Total
                                </span>
                                <span className="font-mono text-lg font-bold text-slate-900">
                                    ₱
                                    {Number(sale.total).toLocaleString(
                                        'en-PH',
                                        {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        },
                                    )}
                                </span>
                            </div>

                            <button
                                onClick={onClose}
                                className="mt-4 w-full cursor-pointer rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                            >
                                Close
                            </button>
                        </div>
                    )}
                </DialogContent>
            </div>
        </Dialog>
    );
}
