import React from 'react'
import './QuestionPreview.css'

export default function QuestionPreview(props) {
  console.log('PROPS', props)
  return (
    <div className='question-preview'>
      <div className='question-preview-header'>
        {props.userFullName} asks:
      </div>
      <div>
        <img src={props.userAvatar} />
      </div>
      <p>
        Would Your Rather
      </p>
      <p>
        ...{props.question.optionOne.text}...
      </p>
      <button className='btn btn-dark'>View Poll</button>
    </div>
  )
}