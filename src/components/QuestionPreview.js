import React from 'react'

export default function QuestionPreview(props) {
  console.log('PROPS', props)
  return (
    <div>
      QuestionPreview
      <ul>
        <li>{props.question.id}</li>
        <li>{props.question.author}</li>
        <li>{props.question.optionOne.text}</li>
        <li>{props.question.optionTwo.text}</li>
      </ul>
    </div>
  )
}