import { ReactNode } from 'react';

interface SectionWrapperProps {
    children: ReactNode;
    id?: string;
    className?: string;
    divider?: boolean;
}

export default function SectionWrapper({
    children,
    id,
    className = '',
    divider = true
}: SectionWrapperProps) {
    return (
        <section
            id={id}
            className={`py-24 md:py-32 px-6 md:px-8 lg:px-12 ${className}`}
        >
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
            {divider && <div className="section-divider mt-24 md:mt-32 max-w-7xl mx-auto" />}
        </section>
    );
}
