import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  HStack,
  Heading,
  Icon,
  Link,
  Table,
  TableContainer,
  Tag,
  TagLabel,
  TagLeftIcon,
  Tbody,
  Td,
  Text,
  Tr,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { FiChevronRight, FiHome, FiCheck, FiX } from 'react-icons/fi'
import NextLink from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  BlockFormat,
  getBlock,
  getBlockByHash,
  getTransaction,
} from '@/rpc/query'

import { timeFromNow, displayDate, isBech32Address } from '@/utils/helper'

export default function DetailBlock() {
  const router = useRouter()
  const toast = useToast()
  const { hash } = router.query
  const [tx, setTx] = useState<any | null>(null)
  const [block, setBlock] = useState<BlockFormat | null>(null)

  useEffect(() => {
    if (hash) {
      const url = process.env.REACT_APP_INDEXER
      getTransaction(url!, hash as string)
        .then(setTx)
        .catch(showError)
    }
  }, [hash])

  useEffect(() => {
    if (tx?.block_id) {
      const url = process.env.REACT_APP_INDEXER
      getBlockByHash(url!, tx?.block_id).then(setBlock).catch(showError)
    }
  }, [tx])

  const showError = (err: Error) => {
    const errMsg = err.message
    let error = null
    try {
      error = JSON.parse(errMsg)
    } catch (e) {
      error = {
        message: 'Invalid',
        data: errMsg,
      }
    }

    toast({
      title: error.message,
      description: error.data,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <>
      <Head>
        <title>Detail Transaction | Namada</title>
        <meta name="description" content="Txs | Namada" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HStack h="24px">
          <Heading size={'md'}>Transaction</Heading>
          <Divider borderColor={'gray'} size="10px" orientation="vertical" />
          <Link
            as={NextLink}
            href={'/'}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
            display="flex"
            justifyContent="center"
          >
            <Icon
              fontSize="16"
              color={useColorModeValue('light-theme', 'dark-theme')}
              as={FiHome}
            />
          </Link>
          <Icon fontSize="16" as={FiChevronRight} />
          <Link
            as={NextLink}
            href={'/blocks'}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
          >
            <Text color={'cyan.400'}>Blocks</Text>
          </Link>
          <Icon fontSize="16" as={FiChevronRight} />
          <Text>Tx</Text>
        </HStack>
        <Box
          mt={8}
          bg={useColorModeValue('light-container', 'dark-container')}
          shadow={'base'}
          borderRadius={4}
          p={4}
        >
          <Heading size={'md'} mb={4}>
            Information
          </Heading>
          <Divider borderColor={'gray'} mb={4} />
          <TableContainer>
            <Table variant="unstyled" size={'sm'}>
              <Tbody>
                <Tr>
                  <Td pl={0} width={150}>
                    <b>Chain ID</b>
                  </Td>
                  <Td>{block?.chainId}</Td>
                </Tr>
                <Tr>
                  <Td pl={0} width={150}>
                    <b>Tx Hash</b>
                  </Td>
                  <Td>{tx?.hash}</Td>
                </Tr>
                <Tr>
                  <Td pl={0} width={150}>
                    <b>Height</b>
                  </Td>
                  <Td>
                    <Link
                      as={NextLink}
                      href={'/blocks/' + block?.height}
                      style={{ textDecoration: 'none' }}
                      _focus={{ boxShadow: 'none' }}
                    >
                      <Text color={'cyan.400'}>{block?.height}</Text>
                    </Link>
                  </Td>
                </Tr>
                <Tr>
                  <Td pl={0} width={150}>
                    <b>Time</b>
                  </Td>
                  <Td>
                    {block?.blockTime
                      ? `${timeFromNow(block?.blockTime)} ( ${displayDate(
                          block?.blockTime
                        )} )`
                      : ''}
                  </Td>
                </Tr>
                <Tr>
                  <Td pl={0} width={150}>
                    <b>Fee</b>
                  </Td>
                  <Td>{tx?.fee_amount_per_gas_unit}</Td>
                </Tr>
                <Tr>
                  <Td pl={0} width={150}>
                    <b>Gas (used / wanted)</b>
                  </Td>
                  <Td>{tx?.gas_limit_multiplier}</Td>
                </Tr>
                <Tr>
                  <Td pl={0} width={150}>
                    <b>data</b>
                  </Td>
                  <Td>{tx?.data}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

      </main>
    </>
  )
}
