import { Label } from '@/components/ui/label';
import {
    Select, SelectContent, SelectTrigger,
    SelectValue, SelectGroup, SelectLabel, SelectItem
} from '@/components/ui/select';

interface SelectOption {
    id: number;
    name: string;
}

interface FormSelectProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    error?: string;
    placeholder?: string;
    groupLabel?: string;
    required?: boolean;
}

export function FormSelect({ 
    id, label, value, onChange, options, error, placeholder = 'Select...', groupLabel, required = false 
}: FormSelectProps) {
    return (
        <div className="space-y-1.5">
            <Label htmlFor={id} className="text-sm font-medium text-slate-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger id={id} className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}
                        {options.map((option) => (
                            <SelectItem key={option.id} value={option.id.toString()}>
                                {option.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}