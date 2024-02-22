import Head from 'next/head'
import {
  Box,
  Divider,
  HStack,
  Heading,
  Icon,
  Link,
  useColorModeValue,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import { FiChevronRight, FiHome } from 'react-icons/fi'
import DataTable from '@/components/Datatable'
import { createColumnHelper } from '@tanstack/react-table'
import { getListValidator } from '@/rpc/query'

type ValidatorData = {
  address: string
  moniker: string
  tokens: string
  status: string
}

const columnHelper = createColumnHelper<ValidatorData>()

const columns = [
  columnHelper.accessor('address', {
    cell: (info) => info.getValue(),
    header: 'Address',
  }),
  columnHelper.accessor('moniker', {
    cell: (info) => info.getValue(),
    header: 'Moniker',
    meta: {
      isNumeric: true,
    },
  }),
  columnHelper.accessor('tokens', {
    cell: (info) => info.getValue(),
    header: 'VP',
    meta: {
      isNumeric: true,
    },
  }),
  columnHelper.accessor('status', {
    cell: (info) => info.getValue(),
    header: 'Status',
  }),
]

export default function Validators() {
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [total, setTotal] = useState(0)
  const [data, setData] = useState<ValidatorData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    setIsLoading(true)
    const url = process.env.REACT_APP_EXTERNAL_RPC
    const token = process.env.REACT_APP_TOKEN
    getListValidator(url!, token!)
      .then((data) => {
        setTotal(data?.length)
        setData(data)
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
  }, [page, perPage])

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
        <title>Blocks | Namada Validator</title>
        <meta name="description" content="Blocks | Namada" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HStack h="24px">
          <Heading size={'md'}>Validators</Heading>
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
          <Text>Validators</Text>
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
            data={data}
            total={total}
            isLoading={isLoading}
            onChangePagination={onChangePagination}
          />
        </Box>
      </main>
    </>
  )
}
