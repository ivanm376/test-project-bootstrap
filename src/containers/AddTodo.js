import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

const AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addTodo(input.value))
          input.value = ''
        }}
      >
        <div className="row">
          <label htmlFor="todoNameInput" className="form-label">
            Insert Todo name
          </label>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-9 mb-2">
            <input id="todoNameInput" className="form-control" ref={node => (input = node)} />
          </div>
          <div className="col-sm-12 col-md-3 mb-2 d-grid">
            <button type="submit" className="btn btn-success">
              Add Todo
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default connect()(AddTodo)
