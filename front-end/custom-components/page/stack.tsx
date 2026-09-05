import { containerClass } from "@/styles/classNames.admin";
import { ComponentPropsWithoutRef } from "react";

interface StackProps extends ComponentPropsWithoutRef<'div'>{
    children? : React.ReactNode;
}

export default function Stack({
    children,
    ...props
}: StackProps) {
    return (
        <div className={containerClass} {...props}>
            {children}
        </div>
    );
}
