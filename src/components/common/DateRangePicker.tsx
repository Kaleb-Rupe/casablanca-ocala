import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useBreakpoint } from "@/hooks/useMediaQuery";
interface DateRangePickerProps {
  onDateSelect: (range: DateRange | undefined) => void;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  minStay?: number;
  maxStay?: number;
}

type SelectionState = "start" | "end" | "complete" | null;

export default function DateRangePicker({
  onDateSelect,
  className = "",
  minDate = new Date(),
  maxDate,
  disabledDates = [],
  minStay = 1,
  maxStay = 30,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>();
  const [selectionState, setSelectionState] = useState<SelectionState>(null);
  const [hoverDate, setHoverDate] = useState<Date | undefined>();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDays, setSelectedDays] = useState<number>(0);
  const calendarRef = useRef<HTMLDivElement>(null);
  const { isDesktop } = useBreakpoint();
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (!range?.to) {
          setRange(undefined);
          setSelectionState(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [range]);

  // Calculate selected days when range changes
  useEffect(() => {
    if (range?.from && range?.to) {
      const diffTime = range.to.getTime() - range.from.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setSelectedDays(diffDays);
    } else if (range?.from && hoverDate) {
      const diffTime = hoverDate.getTime() - range.from.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setSelectedDays(diffDays);
    } else {
      setSelectedDays(0);
    }
  }, [range, hoverDate]);

  const handleSelect = (selectedRange: DateRange | undefined) => {
    if (!selectedRange) {
      setRange(undefined);
      setSelectionState(null);
      return;
    }

    if (!selectedRange.from) {
      return;
    }

    if (!range?.from) {
      setRange({ from: selectedRange.from, to: undefined });
      setSelectionState("start");
      return;
    }

    if (!selectedRange.to) {
      return;
    }

    const diffDays = Math.ceil(
      (selectedRange.to.getTime() - range.from.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (diffDays < minStay || diffDays > maxStay) {
      return;
    }

    const newRange: DateRange = {
      from: range.from,
      to: selectedRange.to,
    };

    setRange(newRange);
    setSelectionState("complete");
    onDateSelect(newRange);
  };

  const handleDayHover = (date: Date | undefined) => {
    if (selectionState === "start") {
      setHoverDate(date);
    }
  };

  const handleClear = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setRange(undefined);
    setSelectionState(null);
    setSelectedDays(0);
    onDateSelect(undefined);
  };

  const isDateDisabled = (date: Date) => {
    return (
      date < minDate ||
      date > effectiveMaxDate ||
      disabledDates.some(
        (disabledDate) =>
          disabledDate.getFullYear() === date.getFullYear() &&
          disabledDate.getMonth() === date.getMonth() &&
          disabledDate.getDate() === date.getDate()
      )
    );
  };

  const formatDateRange = () => {
    if (!range?.from) return "Add dates";
    if (!range.to)
      return `${range.from.toLocaleDateString()} - Select checkout`;
    return `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`;
  };

  const getDateRangePrompt = () => {
    if (!selectionState) return "Select check-in date";
    if (selectionState === "start") return "Select check-out date";
    return `${selectedDays} night${selectedDays !== 1 ? "s" : ""} selected`;
  };

  // Calculate default max date if not provided (1 year from now)
  const defaultMaxDate = new Date();
  defaultMaxDate.setFullYear(defaultMaxDate.getFullYear() + 1);
  const effectiveMaxDate = maxDate || defaultMaxDate;

  return (
    <div className={`relative ${className}`} ref={calendarRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 border rounded-lg hover:border-coral focus:outline-none focus:ring-2 focus:ring-coral"
      >
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-gray-900">
            {formatDateRange()}
          </span>
          {!range?.to && (
            <span className="text-xs text-gray-500">
              {getDateRangePrompt()}
            </span>
          )}
        </div>
        {range ? (
          <XMarkIcon
            className="w-5 h-5 text-gray-500 hover:text-gray-700"
            onClick={handleClear}
          />
        ) : (
          <CalendarIcon className="w-5 h-5 text-gray-500" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-10 mt-2 bg-white rounded-lg shadow-lg p-4 md:p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {getDateRangePrompt()}
                </h3>
                {selectionState === "start" && (
                  <p className="text-sm text-gray-500 mt-1">
                    {minStay} night minimum · {maxStay} night maximum
                  </p>
                )}
              </div>
              {(selectedDays > 0 || (range?.from && hoverDate)) && (
                <span className="text-sm font-medium text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                  {selectedDays} night{selectedDays !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            <div className="relative overflow-hidden">
              <DayPicker
                mode="range"
                selected={range}
                onSelect={handleSelect}
                numberOfMonths={isDesktop ? 2 : 1}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                disabled={isDateDisabled}
                onDayMouseEnter={handleDayHover}
                onDayMouseLeave={() => handleDayHover(undefined)}
                modifiers={{
                  highlighted:
                    hoverDate && range?.from
                      ? {
                          from: range.from,
                          to: hoverDate,
                        }
                      : undefined,
                }}
                modifiersStyles={{
                  highlighted: {
                    backgroundColor: "rgba(238, 77, 100, 0.1)",
                  },
                }}
                styles={{
                  caption: { color: "#EE4D64" },
                  day: { color: "#2D2D2D" },
                  selected: {
                    backgroundColor: "#EE4D64",
                    color: "white",
                  },
                  months: {
                    display: "flex",
                    gap: "1rem",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  },
                }}
                classNames={{
                  nav_button_previous: "absolute left-2",
                  nav_button_next: "absolute right-2",
                  caption: "mx-12",
                }}
              />
            </div>

            {selectionState === "complete" && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-coral text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Save dates
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
