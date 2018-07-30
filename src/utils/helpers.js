export function* values(obj) {
  for (let prop of Object.keys(obj)) // own properties, you might use
                                     // for (let prop in obj)
      yield obj[prop];
}

export function computeValues(question) {
  let totOp1 = question.optionOne.votes.length
  let totOp2 = question.optionTwo.votes.length
  let total = totOp1 + totOp2
  let op1percent = Math.round((totOp1 * 100) / total)
  let op2percent = Math.round((totOp2 * 100) / total)

  return { totOp1, totOp2, op1percent, op2percent }
}