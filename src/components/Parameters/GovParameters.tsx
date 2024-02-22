import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Skeleton,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'

export default function GovParameters() {
  return (
    <Box
      mt={6}
      bg={useColorModeValue('light-container', 'dark-container')}
      shadow={'base'}
      borderRadius={4}
      p={6}
      hidden={false}
    >
      <Flex mb={8} alignItems={'center'} gap={2}>
        <Tooltip
          label="These are values of parameters for governance proposal."
          fontSize="sm"
        >
          <InfoOutlineIcon
            boxSize={5}
            justifyItems={'center'}
            color={useColorModeValue('light-theme', 'dark-theme')}
          />
        </Tooltip>
        <Heading size={'md'} fontWeight={'medium'}>
          Governance Parameters
        </Heading>
      </Flex>
      <SimpleGrid minChildWidth="200px" spacing="40px" pl={4}>
        <Skeleton isLoaded={true}>
          <Box>
            <Heading size="xs" fontWeight={'normal'}>
              Min Proposal fund
            </Heading>
            <Text pt="2" fontSize="lg" fontWeight={'medium'}>
              5000
            </Text>
          </Box>
        </Skeleton>
        <Skeleton isLoaded={true}>
          <Box>
            <Heading size="xs" fontWeight={'normal'}>
              Max Deposit code size
            </Heading>
            <Text pt="2" fontSize="lg" fontWeight={'medium'}>
              600000
            </Text>
          </Box>
        </Skeleton>
        <Skeleton isLoaded={true}>
          <Box>
            <Heading size="xs" fontWeight={'normal'}>
              Min proposal voting period
            </Heading>
            <Text pt="2" fontSize="lg" fontWeight={'medium'}>
              2
            </Text>
          </Box>
        </Skeleton>
        <Skeleton isLoaded={true}>
          <Box>
            <Heading size="xs" fontWeight={'normal'}>
              Max proposal period
            </Heading>
            <Text pt="2" fontSize="lg" fontWeight={'medium'}>
              6
            </Text>
          </Box>
        </Skeleton>
        <Skeleton isLoaded={true}>
          <Box>
            <Heading size="xs" fontWeight={'normal'}>
              Max proposal content size
            </Heading>
            <Text pt="2" fontSize="lg" fontWeight={'medium'}>
              10000
            </Text>
          </Box>
        </Skeleton>
        <Skeleton isLoaded={true}>
          <Box>
            <Heading size="xs" fontWeight={'normal'}>
              Min proposal grace epochs
            </Heading>
            <Text pt="2" fontSize="lg" fontWeight={'medium'}>
              2
            </Text>
          </Box>
        </Skeleton>
      </SimpleGrid>
    </Box>
  )
}
