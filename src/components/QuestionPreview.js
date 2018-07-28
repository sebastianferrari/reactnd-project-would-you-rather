import React from 'react'
import { Link } from 'react-router-dom'
//import './QuestionPreview.css'

export default function QuestionPreview(props) {
  console.log('PROPS', props)
  return (
    <div className='question-preview'>
      <div className='question-preview-header'>
        {props.userFullName} asks:
      </div>
      <div>
        <img 
          src={props.userAvatar} 
          alt={props.userFullName}
        />
      </div>
      <p>
        Would Your Rather
      </p>
      <p>
        ...{props.question.optionOne.text}...
      </p>
      <Link 
        className='btn btn-dark'
        to={`/question/${props.question.id}`}
      >View Poll</Link>
    </div>
  )
}