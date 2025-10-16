import type { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import Balloon from "./Balloon";

const H2 = ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
        {...props}
        className={clsx(
            "bg-[#FDEBEC] border-l-5 border-[#F05A6B] px-4 py-3 text-xl font-bold text-[#3D3D3D] mt-6 mb-6",
            className,
        )}
    />
);

const H3 = ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h3
        {...props}
        className={clsx(
            "border-l-4 border-[#F05A6B] px-4 py-3 text-lg font-bold text-[#3D3D3D] mt-4 mb-4",
            className,
        )}
    />
);

export const mdxComponents = {
    Balloon,
    h2: H2,
    h3: H3,
};
