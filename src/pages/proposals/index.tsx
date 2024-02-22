import Head from 'next/head'
import {
  Box,
  Divider,
  HStack,
  Heading,
  Icon,
  Link,
  Text,
  useToast,
  useColorModeValue,
  Tag,
  Badge,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import NextLink from 'next/link'
import { FiChevronRight, FiHome } from 'react-icons/fi'
import { selectTmClient } from '@/store/connectSlice'
import DataTable from '@/components/Datatable'
import { createColumnHelper } from '@tanstack/react-table'
import { getProposals } from '@/rpc/query'

type Proposal = {
  proposal_id: number
  author: string
  title: string
  type: string
  start_epoch: number
  end_epoch: number
}

const columnHelper = createColumnHelper<Proposal>()

const columns = [
  columnHelper.accessor('proposal_id', {
    cell: (info) => `#${info.getValue()}`,
    header: '#ID',
  }),
  columnHelper.accessor('author', {
    cell: (info) => `${info.getValue()}`,
    header: 'Author',
  }),
  columnHelper.accessor('start_epoch', {
    cell: (info) => info.getValue(),
    header: 'Start Epoch',
  }),
  columnHelper.accessor('end_epoch', {
    cell: (info) => info.getValue(),
    header: 'End Epoch',
  }),
  columnHelper.accessor('type', {
    cell: (info) => info.getValue(),
    header: 'Types',
  }),
]

export default function Proposals() {
  const tmClient = useSelector(selectTmClient)
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [total, setTotal] = useState(0)
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    if (tmClient) {
      setIsLoading(true)
      const url = process.env.REACT_APP_EXTERNAL_RPC
      const token = process.env.REACT_APP_TOKEN
      getProposals(url!, token!)
        .then((data) => {
          setTotal(data?.length)
          setProposals(data)
          setIsLoading(false)
        })
        .catch((e) => {
          toast({
            title: 'Failed to fetch datatable',
            description: '',
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        })
    }
  }, [tmClient, page, perPage])

  const onChangePagination = (value: {
    pageIndex: number
    pageSize: number
  }) => {
    setPage(value.pageIndex)
    setPerPage(value.pageSize)
  }

  return (
    <>
      <Head>
        <title>Proposals | Namada</title>
        <meta name="description" content="Proposals | Namada" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HStack h="24px">
          <Heading size={'md'}>Proposals</Heading>
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
          <Text>Proposals</Text>
        </HStack>
        <Box
          mt={8}
          bg={useColorModeValue('light-container', 'dark-container')}
          shadow={'base'}
          borderRadius={4}
          p={4}
        >
          <DataTable
            columns={columns}
            data={proposals}
            total={total}
            isLoading={isLoading}
            onChangePagination={onChangePagination}
          />
        </Box>
      </main>
    </>
  )
}
