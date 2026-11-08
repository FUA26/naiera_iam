import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, defaultChecked, onChange, onCheckedChange, disabled, id, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e);
      if (onCheckedChange) onCheckedChange(e.target.checked);
    };

    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          id={id}
          ref={ref}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            "peer size-4 shrink-0 rounded border border-slate-300 shadow-xs transition-shadow outline-none focus-visible:border-red-500 focus-visible:ring-[3px] focus-visible:ring-red-500/20 disabled:cursor-not-allowed disabled:opacity-50 checked:border-red-600 checked:bg-red-600 appearance-none cursor-pointer",
            className
          )}
          {...props}
        />
        <Check className="pointer-events-none absolute size-3.5 left-0.5 top-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
