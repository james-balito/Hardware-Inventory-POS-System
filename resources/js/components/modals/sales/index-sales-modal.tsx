import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'; // or your UI library
import { Sale } from '@/interfaces/Interfaces';
import { formatDate, formatTime } from '@/components/format-time-and-date';

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
            <div className="fixed inset-0 backdrop-blur-lg" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogContent className="rounded-xl bg-white p-6">
                    <DialogHeader className="text-xl font-semibold">
                        Sale Details
                    </DialogHeader>

                    {/* Sale details here */}
                    {sale && (
                        <div>
                            <p className={`font-semibold flex flex-col`}>
                                Invoice #:{' '}
                                <span className={`font-normal`}>
                                    {sale.invoice_number}
                                </span>
                            </p>
                            <p className={`my-2 font-semibold`}>
                                Product Purchased:
                                {sale.products.map((product) => (
                                    <div
                                        key={product.id}
                                        className={`my-1 flex items-center justify-between`}
                                    >
                                        <p
                                            className={`text-sm font-normal text-gray-700`}
                                        >
                                            {product.product_name} x{' '}
                                            <span className={`text-gray-500`}>
                                                {product.pivot.quantity}
                                            </span>
                                        </p>

                                        <p className="font-mono">
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
                            </p>

                            <p
                                className={`my-2 flex justify-between font-semibold`}
                            >
                                Date Purchased:{' '}
                                <div>
                                    <span className={`text-sm font-normal`}>
                                        {formatDate(sale.created_at)}{' '}
                                        {formatTime(sale.created_at)}
                                    </span>
                                </div>
                            </p>
                            <hr className={`my-2`} />
                            <p className={`flex justify-between`}>
                                Total:
                                <span className={`font-mono`}>
                                    ₱
                                    {Number(sale.total).toLocaleString(
                                        'en-PH',
                                        {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        },
                                    )}
                                </span>
                            </p>
                        </div>
                    )}

                    <button
                        onClick={onClose}
                        className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-white"
                    >
                        Close
                    </button>
                </DialogContent>
            </div>
        </Dialog>
    );
}
