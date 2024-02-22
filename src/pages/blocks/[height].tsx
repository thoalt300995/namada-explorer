import {
  Box,
  Divider,
  HStack,
  Heading,
  Icon,
  Link,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { FiChevronRight, FiHome } from 'react-icons/fi'
import NextLink from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { timeFromNow, displayDate } from '@/utils/helper'
import { BlockFormat, getBlock } from '@/rpc/query'

export default function DetailBlock() {
  const router = useRouter()
  const toast = useToast()
  const { height } = router.query
  const [block, setBlock] = useState<BlockFormat | null>(null)

  type Tx = {
    txType: string;
    hash_id: string;
  };

  const [txs, setTxs] = useState<Tx[]>([])

  useEffect(() => {
    if (height) {
      const url = process.env.REACT_APP_INDEXER
      getBlock(url!, parseInt(height as string, 10))
        .then(setBlock)
        .catch(showError)
    }
  }, [height])

  useEffect(() => {
    if (block?.txs.length && !txs.length) {
      for (const tx of block.txs) {
        setTxs((prevTxs) => [
          ...prevTxs,
          {
            txType: tx.tx_type,
            hash_id: tx.hash_id,
          },
        ])
      }
    }
  }, [block])

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
        <title>Detail Block | Namada</title>
        <meta name="description" content="Block | Namada" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HStack h="24px">
          <Heading size={'md'}>Block</Heading>
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
            <Text color={useColorModeValue('light-theme', 'dark-theme')}>
              Blocks
            </Text>
          </Link>
          <Icon fontSize="16" as={FiChevronRight} />
          <Text>Block #{height}</Text>
        </HStack>
        <Box
          mt={8}
          bg={useColorModeValue('light-container', 'dark-container')}
          shadow={'base'}
          borderRadius={4}
          p={4}
        >
          <Heading size={'md'} mb={4}>
            Header
          </Heading>
          <Divider borderColor={'gray'} mb={4} />
          <TableContainer>
            <Table variant="unstyled" size={'sm'}>
              <Tbody>
                <Tr>
                  <Td pl={0} width={150}>
                    <b>Chain Id</b>
                  </Td>
                  <Td>{block?.chainId}</Td>
                </Tr>
                <Tr>
                  <Td pl={0} width={150}>
                    <b>Height</b>
                  </Td>
                  <Td>{block?.height}</Td>
                </Tr>
                <Tr>
                  <Td pl={0} width={150}>
                    <b>Block Time</b>
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
                    <b>Block Hash</b>
                  </Td>
                  <Td>{block?.blockHash}</Td>
                </Tr>
                <Tr>
                  <Td pl={0} width={150}>
                    <b>Number of Tx</b>
                  </Td>
                  <Td>{block?.txs.length}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        <Box
          mt={8}
          bg={useColorModeValue('light-container', 'dark-container')}
          shadow={'base'}
          borderRadius={4}
          p={4}
        >
          <Heading size={'md'} mb={4}>
            Transactions
          </Heading>
          <Divider borderColor={'gray'} mb={4} />
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Tx Hash</Th>
                  <Th>Tx Type</Th>
                </Tr>
              </Thead>
              <Tbody>
                {txs.map((tx) => (
                  <Tr key={tx.hash_id}>
                    <Td>
                      <Link
                        as={NextLink}
                        href={'/txs/' + tx.hash_id.toUpperCase()}
                        style={{ textDecoration: 'none' }}
                        _focus={{ boxShadow: 'none' }}
                      >
                        <Text color={'cyan.400'}>{tx.hash_id}</Text>
                      </Link>
                    </Td>
                    <Td>{tx.txType}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </main>
    </>
  )
}
