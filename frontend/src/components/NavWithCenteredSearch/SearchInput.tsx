import { effect, Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri'
import { usePath, createQuery } from 'utils/link';

export const SearchInput = () => {
  const { t } = useTranslation("common");
  const { params } = usePath();
  const router = useRouter();
  const [defaultSearch, setDefaulSearch] = useState<string>('');
  const searchHandler = async (e: any) => {
    router.push(`/product?${createQuery({ search: e.target.value })}`);
  };
  useEffect(() => {
    const { search } = params
    if (search) {
      setDefaulSearch(search)
    }
  }, [])
  return (
    <InputGroup>
      <InputLeftElement>
        <Icon as={RiSearchLine} color="gray.500" fontSize="lg" />
      </InputLeftElement>
      <Input
        // focusBorderColor="blue.500"
        width="full"
        fontSize="sm"
        // variant="filled"
        type="text"
        defaultValue={defaultSearch}
        placeholder={t('menu#input#search')}
        autoComplete="off"
        onChange={searchHandler}
      />
    </InputGroup>
  )
}
