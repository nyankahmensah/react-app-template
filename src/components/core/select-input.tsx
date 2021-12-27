import { FC } from "react";
import { upperFirst } from "lodash"

interface Option {
  label: string;
  value: string
}

interface SelectInputProps {
  id: string;
  label: string;
  placeholder?: string;
  values: any;
  handleChange: any;
  handleBlur: any;
  errors?: any;
  touched?: any
  options: (string | Option)[]
}

const SelectInput: FC<SelectInputProps> = ({id, options, values, handleChange, handleBlur, placeholder, label, errors, touched}) => {

  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <select
          name={id}
          id={id}
          value={values[id]}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder??""}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        >
          {options?.map((option, idx) => (
            <option key={idx} value={(option as Option)?.value??option}>{(option as Option)?.label??option}</option>
          ))}
        </select>
      </div>
      {errors[id] && touched[id] ? (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {errors[id]}
        </p>) : null
      }
    </>
  )
}

export default SelectInput;