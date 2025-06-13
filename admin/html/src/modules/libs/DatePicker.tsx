import { SingleDatepicker, RangeDatepicker as RangeDatepickerLib } from "chakra-dayzed-datepicker";
import { useState } from "react";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
export const RangeDatepicker = (props: any) => {
  const { value, onChange } = props;
  return (
      <RangeDatepickerLib
        selectedDates={value}
        onDateChange={onChange}
        propsConfigs={{
          dateNavBtnProps: {
              color: "gray.200",
            colorScheme: "blue",
            variant: "outline"
          },
          dayOfMonthBtnProps: {
            defaultBtnProps: {
              borderColor: "red.300",
              _hover: {
                background: 'blue.400',
              }
            },
            isInRangeBtnProps: {
              color: "yellow",
            },
            selectedBtnProps: {
              background: "blue.200",
              color: "green",
            },
            todayBtnProps: {
              background: "teal.400",
            }
          },
          inputProps: {
            size: "sm"
          },
          popoverCompProps: {
            popoverContentProps: {
              background: "gray.700",
              color: "white",
            },
          },
          calendarPanelProps: {
            wrapperProps: {
              borderColor: 'green',
            },
            contentProps: {
              borderWidth: 0,
            },
            // headerProps: {
            //   padding: '5px',
            // },
            dividerProps: {
              display: "none",
            },
          },
          weekdayLabelProps: {
            fontWeight: 'normal'
          },
          dateHeadingProps: {
            fontWeight: 'semibold'
          }
        }}
      />
  );
};

export const DatePicker = (props: any) => {
  const { date, onDateChange, otherProps } = props;

  return (
      <SingleDatepicker
      {...otherProps}
        date={date}
        onDateChange={onDateChange}
        propsConfigs={{
          dateNavBtnProps: {
              color: "gray.200",
            colorScheme: "blue",
            variant: "outline"
          },
          dayOfMonthBtnProps: {
            defaultBtnProps: {
              borderColor: "red.300",
              _hover: {
                background: 'blue.400',
              }
            },
            isInRangeBtnProps: {
              color: "yellow",
            },
            selectedBtnProps: {
              background: "blue.200",
              color: "green",
            },
            todayBtnProps: {
              background: "teal.400",
            }
          },
          inputProps: {
            size: "sm"
          },
          popoverCompProps: {
            popoverContentProps: {
              background: "gray.700",
              color: "white",
            },
          },
          calendarPanelProps: {
            wrapperProps: {
              borderColor: 'green',
            },
            contentProps: {
              borderWidth: 0,
            },
            headerProps: {
              padding: '5px',
            },
            dividerProps: {
              display: "none",
            },
          },
          weekdayLabelProps: {
            fontWeight: 'normal'
          },
          dateHeadingProps: {
            fontWeight: 'semibold'
          }
        }}
      />
  );
};

export default DatePicker