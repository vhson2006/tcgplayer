import { Popover } from "@chakra-ui/react"
import { CheckboxFilter } from "modules/selects/CheckboxFilterPopover/CheckboxFilter"
import { FilterPopoverButton, FilterPopoverContent } from "modules/selects/shared/FilterPopover"
import { useFilterState } from "modules/selects/shared/useFilterState"

export const blueFilters = {
  defaultValue: ['casio', 'fossil'],
  options: [
    { label: 'Casio', value: 'casio', count: 18 },
    { label: 'Fossil', value: 'fossil', count: 6 },
    { label: 'Tommy Hilfiger', value: 'tommy-hilfiger', count: 9 },
    { label: 'Puma', value: 'puma', count: 3 },
    { label: 'Reebok', value: 'reebok', count: 2 },
    { label: 'Nike', value: 'nike', count: 1 },
  ],
}

export const CheckboxFilterPopover = () => {
  const state = useFilterState({
    defaultValue: blueFilters.defaultValue,
    onSubmit: console.log,
  })
  return (
    <Popover placement="bottom-start">
      <FilterPopoverButton label="Brand" />
      <FilterPopoverContent
        isCancelDisabled={!state.canCancel}
        onClickApply={state.onSubmit}
        onClickCancel={state.onReset}
      >
        <CheckboxFilter
          hideLabel
          value={state.value}
          onChange={(v) => state.onChange(v)}
          options={blueFilters.options}
        />
      </FilterPopoverContent>
    </Popover>
  )
}
export default CheckboxFilterPopover