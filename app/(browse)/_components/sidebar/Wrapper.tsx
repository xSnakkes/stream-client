interface WrapperProps {
    children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
    return (
        <aside className="flex flex-col h-full fixed left-0 bg-background w-60 border-r border-[#fff] z-50">
            <div className="flex-grow">
                {children}
            </div>
        </aside>
    );
}