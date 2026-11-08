import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  variant?: "default" | "password";
  showPassword?: boolean;
  onShowPasswordChange?: (show: boolean) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, variant = "default", showPassword, onShowPasswordChange, ...props }, ref) => {
    const [localShowPassword, setLocalShowPassword] = React.useState(false);
    const isPassword = variant === "password" || type === "password";
    const isShowing = showPassword !== undefined ? showPassword : localShowPassword;

    const handleTogglePassword = () => {
      if (onShowPasswordChange) {
        onShowPasswordChange(!isShowing);
      } else {
        setLocalShowPassword(!isShowing);
      }
    };

    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={isPassword ? (isShowing ? "text" : "password") : type}
          className={cn(
            "flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-xs transition-all outline-none placeholder:text-slate-400 focus-visible:border-red-500 focus-visible:ring-[3px] focus-visible:ring-red-500/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
            icon && "pl-10",
            isPassword && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md"
            tabIndex={-1}
            aria-label={isShowing ? "Sembunyikan password" : "Tampilkan password"}
          >
            {isShowing ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  icon?: React.ReactNode;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    return <Input ref={ref} variant="password" {...props} />;
  }
);
PasswordInput.displayName = "PasswordInput";

export { Input, PasswordInput };
