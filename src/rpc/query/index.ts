import {
  Account,
  Block,
  Coin,
  IndexedTx,
  StargateClient,
} from '@cosmjs/stargate'
import {
  Tendermint34Client,
  TxSearchResponse,
  ValidatorsResponse,
} from '@cosmjs/tendermint-rpc'

import {
  API_INDEXER_BLOCK_HASH,
  API_INDEXER_BLOCK_HEIGHT,
  API_INDEXER_TX_HASH,
  API_PROPOSAL,
  API_VALIDATOR,
} from '../../utils/constant'

export interface BlockFormat {
  chainId: string
  height: string
  blockTime: string
  blockHash: string
  numberOfTx: string
  txs: []
}

async function fetchWithTimeout(
  resource: string,
  options: RequestInit & { timeout?: number } = {},
  auth: string
) {
  const { timeout = 8000 } = options

  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  let  response;
  if (auth.length > 1){
    response = await fetch(resource, {
      ...options,
      signal: controller.signal,
      headers: {
        Authorization: 'Bearer ' + auth,
      },
    })
  }else {
    response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    })
  }

  clearTimeout(id)
  return response
}

export const formatBlockData = (block: any) => ({
  chainId: block.header.chain_id,
  height: block.header.height,
  blockTime: block.header.time,
  blockHash: block.block_id,
  numberOfTx: block.tx_hashes.length,
  txs: block.tx_hashes,
})

export const getBlock = async (url: string, blockNumber: number) => {
  const emptyData = {
    chainId: '',
    height: '',
    blockTime: '',
    blockHash: '',
    numberOfTx: '',
    txs: [],
  }
  try {
    const urlFetchBlock = url + API_INDEXER_BLOCK_HEIGHT + blockNumber
    const response = await fetchWithTimeout(
      urlFetchBlock,
      {
        method: 'GET',
        timeout: 10000,
      },
      ''
    )
    let data = await response.json()
    if (data != undefined) {
      data = formatBlockData(data)
    } else {
      data = emptyData
    }
    return data
  } catch (e) {
    console.log('error to fetch block data ' + e)
    return emptyData
  }
}

export const getBlockByHash = async (url: string, blockHash: string) => {
  const emptyData = {
    chainId: '',
    height: '',
    blockTime: '',
    blockHash: '',
    numberOfTx: '',
    txs: [],
  }
  try {
    const urlFetchBlock = url + API_INDEXER_BLOCK_HASH + blockHash
    const response = await fetchWithTimeout(
      urlFetchBlock,
      {
        method: 'GET',
        timeout: 10000,
      },
      ''
    )
    let data = await response.json()
    if (data != undefined) {
      data = formatBlockData(data)
    } else {
      data = emptyData
    }
    return data
  } catch (e) {
    console.log('error to fetch block hash ' + e)
    return emptyData
  }
}

export const getListValidator = async (url: string, token: string) => {
  const emptyData = [
    {
      address: '',
      moniker: '',
      tokens: '',
      lgo: '',
      status: '',
    },
  ]
  try {
    const urlFetchValidator = url + API_VALIDATOR
    const response = await fetchWithTimeout(
      urlFetchValidator,
      {
        method: 'GET',
        timeout: 10000,
      },
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDcwODQzNjMsImV4cCI6MTcxNzQ1MjM2M30.4Fk2-GpkRKK7SiTN4AgpmLUWUGTidBDYcIe-U_tacaE'
    )
    let data = await response.json()
    if (data.data?.validators != undefined) {
      data = data.data?.validators
    } else {
      data = emptyData
    }
    return data
  } catch (e) {
    console.log('error to fetch validator ' + e)
    return emptyData
  }
}

export const getTransaction = async (url: string, txHash: string) => {
  const emptyData = [
    {
      hash: '',
      block_id: '',
      tx_type: '',
      wrapper_id: '',
      fee_amount_per_gas_unit: null,
      fee_token: null,
      gas_limit_multiplier: null,
      code: '',
      data: '',
      tx: null,
    },
  ]
  try {
    const fetchTxhash = url + API_INDEXER_TX_HASH + txHash
    const response = await fetchWithTimeout(
      fetchTxhash,
      {
        method: 'GET',
        timeout: 10000,
      },
      ''
    )
    let data = await response.json()
    if (data == undefined) {
      data = emptyData
    }
    return data
  } catch (e) {
    console.log('error to fetch block data ' + e)
    return emptyData
  }
}

export const getProposals = async (url: string, token: string) => {
  const emptyData = [
    {
      address: '',
      moniker: '',
      tokens: '',
      lgo: '',
      status: '',
    },
  ]
  try {
    const urlFetchValidator = url + API_PROPOSAL
    const response = await fetchWithTimeout(
      urlFetchValidator,
      {
        method: 'GET',
        timeout: 10000,
      },
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDcwODQzNjMsImV4cCI6MTcxNzQ1MjM2M30.4Fk2-GpkRKK7SiTN4AgpmLUWUGTidBDYcIe-U_tacaE'
    )
    let data = await response.json()
    if (data.data?.proposals != undefined) {
      data = data.data?.proposals
    } else {
      data = emptyData
    }
    return data
  } catch (e) {
    console.log('error to fetch block data ' + e)
    return emptyData
  }
}

export async function getValidators(
  tmClient: Tendermint34Client
): Promise<ValidatorsResponse> {
  return tmClient.validatorsAll()
}