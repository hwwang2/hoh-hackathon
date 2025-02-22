import { ReactNode } from "react";
import { cn } from "@/lib/utils"
import { KeyValue } from "./keybd";
import { CharStatus } from "./statuses";

type Props = {
  children?: ReactNode;
  value: KeyValue;
  width?: number;
  status?: CharStatus;
  onClick: (value: KeyValue) => void;
};

export const Key = ({
  children,
  status,
  width = 40,
  value,
  onClick,
}: Props) => {
  const classes = cn(
    "flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer",
    {
      "bg-slate-200 hover:bg-slate-300 active:bg-slate-400": !status,
      "bg-slate-400 text-white": status === "absent",
      "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white":
        status === "correct",
      "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white":
        status === "present",
    }
  );

  return (
    <div
      style={{ width: `${width}px`, height: "58px" }}
      className={classes}
      onClick={() => onClick(value)}
    >
      {children || value}
    </div>
  );
};
