import React from 'react'

import Button from './Button';

function NumberForm({onSubmit, newName, newNumber, handleNameChange, handleNumberChange}) {
  return (
    <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <Button text={'add'} type={'submit'}  />
        </div>
      </form>
  )
}

export default NumberForm