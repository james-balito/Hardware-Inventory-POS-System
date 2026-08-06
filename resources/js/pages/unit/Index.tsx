import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ShowListModal from '@/components/show-list-modal';
import PageHeader from '@/components/header';
import { Ruler } from 'lucide-react';
import TableList from '@/components/table-list';
import { UnitTable } from '@/tables/units';
import { Head } from '@inertiajs/react';
import { CreateUnitModal } from '@/components/modals/unit/create-unit-modal';
import { EditUnitModal } from '@/components/modals/unit/edit-unit-modal';

interface Unit {
    id: number;
    unit_name: string;
    abbreviation: string;
    created_at: string;
    updated_at: string;
}

interface UnitProps {
    units: Unit[];
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Inventory',
            href: '/units',
        },
        {
            title: 'Units',
            href: '/units',
        },
    ],
};

export default function Index({ units }: UnitProps) {
    const [showUnits, setShowUnits] = useState<Unit[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowUnits(units);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [units]);

    const handleShowModal = (unit: Unit) => {
        setSelectedUnit(unit);
        setIsModalOpen(true);
    };

    const handleEdit = (unit: Unit) => {
        setSelectedUnit(unit);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this unit?')) {
            console.log(`Delete unit with ID: ${id}`);
            router.delete(`/units/${id}`, {
                onSuccess: () => {
                    console.log('Unit deleted successfully');
                },
                onError: (errors) => {
                    console.error('Error deleting unit:', errors);
                },
            });
        }
    };

    return (
        <div className="container bg-white py-8 dark:bg-slate-900/10">
            <Head title="Units | Macmac Hardware" />
            <div>
                {loading ? (
                    <div className="min-h-screen bg-slate-50 dark:bg-slate-900/10">
                        <div className="mx-10">
                            <div className="mb-6 flex items-end justify-between">
                                <div className={`flex flex-row`}>
                                    <div className="h-12 w-13 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                                    <div className={`ml-4 flex flex-col`}>
                                        <div className="h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                                        <div className="mt-1 h-7 w-12 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                                    </div>
                                </div>
                                <div className="h-10 w-32 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
                            </div>

                            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950/70">
                                <div className="flex animate-pulse gap-20 border-b border-slate-200 bg-slate-50 px-6 py-3.5 dark:border-slate-700 dark:bg-slate-900/80">
                                    {[...Array(8)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700"
                                        />
                                    ))}
                                </div>
                                {[...Array(10)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="flex animate-pulse gap-8 border-b border-slate-100 px-6 py-4 dark:border-slate-800"
                                    >
                                        <div className="h-4 w-6 rounded bg-slate-100 dark:bg-slate-800" />
                                        <div className="h-4 w-24 rounded bg-slate-100 dark:bg-slate-800" />
                                        <div className="h-4 w-40 rounded bg-slate-100 dark:bg-slate-800" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="mx-10 mb-6 flex items-center justify-between bg-white dark:bg-slate-900/10">
                            <Head title="Units | Macmac Hardware" />
                            <PageHeader
                                headerTitle="Inventory"
                                icon={<Ruler />}
                                title="Units"
                            />
                            <Button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="inline-block bg-slate-900 text-slate-50 hover:bg-slate-800 border dark:border-slate-700 dark:bg-slate-800/60 dark:border-slate-600 dark:hover:bg-slate-700/60"
                            >
                                Add Unit
                            </Button>
                        </div>

                        <div className={`mx-10`}>
                            <TableList
                                columns={UnitTable.columns}
                                actions={UnitTable.actions}
                                onView={handleShowModal}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                useDropdown={false}
                                indexLabel="#"
                                indexStartFrom={1}
                                showIndex={true}
                                data={showUnits}
                            />
                        </div>
                    </>
                )}
            </div>

            <ShowListModal
                trigger={<div style={{ display: 'none' }} />}
                title="Category Details"
                unit={selectedUnit || undefined}
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            />

            <CreateUnitModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />

            <EditUnitModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                unit={selectedUnit || ({} as Unit)}
                onSuccess={() => setIsEditModalOpen(false)}
            />
        </div>
    );
}
