import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface FormTextareaProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
    required?: boolean;
    rows?: number;
    optional?: boolean;
}

export function FormTextarea({ 
    id, label, value, onChange, error, placeholder, required = false, rows = 3, optional = false 
}: FormTextareaProps) {
    return (
        <div className="space-y-1.5">
            <Label htmlFor={id} className="text-sm font-medium text-slate-700">
                {label}
                {optional && <span className="text-slate-400 font-normal ml-1">(optional)</span>}
            </Label>
            <Textarea
                id={id}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className="resize-none"
                required={required}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}