import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface CustomSelectProps {
  value: number;
  onChange: (value: number) => void;
  options: number[];
  icon: React.ReactNode;
  label: string;
  className?: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  icon,
  className = "",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropDirection, setDropDirection] = useState<"down" | "up">("down");
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && containerRef.current && dropdownRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      const spaceBelow = windowHeight - containerRect.bottom;
      const spaceAbove = containerRect.top;

      setDropDirection(
        spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove ? "down" : "up"
      );
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-4 cursor-pointer ${className}`}
      >
        {icon}
        <span className="flex-1">{value}</span>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: dropDirection === "down" ? 10 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: dropDirection === "down" ? 10 : -10 }}
            className={`absolute ${
              dropDirection === "down" ? "top-full mt-2" : "bottom-full mb-2"
            } left-0 right-0 z-50`}
          >
            <div className="bg-white rounded-lg shadow-lg py-2 border">
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  {option}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
