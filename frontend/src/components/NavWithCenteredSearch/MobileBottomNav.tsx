import { Box, SimpleGrid, useColorModeValue as mode } from '@chakra-ui/react'
import { items } from './NavItemIcons'
import { CartCount } from './CartCount'
import { NavAction } from './NavAction'
import { useSelector } from 'react-redux'

export const MobileBottomNav = (prop: any) => {
  const { list } = useSelector(({ cart }: any) => cart);
  const { onClick } = prop
  return (
    <Box
      bg={mode('white', 'gray.800')}
      pos="fixed"
      width="full"
      bottom="env(safe-area-inset-bottom)"
      borderTopWidth="1px"
      display={{ lg: 'none' }}
    >
      <SimpleGrid columns={4} padding="2">
        <NavAction.Mobile {...items.cart} isActive onClick={onClick}>
          {list.length > 0 && <CartCount right="-2">{list.length}</CartCount>}
        </NavAction.Mobile>
        <NavAction.Mobile {...items.search} />
        <NavAction.Mobile {...items.user} />
        <NavAction.Mobile {...items.register} />
      </SimpleGrid>
    </Box>
  )
}
