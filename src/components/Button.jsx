import React from 'react'

function Button({ action, text }) {
  return (
	<div onClick={action}>
		<button className="btn btn-primary">{text}</button>
	</div>
  )
}

export default Button