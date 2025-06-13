import { Popover } from "@chakra-ui/react"
import { FilterPopoverButton, FilterPopoverContent } from "modules/selects/shared/FilterPopover"
import { SizePicker } from "modules/selects/SizeFilterPopover/SizePicker"
import { useFilterState } from "modules/selects/shared/useFilterState"

export const sizeFilter = {
  defaultValue: '36',
  options: [
    { label: '32mm', value: '32' },
    { label: '36mm', value: '36' },
    { label: '40mm', value: '40' },
  ],
}
  
export const SizeFilterPopover = () => {
  const state = useFilterState({
    defaultValue: '32',
    onSubmit: console.log,
  })

  return (
    <Popover placement="bottom-start">
      <FilterPopoverButton label="Size" />
      <FilterPopoverContent
        isCancelDisabled={!state.canCancel}
        onClickApply={state.onSubmit}
        onClickCancel={state.onReset}
      >
        <SizePicker
          hideLabel
          value={state.value}
          onChange={state.onChange}
          options={sizeFilter.options}
        />
      </FilterPopoverContent>
    </Popover>
  )
}
export default SizeFilterPopover