import { useState } from "react";
import { Users } from "lucide-react";
import { motion } from "framer-motion";
import CustomDatePicker from "@/components/common/CustomDatePicker";
import CustomSelect from "@/components/common/CustomSelect";

export default function SearchBar() {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(6);

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-4 w-full relative z-50">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Check-in Date */}
        <div className="w-full md:flex-1">
          <label className="block text-sm text-gray-600 mb-1 font-medium">
            Check-in date
          </label>
          <CustomDatePicker
            selected={checkIn}
            onChange={(date: Date | null) => setCheckIn(date)}
            placeholderText="Start Date"
            minDate={new Date()}
          />
        </div>

        {/* Check-out Date */}
        <div className="w-full md:flex-1">
          <label className="block text-sm text-gray-600 mb-1 font-medium">
            Check-out date
          </label>
          <CustomDatePicker
            selected={checkOut}
            onChange={(date: Date | null) => setCheckOut(date)}
            placeholderText="End Date"
            minDate={checkIn || new Date()}
          />
        </div>

        {/* Guests */}
        <div className="w-full md:flex-1">
          <label className="block text-sm text-gray-600 mb-1 font-medium">
            Guest
          </label>
          <CustomSelect
            value={guests}
            onChange={setGuests}
            options={[1, 2, 3, 4, 5, 6]}
            icon={<Users className="h-5 w-5 text-gray-400" />}
            label="Guest"
            className="w-full p-2.5 px-4 border rounded-xl bg-white focus:ring-2 focus:ring-coral/20 focus:border-coral"
          />
        </div>

        {/* Search Button */}
        <div className="w-full md:flex-1 flex items-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-[42px] bg-coral text-white rounded-xl hover:bg-opacity-90 transition-colors"
          >
            Search
          </motion.button>
        </div>
      </div>
    </div>
  );
}
