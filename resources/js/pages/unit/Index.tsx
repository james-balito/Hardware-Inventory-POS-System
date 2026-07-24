import { Card, CardContent } from '@/components/ui/card';
import { Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { create, edit } from '@/routes/units';
import { formatDate, formatTime } from '@/components/format-time-and-date';
import ShowListModal from '@/components/show-list-modal';
import PageHeader from '@/components/header';
import { Ruler } from 'lucide-react';

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

export default function Index({ units }: UnitProps) {
    const [showUnits, setShowUnits] = useState<Unit[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleEdit = (id: number) => {
        console.log(`Edit unit with ID: ${id}`);
        router.visit(`/units/${id}/edit`);
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

    if (loading) {
        return (
            <div className="container py-8">
                <div className="mx-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Unit List</h1>
                    <Link href={create()} className="inline-block">
                        <Button>Add Unit</Button>
                    </Link>
                </div>
                <p className="mx-8 my-4">Loading units...</p>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <div className="mx-8 mb-6 flex items-center justify-between">
                <PageHeader
                    headerTitle="Inventory"
                    icon={<Ruler />}
                    title="Units"
                />
                <Link href={create()} className="inline-block">
                    <Button>Add Unit</Button>
                </Link>
            </div>

            <div className="card-stagger mx-8 mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {showUnits.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">
                        No units found.
                    </p>
                ) : (
                    showUnits.map((unit, index) => (
                        <Card key={unit.id} className="relative">
                            <CardContent className="py-2">
                                <div className="space-y-2">
                                    <span className="text-sm text-gray-500">
                                        #{unit.id}
                                    </span>
                                    <h2 className="text-xl font-semibold">
                                        Unit Name: {unit.unit_name}
                                    </h2>
                                    {!unit.abbreviation && (
                                        <p className="text-gray-400 italic">
                                            No abbreviation available.
                                        </p>
                                    )}
                                    {unit.abbreviation && (
                                        <p className="text-gray-600">
                                            Abbreviation: {unit.abbreviation}
                                        </p>
                                    )}
                                    <p className="text-sm text-gray-500">
                                        Created: {formatDate(unit.created_at)}{' '}
                                        {formatTime(unit.created_at)}
                                    </p>

                                    <div className="mt-4 mb-auto flex gap-2">
                                        {/* Use modal instead of navigation */}
                                        <ShowListModal
                                            trigger={
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    View Details
                                                </Button>
                                            }
                                            title="Unit Details"
                                            description={`Information for unit: ${unit.unit_name}`}
                                            unit={unit}
                                        />

                                        <Link href={edit(unit.id)}>
                                            <Button variant="outline" size="sm">
                                                Edit
                                            </Button>
                                        </Link>

                                        <Button
                                            onClick={() =>
                                                handleDelete(unit.id)
                                            }
                                            variant="destructive"
                                            size="sm"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Alternative: Controlled modal approach */}
            <ShowListModal
                trigger={<div style={{ display: 'none' }} />}
                title="Category Details"
                unit={selectedUnit || undefined}
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
        </div>
    );
}
