import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type ChecklistItem = {
  label: string;
  valid: boolean;
};

type FormGroupProps = {
  label: string;
  type: string;
  placeholder?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  helperText?: string | string[];
  checklist?: ChecklistItem[];
  step?: string | number;
};

export const FormGroup = ({
  label,
  type,
  placeholder,
  registration,
  error,
  helperText,
  checklist,
  step,
}: FormGroupProps) => {
  return (
    <div className="form-group flex flex-col gap-1">
      <label htmlFor={registration.name} className="text-xs text-gray-300">
        {label}
      </label>
      <input
        {...registration}
        id={registration.name}
        className="h-10 border-0 border-b border-gray-500 placeholder-gray-400 outline-none"
        type={type}
        step={step}
        placeholder={placeholder}
      />

      {checklist && (
        <div className="my-2 flex flex-col gap-1">
          {checklist.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 text-sm ${
                item.valid ? "text-green-500" : "text-gray-400"
              }`}
            >
              <span className="w-4 text-center">{item.valid ? "✓" : "✕"}</span>

              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {helperText && (
        <div className="my-1 text-sm text-gray-400">
          {Array.isArray(helperText) ? (
            helperText.map((text, index) => (
              <span key={index} className="block">
                {text}
              </span>
            ))
          ) : (
            <span>{helperText}</span>
          )}
        </div>
      )}
      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  );
};
