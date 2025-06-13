import { Select, SelectProps, useColorModeValue } from '@chakra-ui/react'
import { FIRST_PAGE } from 'commons/consts';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { createQuery, usePath } from 'utils/link';

const sortByOptions = {
  defaultValue: 'best-seller',
  options: [
    { label: 'Best Seller', value: 'best-seller' },
    { label: 'Best Match', value: 'best-match' },
    { label: 'Price: Low to High', value: 'low-to-high' },
    { label: 'Price: High to Low', value: 'high-to-low' },
  ],
}

export const SortbySelect = (props: SelectProps) => {
  const { productTag } = useSelector(({ common }: any) => common);
    const router = useRouter();
    const { params } = usePath();
  
  const initialValue = [
    { label: 'all', value: 'all' },
  ]

  const onChangeHandler = (e: any) => {
    if (e.target.value === 'all') {
      delete params['tag'];
      router.push(`${router.pathname}?${createQuery({ ...params, page: FIRST_PAGE })}`);
    } else {
      router.push(`${router.pathname}?${createQuery({ ...params, tag: e.target.value, page: FIRST_PAGE })}`);
    }
  }
  return (
    <Select
      size="sm"
      aria-label="Sort by"
      defaultValue={params && params['tag'] ? params['tag'] : 'all'}
      focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
      rounded="md"
      onChange={onChangeHandler}
      {...props}
    >
      {[...initialValue, ...productTag].map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  )
  
}