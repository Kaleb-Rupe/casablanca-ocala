import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText: string;
  minDate?: Date;
}

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
  ref: React.Ref<HTMLInputElement>;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick, placeholder }, ref) => (
    <div className="relative flex items-center w-full">
      <Calendar className="absolute left-3 h-5 w-5 text-gray-400 pointer-events-none" />
      <input
        ref={ref}
        value={value || ""}
        onClick={onClick}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 border rounded-xl bg-white focus:ring-2 focus:ring-coral/20 focus:border-coral"
        readOnly
      />
    </div>
  )
);

CustomInput.displayName = "CustomInput";

export default function CustomDatePicker({
  selected,
  onChange,
  placeholderText,
  minDate,
}: CustomDatePickerProps) {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      customInput={<CustomInput />}
      placeholderText={placeholderText}
      minDate={minDate}
      dateFormat="EEE, dd MMM yyyy"
      calendarClassName="shadow-lg border-none bg-white rounded-xl"
      wrapperClassName="w-full"
      popperClassName="z-50"
      popperModifiers={[
        {
          name: "offset",
          fn: ({ x, y }) => ({
            x,
            y: y + 8,
          }),
          options: {
            offset: [0, 8],
          },
        },
      ]}
      popperPlacement="bottom"
      showPopperArrow={false}
    />
  );
}
