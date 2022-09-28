
const graph = {
  start: {
    a: 6,
    b: 2
  },
  a: {
    fin: 1
  },
  b: {
    a: 3,
    fin: 5
  },
  fin: {}
}

const costs = {
  a: 6,
  b: 2,
  fin: Infinity
}

const parents = {
  a: 'start',
  b: 'start',
  fin: null
}

const processed = []

function findLowestCostNode(costs) {
  let lowestCost = Infinity
  let lowestCostNode = null
  for(let key in costs) {
    let cost = costs[key]
    if(cost < lowestCost && !(processed.indexOf(key) > -1) ) {
      lowestCost = cost
      lowestCostNode = key
    }
  }
  return lowestCostNode
}

let node = findLowestCostNode(costs)

// console.log(node)

while(node !== null) {
  const cost = costs[node]
  let neighbors = graph[node]
  for(let n in neighbors) {
    let newCost = cost + neighbors[n]
    if(costs[n] > newCost) {
      costs[n] = newCost
      parents[n] = node
    }
  }
  processed.push(node)
  node = findLowestCostNode(costs)
}

console.log(costs)
console.log(parents)