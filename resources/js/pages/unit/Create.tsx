import { useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import React, { FormEvent, useState } from 'react';
import { Head } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        unit_name: '',
        abbreviation: '',
    });

    const [successMessage, setSuccessMessage] = useState('');

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post('/units', {
            onSuccess: () => {
                setSuccessMessage('Unit created successfully! Redirecting...');
            },
        });
    }

    return (
        <div className="container mx-auto max-w-2xl py-8">
            <Head title="Create New Unit" />
            {successMessage && (
                <div className="mb-4 rounded-lg border border-green-400 bg-green-100 p-4 text-green-700">
                    {successMessage}
                </div>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Create New Unit</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="unit_name">Unit Name</Label>
                            <Input
                                id="unit_name"
                                value={data.unit_name}
                                onChange={(e) =>
                                    setData('unit_name', e.target.value)
                                }
                                placeholder="Enter unit name"
                                required
                            />
                            {errors.unit_name && (
                                <p className="text-sm text-red-500">
                                    {errors.unit_name}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="abbreviation">
                                Unit Abbreviation (Optional)
                            </Label>
                            <Textarea
                                id="abbreviation"
                                value={data.abbreviation}
                                onChange={(e) =>
                                    setData('abbreviation', e.target.value)
                                }
                                placeholder="Enter unit abbreviation"
                                rows={4}
                            />
                            {errors.abbreviation && (
                                <p className="text-sm text-red-500">
                                    {errors.abbreviation}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creating...' : 'Create Unit'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.visit('/units')}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
