// resources/js/Components/Modal.tsx
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const backdropRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Timeline | null>(null);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    // Handle open/close animations
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
            
            // Kill any existing tweens
            if (tweenRef.current) {
                tweenRef.current.kill();
            }

            // Create entrance animation
            const tl = gsap.timeline();
            
            // Animate backdrop
            tl.fromTo(
                backdropRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.2, ease: 'power2.out' },
                0
            );
            
            // Animate card
            tl.fromTo(
                cardRef.current,
                { 
                    opacity: 0, 
                    scale: 0.95, 
                    y: 20 
                },
                { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0, 
                    duration: 0.3, 
                    ease: 'back.out(1.4)' 
                },
                0.05 // Slight delay after backdrop starts
            );

            tweenRef.current = tl;
        } else if (isVisible) {
            // Exit animation
            document.body.style.overflow = 'unset';
            
            if (tweenRef.current) {
                tweenRef.current.kill();
            }

            const tl = gsap.timeline({
                onComplete: () => setIsVisible(false)
            });
            
            // Animate card out
            tl.to(
                cardRef.current,
                { 
                    opacity: 0, 
                    scale: 0.95, 
                    y: 10, 
                    duration: 0.2, 
                    ease: 'power2.in' 
                },
                0
            );
            
            // Animate backdrop out
            tl.to(
                backdropRef.current,
                { opacity: 0, duration: 0.2, ease: 'power2.in' },
                0.05
            );

            tweenRef.current = tl;
        }

        return () => {
            if (tweenRef.current) {
                tweenRef.current.kill();
            }
        };
    }, [isOpen, isVisible]);

    if (!isVisible) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                ref={backdropRef}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Modal Card */}
            <div 
                ref={cardRef}
                className={`relative bg-white rounded-xl shadow-xl ${sizeClasses[size]} w-full mx-4 max-h-[90vh] overflow-auto`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Body */}
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}