import { containerClass } from "@/styles/classNames.admin";

export default function Stack({ children }: { children: React.ReactNode | undefined }) {
    return <div className={containerClass}>{children}</div>;
}
