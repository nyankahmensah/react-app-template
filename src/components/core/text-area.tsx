import { FC } from "react";

interface TextAreaProps {
  id: string;
  label: string;
  rows?: number;
  placeholder?: string;
  values: any;
  handleChange: any;
  handleBlur: any;
  errors?: any;
  touched?: any
}

const TextArea: FC<TextAreaProps> = ({id, rows, values, handleChange, handleBlur, placeholder, label, errors, touched }) => {

  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          name={id}
          id={id}
          value={values[id]}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder??""}
          rows={rows??3}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
          />
      </div>
      {errors[id] && touched[id] ? (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {errors[id]}
        </p>) : null
      }
    </>
  )
}

export default TextArea;