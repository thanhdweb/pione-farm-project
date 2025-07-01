'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { DropdownIcon } from '@/components/ui/icon';

interface CustomDatePickerProps {
  placeholder?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

export default function CustomDatePicker({ placeholder = 'Chọn ngày', value, onChange }: CustomDatePickerProps) {
  const [selected, setSelected] = useState<Date | undefined>(value);
  const [open, setOpen] = useState(false);

  const handleSelect = (date: Date | undefined) => {
    setSelected(date);
    onChange?.(date);
  };

  return (
    <div className="relative w-full">

      <button
        onClick={() => setOpen(!open)}
        className="relative w-full bg-white rounded-full px-4 py-3 border border-gray-400 text-xl text-black text-center shadow-sm custom-border-gradient"
      >
        {selected ? format(selected, 'dd/MM/yyyy') : placeholder}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <DropdownIcon />
        </div>
      </button>


      {open && (
        <div className="absolute z-50 mt-2 bg-white text-black shadow-xl rounded-xl border p-4">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            showOutsideDays
            modifiersClassNames={{
              selected: 'bg-green-500 text-white',
              today: 'text-green-600 font-semibold',
            }}

            className="text-sm"
            classNames={{
              caption: 'flex justify-center mb-2',
              dropdown: 'flex gap-2',
              dropdown_month: 'px-4 py-2 rounded-md border bg-white text-black text-sm shadow-sm',
              dropdown_year: 'px-4 py-2 rounded-md border bg-white text-black text-sm shadow-sm',
              nav: 'flex items-center justify-between px-4 mb-2',
              nav_button: 'text-xl text-green-700 hover:text-green-500',
              table: 'w-full border-collapse',
              head_row: 'text-gray-400',
              row: '',
              cell: 'h-10 w-10 text-sm text-center align-middle cursor-pointer hover:bg-green-100 rounded-full',
              selected: 'bg-green-500 text-white',
              today: 'text-green-600',
            }}

          />

          <div className="flex justify-end pt-2 space-x-4">
            <button onClick={() => setOpen(false)} className="text-sm text-gray-500 hover:text-gray-700">
              Cancel
            </button>
            <button
              onClick={() => setOpen(false)}
              className="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
