import React from 'react'
import './input.css';
import { FiSearch } from 'react-icons/fi';

//props
const Input = ({text, submit, fun}) => {
  return (
    <div>
        <form className='input' onSubmit={submit}>
            <input type='text' placeholder='Please enter the location' className='input_value' onChange={text}/>
            <span className='input-icon' onClick={fun}>
            <FiSearch/>
            </span>
        </form>
    </div>
  )
}

export default Input