import React, { FormEvent } from 'react';

interface FormLayoutProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
    sidebar?: React.ReactNode;
}

export function FormLayout({ onSubmit, children, sidebar }: FormLayoutProps) {
    return (
        <form onSubmit={onSubmit}>
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-7 space-y-5">
                    {children}
                </div>
                {sidebar && (
                    <div className="col-span-5">
                        {sidebar}
                    </div>
                )}
            </div>
        </form>
    );
}