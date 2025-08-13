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
  // props phân biệt điều kiện
  variant?: 'default' | 'notification';
}


export default function CustomDatePicker({
  placeholder = 'Chọn ngày',
  value,
  onChange,

  // gán mặc định variant là default
  variant = 'default',


}: CustomDatePickerProps) {
  const [selected, setSelected] = useState<Date | undefined>(value);
  const [open, setOpen] = useState(false);

  const handleSelect = (date: Date | undefined) => {
    setSelected(date);
    onChange?.(date);

    // Nếu là chế độ notification thì auto-close khi chọn
    if (variant === 'notification' && date) {
      setOpen(false);
    }
  };

  //Xác định kiểu để dùng bên dưới
  const isNotification = variant === 'notification';

  return (
    <div className="relative w-full">

      <button
        onClick={() => setOpen(!open)}
        className={`${isNotification
          ? 'relative flex items-center justify-between w-full rounded-lg px-2 py-2 text-sm border border-gray-300 hover:bg-gray-50 text-gray-700' //  Giao diện nhỏ gọn cho notification
          : 'relative w-full bg-white border text-black shadow-sm transition-all rounded-full px-4 py-3 text-xl border-gray-400   ' //  Giao diện to cho default
          }`}
      >
        {selected ? format(selected, 'yyyy/MM/dd') : placeholder}

        {/*  Điều chỉnh vị trí icon nếu là notification */}
        <div className={`absolute ${isNotification ? 'right-3' : 'right-8'} top-1/2 -translate-y-1/2 pointer-events-none`}>
          <DropdownIcon className="w-3 h-3" />
        </div>
      </button>


      {open && (
        <div className="absolute border-gray-[600] z-50 mt-2 bg-white text-black shadow-xl rounded-xl border p-4 w-full">
          <div className='flex flex-col gap-2'>
            <div className="origin-top-left">
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={handleSelect}
                showOutsideDays
                               modifiersClassNames={{
                  selected: 'bg-green-500 text-white rounded-full',
                  today: 'text-green-600 font-semibold rounded-full',
                }}
                className="text-sm"
                classNames={{
                  caption: 'flex justify-center mb-2',
                  dropdown: 'flex gap-2',
                  dropdown_month: 'px-4 py-2 rounded-md border bg-white text-black text-sm shadow-sm',
                  dropdown_year: 'px-4 py-2 rounded-md border bg-white text-black text-sm shadow-sm',
                  nav: '',
                  nav_button: 'text-xl text-green-700 hover:text-green-500',
                  table: 'w-full border-collapse',
                  head_row: 'text-gray-400',
                  row: '',
                  cell: 'h-5 w-5 p-0 text-xs text-center align-middle cursor-pointer hover:bg-green-100 rounded-full',
                  selected: 'bg-green-500 text-white',
                  today: 'text-green-600',
                }}
              />
            </div>

            <div className="flex justify-end gap-4">
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
        </div>

      )}

    </div>
  );
}


