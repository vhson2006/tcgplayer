import { Popover, Box } from "@chakra-ui/react"
import { FilterPopoverButton, FilterPopoverContent } from "modules/selects/shared/FilterPopover"
import { PriceRangePicker } from "modules/selects/PriceFilterPopover/PriceRangePicker"
import { formatPrice } from "modules/selects/PriceFilterPopover/PriceTag"
import { useFilterState } from "modules/selects/shared/useFilterState"

export const priceFilter = {
  formatOptions: {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  },
  defaultValue: [800, 2000],
  min: 500,
  max: 4000,
}

export const PriceFilterPopover = () => {
  const state = useFilterState({
    defaultValue: priceFilter.defaultValue,
    onSubmit: console.log,
  })
  return (
    <Popover placement="bottom-start">
      <FilterPopoverButton label="Price" />

      <FilterPopoverContent
        isCancelDisabled={!state.canCancel}
        onClickApply={state.onSubmit}
        onClickCancel={state.onReset}
      >
        <Box px="2" pt="2">
          <PriceRangePicker
            step={10}
            min={priceFilter.min}
            max={priceFilter.max}
            value={state.value}
            onChange={state.onChange}
          />
          <Box as="output" mt="2" fontSize="sm">
            {state.value?.map((v) => formatPrice(v)).join(' — ')}
          </Box>
        </Box>
      </FilterPopoverContent>
    </Popover>
  )
}
export default PriceFilterPopover