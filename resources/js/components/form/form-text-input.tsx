// resources/js/Components/Form/FormTextInput.tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormTextInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
    required?: boolean;
    type?: 'text' | 'email' | 'password';
}

export function FormTextInput({ 
    id, label, value, onChange, error, placeholder, required = false, type = 'text' 
}: FormTextInputProps) {
    return (
        <div className="space-y-1.5">
            <Label htmlFor={id} className="text-sm font-medium text-slate-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
                id={id}
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                required={required}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}