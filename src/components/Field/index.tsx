import {RefObject, HTMLInputTypeAttribute, InputHTMLAttributes} from 'react';
export const Field = <T,>({
  _ref,
  label,
  description,
  type = 'text', 
  value,
  setValue = (_: string) => {},
  ...rest
}:{
  _ref?: RefObject<HTMLInputElement>,
  label?: string,
  description?: string,
  type?: HTMLInputTypeAttribute,
  value?: T,
  setValue?: (_: string) => void,
} & InputHTMLAttributes<HTMLInputElement>)  => (
  <label>
    <span>{label}</span>
    <input ref={_ref} onChange={({target: {value}}) => setValue(value)} value={value} {...rest} /> 
    <span>{description}</span>
  </label> 
)
