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
        <div class="row">
          <label htmlFor="todoNameInput" class="form-label">
            Insert Todo name
          </label>
        </div>
        <div class="row">
          <div class="col-sm-9">
            <input id="todoNameInput" class="form-control" ref={node => (input = node)} />
          </div>
          <button type="submit" class="btn btn-light col-sm-3">
            Add Todo
          </button>
        </div>
      </form>
    </div>
  )
}

export default connect()(AddTodo)
