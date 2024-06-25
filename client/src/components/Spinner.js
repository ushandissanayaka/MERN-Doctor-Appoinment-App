import React from 'react'

function Spinner() {
  return (
   <div classname="d-flex justify-content-center spinner">
  <div classname="spinner-border" role="status">
    <span classname="visually-hidden">Loading...</span>
  </div>
</div>

  )
}

export default Spinner
