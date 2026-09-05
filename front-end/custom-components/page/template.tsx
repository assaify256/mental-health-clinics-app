import { containerClass, mainDescClass, mainDivClass, mainTitleClass } from "@/styles/classNames.admin";

export default function PageTemplate({
    children,
    title = "Title",
    description = "Description",
}: {
    children: React.ReactNode | undefined;
    title: string | undefined;
    description: string | undefined;
}) {
    return (
        <div className={mainDivClass}>
            <h1 className={mainTitleClass}>{title}</h1>
            <p className={mainDescClass}>
                {description}
            </p>
            {children}
        </div>
    );
}
