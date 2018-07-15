import React from 'react'
import './QuestionPreview.css'

export default function QuestionPreview(props) {
  console.log('PROPS', props)
  return (
    <div className='question-preview'>
      QuestionPreview
      <ul>
        <li>{props.question.id}</li>
        <li>{props.question.author}</li>
        <li>{props.question.optionOne.text}</li>
        <li>{props.question.optionTwo.text}</li>
      </ul>
      <button className='btn btn-dark btn-block'>View Poll</button>
    </div>
  )
}