import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div>
      <h1>Page Not Found.</h1>
      <Link to={'/'}>Go Back To Home</Link>
    </div>
  )
}
