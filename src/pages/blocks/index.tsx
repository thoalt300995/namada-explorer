import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NewBlockEvent, TxEvent } from '@cosmjs/tendermint-rpc'
import {
  Box,
  Divider,
  HStack,
  Heading,
  Icon,
  Link,
  Table,
  useColorModeValue,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tag,
  TagLeftIcon,
  TagLabel,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { FiChevronRight, FiHome, FiCheck, FiX } from 'react-icons/fi'
import { selectNewBlock, selectTxEvent } from '@/store/streamSlice'
import { toHex } from '@cosmjs/encoding'
import { TxBody } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { timeFromNow, trimHash, getTypeMsg } from '@/utils/helper'

const MAX_ROWS = 20

interface Tx {
  TxEvent: TxEvent
  Timestamp: Date
}

export default function Blocks() {
  const newBlock = useSelector(selectNewBlock)
  const [blocks, setBlocks] = useState<NewBlockEvent[]>([])


  useEffect(() => {
    if (newBlock) {
      updateBlocks(newBlock)
    }
  }, [newBlock])

  const updateBlocks = (block: NewBlockEvent) => {
    if (blocks.length) {
      if (block.header.height > blocks[0].header.height) {
        setBlocks((prevBlocks) => [block, ...prevBlocks.slice(0, MAX_ROWS - 1)])
      }
    } else {
      setBlocks([block])
    }
  }


  const renderMessages = (data: Uint8Array | undefined) => {
    if (data) {
      const txBody = TxBody.decode(data)
      const messages = txBody.messages

      if (messages.length == 1) {
        return (
          <HStack>
            <Tag colorScheme="cyan">{getTypeMsg(messages[0].typeUrl)}</Tag>
          </HStack>
        )
      } else if (messages.length > 1) {
        return (
          <HStack>
            <Tag colorScheme="cyan">{getTypeMsg(messages[0].typeUrl)}</Tag>
            <Text textColor="cyan.800">+{messages.length - 1}</Text>
          </HStack>
        )
      }
    }

    return ''
  }

  return (
    <>
      <Head>
        <title>Blocks | Namada</title>
        <meta name="description" content="Blocks | Namada" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HStack h="24px">
          <Heading size={'md'}>Blocks</Heading>
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
          <Text>Blocks</Text>
        </HStack>
        <Box
          mt={8}
          bg={useColorModeValue('light-container', 'dark-container')}
          shadow={'base'}
          borderRadius={4}
          p={4}
        >
          <Tabs variant="unstyled">
            <TabList>
              <Tab
                _selected={{ color: 'white', bg: 'cyan.400' }}
                borderRadius={5}
              >
                Blocks
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Height</Th>
                        <Th>App Hash</Th>
                        <Th>Txs</Th>
                        <Th>Time</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {blocks.map((block) => (
                        <Tr key={block.header.height}>
                          <Td>
                            <Link
                              as={NextLink}
                              href={'/blocks/' + block.header.height}
                              style={{ textDecoration: 'none' }}
                              _focus={{ boxShadow: 'none' }}
                            >
                              <Text color={'cyan.400'}>
                                {block.header.height}
                              </Text>
                            </Link>
                          </Td>
                          <Td noOfLines={1}>{toHex(block.header.appHash)}</Td>
                          <Td>{block.txs.length}</Td>
                          <Td>
                            {timeFromNow(block.header.time.toISOString())}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </main>
    </>
  )
}
