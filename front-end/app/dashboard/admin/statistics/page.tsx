import {
    containerClass,
    mainDescClass,
    mainDivClass,
    mainTitleClass,
} from "@/styles/classNames.admin";

export default function Page() {
    return (
        <div className={mainDivClass}>
            <h1 className={mainTitleClass}>Statistics & Analytics</h1>
            <p className={mainDescClass}>Track and manage clinic payments</p>
            <div className={containerClass}></div>
        </div>
    );
}
