'use client';

import { ReactNode } from 'react';

const inputClass =
  'w-full min-h-[48px] px-4 py-3 bg-matte-black border border-gunmetal text-off-white placeholder-muted focus:outline-none focus-visible:border-brass focus-visible:ring-2 focus-visible:ring-brass/40 transition-colors';

const errorInputClass = 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/30';

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function FieldShell({ id, label, required, error, hint, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-off-white mb-2">
        {label}
        {required ? <span className="text-brass ml-1" aria-hidden="true">*</span> : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      {children}
      {hint && !error ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface TextInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  autoComplete?: string;
}

export function TextInput({
  id,
  name,
  label,
  value,
  onChange,
  required,
  error,
  type = 'text',
  placeholder,
  maxLength,
  autoComplete,
}: TextInputProps) {
  return (
    <FieldShell id={id} label={label} required={required} error={error}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputClass} ${error ? errorInputClass : ''}`}
        placeholder={placeholder}
      />
    </FieldShell>
  );
}

interface TextAreaProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  rows?: number;
  maxLength?: number;
  placeholder?: string;
}

export function TextArea({
  id,
  name,
  label,
  value,
  onChange,
  required,
  error,
  rows = 4,
  maxLength,
  placeholder,
}: TextAreaProps) {
  return (
    <FieldShell id={id} label={label} required={required} error={error}>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputClass} resize-y min-h-[96px] ${error ? errorInputClass : ''}`}
        placeholder={placeholder}
      />
    </FieldShell>
  );
}

interface SelectFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  required?: boolean;
  error?: string;
  placeholder?: string;
}

export function SelectField({
  id,
  name,
  label,
  value,
  onChange,
  options,
  required,
  error,
  placeholder = 'Select…',
}: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} error={error}>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputClass} appearance-none cursor-pointer ${error ? errorInputClass : ''}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

interface CheckboxGroupProps {
  legend: string;
  name: string;
  options: readonly string[];
  values: string[];
  onChange: (values: string[]) => void;
  required?: boolean;
  error?: string;
  maxSelections?: number;
}

export function CheckboxGroup({
  legend,
  name,
  options,
  values,
  onChange,
  required,
  error,
  maxSelections,
}: CheckboxGroupProps) {
  const toggle = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter((v) => v !== option));
      return;
    }
    if (maxSelections && values.length >= maxSelections) return;
    onChange([...values, option]);
  };

  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="text-sm font-medium text-off-white mb-3">
        {legend}
        {required ? <span className="text-brass ml-1" aria-hidden="true">*</span> : null}
        {maxSelections ? (
          <span className="text-muted font-normal ml-2 text-xs">
            (up to {maxSelections})
          </span>
        ) : null}
      </legend>
      <div className="grid sm:grid-cols-2 gap-3">
        {options.map((option) => {
          const checked = values.includes(option);
          const disabled = Boolean(maxSelections && !checked && values.length >= maxSelections);
          const id = `${name}-${option.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`;
          return (
            <label
              key={option}
              htmlFor={id}
              className={`flex items-start gap-3 min-h-[48px] p-3 border cursor-pointer transition-colors ${
                checked ? 'border-brass/50 bg-brass/5' : 'border-gunmetal bg-matte-black/40'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-brass/30'}`}
            >
              <input
                id={id}
                type="checkbox"
                name={name}
                value={option}
                checked={checked}
                disabled={disabled}
                onChange={() => toggle(option)}
                className="mt-1 h-4 w-4 accent-[var(--brass,#c9a227)]"
              />
              <span className="text-sm text-slate leading-snug">{option}</span>
            </label>
          );
        })}
      </div>
      {error ? (
        <p id={`${name}-error`} className="mt-2 text-xs text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
