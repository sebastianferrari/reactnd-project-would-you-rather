import React from 'react'
import {
  Table, Image
} from 'react-bootstrap'
import './LeaderBoardItem.css'

const LeaderBoardItem = ({ user }) => {
  let questionQty = user.questions.length
  let answerQty = Object.keys(user.answers).length
  let total = questionQty + answerQty

  const scoreTable = (
    <Table id='score-table'>
      <tbody>
        <tr>
          <td>Score</td>
        </tr>
        <tr>
          <td>{total}</td>
        </tr>
      </tbody>
    </Table>
  )

  const infoTable = (
    <Table id='info-table'>
      <tbody>
        <tr>
          <td>
            <Image
              src={user.avatarURL}
              height={100} width={100}
              circle
              alt={user.name}
            />
          </td>
          <td>
            <div>Answered Questions: <strong>{answerQty}</strong></div>
            <div>Created Questions: <strong>{questionQty}</strong></div>
          </td>
          <td>
            {scoreTable}
          </td>
        </tr>
      </tbody>
    </Table>
  )

  return (
    <Table id='item-table'>
      <thead>
        <tr>
          <th>{user.name}:</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {infoTable}
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export default LeaderBoardItem