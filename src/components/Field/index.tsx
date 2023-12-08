import {RefObject, HTMLInputTypeAttribute, InputHTMLAttributes} from 'react';

import styles from './index.module.css'

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
  <label className={styles.wrappingLabel}>
    <span className={styles.label}>{label}</span>
    <input 
      className={styles.input} 
      ref={_ref} 
      onChange={({target: {value}}) => setValue(value)} 
      value={value} {...rest} 
    /> 
    <p className={styles.description}>{description}</p>
  </label> 
)
