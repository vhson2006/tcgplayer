import { PAGE_SIZE, common } from "commons/config";
import { sliceIntoChunks } from "utils/array";

const data = [
  {
    id: '1',
    name: 'Christian Nwamba',
    handle: '@christian',
    avatarUrl: '/logo192.png',
    status: 'active',
    message: 'Some message',
    lastSeen: 'just now',
  },
  {
    id: '2',
    name: 'Kent C. Dodds',
    handle: '@kent',
    avatarUrl: '/logo192.png',
    status: 'active',
    message: 'Some message',
    lastSeen: '2hr ago',
  },
  {
    id: '3',
    name: 'Prosper Otemuyiwa',
    handle: '@prosper',
    avatarUrl: '/logo192.png',
    status: 'active',
    message: 'Some message',
    lastSeen: '3hr ago',
  },
  {
    id: '4',
    name: 'Ryan Florence',
    handle: '@ryan',
    avatarUrl: '/logo192.png',
    status: 'active',
    message: 'Some message',
    lastSeen: '4hr ago',
  },
  {
    id: '5',
    name: 'Segun Adebayo',
    handle: '@segun',
    avatarUrl: '/logo192.png',
    status: 'inactive',
    message: 'Some message',
    lastSeen: '5hr ago',
  },
]
export const fetchNotification = async (query: any) => {
  const { page } = query;
  
  return {
    status: common.CORRECT,
    total: data.length,
    page: page,
    size: PAGE_SIZE,
    data: ((page -1 ) * PAGE_SIZE) <= data.length ? sliceIntoChunks(data, PAGE_SIZE)[page - 1] : []
  };
}