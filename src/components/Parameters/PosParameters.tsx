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

export default function PosParameters() {
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
          label="These are values of parameters for minting a block."
          fontSize="sm"
        >
          <InfoOutlineIcon
            boxSize={5}
            justifyItems={'center'}
            color={useColorModeValue('light-theme', 'dark-theme')}
          />
        </Tooltip>
        <Heading size={'md'} fontWeight={'medium'}>
          Pos Parameters
        </Heading>
      </Flex>
      <SimpleGrid minChildWidth="200px" spacing="40px" pl={4}>
        <Skeleton isLoaded={true}>
          <Box>
            <Heading size="xs" fontWeight={'normal'}>
              Unbonding length
            </Heading>
            <Text pt="2" fontSize="lg" fontWeight={'medium'}>
              4
            </Text>
          </Box>
        </Skeleton>
        <Skeleton isLoaded={true}>
          <Box>
            <Heading size="xs" fontWeight={'normal'}>
              Cubic slashing window length
            </Heading>
            <Text pt="2" fontSize="lg" fontWeight={'medium'}>
              1
            </Text>
          </Box>
        </Skeleton>
        <Skeleton isLoaded={true}>
          <Box>
            <Heading size="xs" fontWeight={'normal'}>
              Max consensus validator slots
            </Heading>
            <Text pt="2" fontSize="lg" fontWeight={'medium'}>
              257
            </Text>
          </Box>
        </Skeleton>
        <Skeleton isLoaded={true}>
          <Box>
            <Heading size="xs" fontWeight={'normal'}>
              Validator stake threshold
            </Heading>
            <Text pt="2" fontSize="lg" fontWeight={'medium'}>
              1,000,000,000
            </Text>
          </Box>
        </Skeleton>
        <Skeleton isLoaded={true}>
          <Box>
            <Heading size="xs" fontWeight={'normal'}>
              Duplicate vote minimum slash rate
            </Heading>
            <Text pt="2" fontSize="lg" fontWeight={'medium'}>
              0.001
            </Text>
          </Box>
        </Skeleton>
        <Skeleton isLoaded={true}>
          <Box>
            <Heading size="xs" fontWeight={'normal'}>
              Block proposer reward
            </Heading>
            <Text pt="2" fontSize="lg" fontWeight={'medium'}>
              0.125
            </Text>
          </Box>
        </Skeleton>
      </SimpleGrid>
    </Box>
  )
}
