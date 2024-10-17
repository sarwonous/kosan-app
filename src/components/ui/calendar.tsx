"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 rounded-md border shadow", className)}

      classNames={{
        months: "flex flex-col",
        month: "space-y-4 text-center",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-md font-bold",
        nav: "space-x-1 flex items-center justify-between",
        weekdays: "flex justify-between",
        month_grid: "w-full border-collapse space-y-1",
        day: 
          cn(
            buttonVariants({ variant: "ghost" }),
            "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
            ),
        selected:"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside: "text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        // Nav: ({ children, onPreviousClick, onNextClick, ...props }) => (<><Button variant={"outline"} size={"sm"} onClick={onPreviousClick}><ChevronLeftIcon /></Button><>{"a"}</><Button variant={"outline"} size={"sm"} onClick={onNextClick}><ChevronRightIcon /></Button></>),
        // CaptionLabel: <div />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
