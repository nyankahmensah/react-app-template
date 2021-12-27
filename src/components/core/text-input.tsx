import { FC } from "react";
import { ExclamationCircleIcon } from '@heroicons/react/solid'

interface TextInputProps {
  id: string;
  label: string;
  placeholder?: string;
  type?: ("number" | "text" | "email" | "date" | "password");
  values: any;
  handleChange: any;
  handleBlur: any;
  errors?: any;
  touched?: any
}

const TextInput: FC<TextInputProps> = ({ id, type, values, handleChange, handleBlur, placeholder, label, errors, touched }) => {

  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative">
        <input
          type={type ?? "text"}
          name={id}
          id={id}
          value={values[id]}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder ?? ""}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
        {errors[id] && touched[id] ? (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>) : null
        }
      </div>
      {errors[id] && touched[id] ? (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {errors[id]}
        </p>) : null
      }
    </>
  )
}

export default TextInput;