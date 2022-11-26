export interface ControlProps {
    id?: string;
    className?: string;
    ariaLabel?: string;
    ariaHidden?: boolean;
    ariaDescribedBy?: string;
    role?: string;
}

export interface ContainerProps extends React.PropsWithChildren<ControlProps> {
}

export function fireClickOnEnter(e: React.KeyboardEvent<HTMLElement>) {
    const charCode = (typeof e.which == "number") ? e.which : e.keyCode;
    if (charCode === 13 /* enter */ || charCode === 32 /* space */) {
        e.preventDefault();
        e.currentTarget.click();
    }
}

export function classList(...classes: (string | undefined | boolean)[]) {
    return (classes
        .filter(c => typeof c === "string") as string[])
        .reduce((prev, c) => prev.concat(c.split(" ")), [] as string[])
        .map(c => c.trim())
        .filter(c => !!c)
        .join(" ");
}

export function nodeListToArray<U extends Node>(list: NodeListOf<U>): U[] {
    const out: U[] = [];

    for (const node of list) {
        out.push(node);
    }
    return out;
}