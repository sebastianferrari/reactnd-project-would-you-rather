import React from 'react'
import { Link } from 'react-router-dom'
import './QuestionPreview.css'
import { 
  Table,
  Image
} from 'react-bootstrap'

export default function QuestionPreview(props) {
  return (
    <Table className='mainTable' responsive>
      <thead>
        <tr>
          <th colSpan='2'>{props.userFullName} asks:</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Image
              src={props.userAvatar}
              circle
              height={120} width={120}
            />
          </td>
          <td>
            <Table className='innerTable'>
              <tbody>
                <tr>
                  <td>Would Your Rather</td>
                </tr>
                <tr>
                  <td>...{props.question.optionOne.text}...</td>
                </tr>
                <tr>
                  <td>
                  <Link 
                    className='btn btn-primary'
                    to={`/question/${props.question.id}`}
                  >View Poll</Link>
                  </td>
                </tr>
              </tbody>
            </Table>
          </td>
        </tr>
      </tbody>
    </Table>
  )
}