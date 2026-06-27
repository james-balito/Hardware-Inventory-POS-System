// resources/js/Components/Form/FormNumberInput.tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormNumberInputProps {
    id: string;
    label: string;
    value: string | number;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
    required?: boolean;
    min?: number;
    max?: number;
    step?: number;
    icon?: React.ReactNode;
}

export function FormNumberInput({ 
    id, label, value, onChange, error, placeholder, required = false, 
    min, max, step = 1, icon 
}: FormNumberInputProps) {
    return (
        <div className="space-y-1.5">
            <Label htmlFor={id} className="text-sm font-medium text-slate-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="relative">
                {icon && (
                    <div className="absolute h-4 w-4 text-slate-400 top-1/2 -translate-y-1/2 left-3 pointer-events-none">
                        {icon}
                    </div>
                )}
                <Input
                    id={id}
                    type="number"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    step={step}
                    min={min}
                    max={max}
                    required={required}
                    className={icon ? 'pl-8' : ''}
                />
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}