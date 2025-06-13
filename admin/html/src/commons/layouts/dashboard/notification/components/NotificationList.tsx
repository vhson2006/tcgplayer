import { Stack, StackDivider, Box, Text, HStack, Avatar, AvatarBadge, SkeletonText } from "@chakra-ui/react"
import { FIRST_PAGE, PAGE_SIZE } from "commons/config";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "commons/layouts/dashboard/notification/slice";
import InfiniteScroll from "react-infinite-scroller"

const NotificationList = (props: any) => {
  const dispatch = useDispatch();
  const { isRequesting, list, total, page } = useSelector((state: any) => state.notificationReducer);

  const fetchItems = useCallback(async () => {
    if (isRequesting) {
      return;
    }
    if (page === 0) {
      dispatch(actions.GET_LIST_ASYNC({ page: FIRST_PAGE }));
    }
    if (page * PAGE_SIZE < total) {
      dispatch(actions.GET_LIST_ASYNC({ page: page + 1 }))
    }
  }, [isRequesting, page, total]) 

  const hasMoreItems = page * PAGE_SIZE < total || page === 0

  const loader = (
    <Box key={Math.random()} padding='2'>
      <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />
    </Box>
  );
  
  return (
    <InfiniteScroll loadMore={fetchItems} hasMore={hasMoreItems} loader={loader}>
      <Box bg="bg.surface" maxHeight={500} overflowY={'scroll'}>
        <Stack divider={<StackDivider />} >
          {list.map((member: any, idx: number) => (
            <Stack key={`${member.id}-${idx}`} fontSize="sm" px="4" >
              <Stack direction="row" justify="space-between" spacing="4">
                <HStack spacing="3">
                  <Avatar src={member.avatarUrl} boxSize="10">
                    <AvatarBadge boxSize="4" bg={member.status === 'active' ? 'success' : 'subtle'} />
                  </Avatar>
                  <Box>
                    <Text fontWeight="medium" color="fg.emphasized">
                      {member.name}
                    </Text>
                    <Text color="fg.muted">{member.handle}</Text>
                  </Box>
                </HStack>
                <Text color="fg.muted">{member.lastSeen}</Text>
              </Stack>
              <Text color="fg.muted">Candy donut tart pudding macaroon. </Text>
            </Stack>
          ))}
        </Stack>
      </Box>
    </InfiniteScroll>
  )
}

export default NotificationList