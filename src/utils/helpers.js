export function* values(obj) {
  for (let prop of Object.keys(obj)) // own properties, you might use
                                     // for (let prop in obj)
      yield obj[prop];
}