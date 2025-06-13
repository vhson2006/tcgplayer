import { Popover } from "@chakra-ui/react"
import { FilterPopoverButton, FilterPopoverContent } from "modules/selects/shared/FilterPopover"
import { ColorPicker } from "modules/selects/ColorFilterPopover/ColorPicker"
import { useFilterState } from "modules/selects/shared/useFilterState"
export const colorFilter = {
  defaultValue: 'black',
  options: [
    { label: 'Black', value: 'black' },
    { label: 'Tomato', value: 'tomato' },
    { label: 'Blueish', value: '#272458' },
    { label: 'Beige', value: '#BFB8A5' },
  ],
}
export const ColorFilterPopover = () => {
  const state = useFilterState({
    defaultValue: colorFilter.defaultValue,
    onSubmit: console.log,
  })
  return (
    <Popover placement="bottom-start">
      <FilterPopoverButton label="Color" />

      <FilterPopoverContent
        isCancelDisabled={!state.canCancel}
        onClickApply={state.onSubmit}
        onClickCancel={state.onReset}
      >
        <ColorPicker
          hideLabel
          value={state.value}
          onChange={state.onChange}
          options={colorFilter.options}
        />
      </FilterPopoverContent>
    </Popover>
  )
}

export default ColorFilterPopover