export const LS_RPC_ADDRESS = process.env.REACT_APP_RPC
export const LS_INDEXER_ADDRESS = process.env.REACT_APP_INDEXER
export const API_INDEXER_BLOCK_HEIGHT = '/block/height/'
export const API_INDEXER_BLOCK_HASH = '/block/hash/'
export const API_INDEXER_TX_HASH = '/tx/'

export const API_VALIDATOR = '/validators'
export const API_PROPOSAL = '/proposals'

export const GOV_PARAMS_TYPE = {
  VOTING: 'voting',
  DEPOSIT: 'deposit',
  TALLY: 'tallying',
}

export type proposalStatus = {
  id: number
  status: string
  color: string
}
export const proposalStatusList: proposalStatus[] = [
  {
    id: 0,
    status: 'UNSPECIFIED',
    color: 'gray',
  },
  {
    id: 1,
    status: 'DEPOSIT PERIOD',
    color: 'blue',
  },
  {
    id: 2,
    status: 'VOTING PERIOD',
    color: 'blue',
  },
  {
    id: 3,
    status: 'PASSED',
    color: 'green',
  },
  {
    id: 4,
    status: 'REJECTED',
    color: 'red',
  },
  {
    id: 5,
    status: 'FAILED',
    color: 'red',
  },
]
