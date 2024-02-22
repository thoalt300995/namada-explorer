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

export default function ProtocolParameters() {
  return (
    <Box
      mt={6}
      bg={useColorModeValue('light-container', 'dark-container')}
      shadow={'base'}
      borderRadius={4}
      p={6}
    >
      <Flex mb={8} alignItems={'center'} gap={2}>
        <Tooltip
          label="These are values of parameters when a validator proposes a block."
          fontSize="sm"
        >
          <InfoOutlineIcon
            boxSize={5}
            justifyItems={'center'}
            color={useColorModeValue('light-theme', 'dark-theme')}
          />
        </Tooltip>
        <Heading size={'md'} fontWeight={'medium'}>
          Protocol Parameters
        </Heading>
      </Flex>
      <SimpleGrid minChildWidth="200px" spacing="40px" pl={4}>
        <Skeleton isLoaded={true}>
          <Box>
            <Heading size="xs" fontWeight={'normal'}>
              Min epoch duration
            </Heading>
            <Text pt="2" fontSize="lg" fontWeight={'medium'}>
              43200
            </Text>
          </Box>
        </Skeleton>
        <Skeleton isLoaded={true}>
          <Box>
            <Heading size="xs" fontWeight={'normal'}>
              Min number of blocks
            </Heading>
            <Text pt="2" fontSize="lg" fontWeight={'medium'}>
              3600
            </Text>
          </Box>
        </Skeleton>
        <Skeleton isLoaded={true}>
          <Box>
            <Heading size="xs" fontWeight={'normal'}>
              Max bock duration
            </Heading>
            <Text pt="2" fontSize="lg" fontWeight={'medium'}>
              20
            </Text>
          </Box>
        </Skeleton>
        <Skeleton isLoaded={true}>
          <Box>
            <Heading size="xs" fontWeight={'normal'}>
              Max block gas
            </Heading>
            <Text pt="2" fontSize="lg" fontWeight={'medium'}>
              5000000
            </Text>
          </Box>
        </Skeleton>
        <Skeleton isLoaded={true}>
          <Box>
            <Heading size="xs" fontWeight={'normal'}>
              Fee unshielding gas limit
            </Heading>
            <Text pt="2" fontSize="lg" fontWeight={'medium'}>
              20000
            </Text>
          </Box>
        </Skeleton>
        <Skeleton isLoaded={true}>
          <Box>
            <Heading size="xs" fontWeight={'normal'}>
              Fee unshielding descriptions limit
            </Heading>
            <Text pt="2" fontSize="lg" fontWeight={'medium'}>
              15
            </Text>
          </Box>
        </Skeleton>
      </SimpleGrid>
    </Box>
  )
}
