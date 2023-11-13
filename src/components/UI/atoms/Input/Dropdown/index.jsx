import React, { useState } from 'react';
import Image from '../../Media/Image';

function DropdownMenu({ title, list = [], handleSelectItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 항목을 추적하기 위한 상태

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item); // 항목 클릭 시 상태 업데이트
    handleSelectItem(item);
    setIsOpen(false); // 선택 후 드롭다운 메뉴를 닫습니다.
  };

  return (
    <div className="relative bg-[#e6e6e6] py-1 px-2 rounded-sm">
      <button type="button" onClick={toggleDropdown}>
        <div className="flex items-center gap-4">
          {title}{' '}
          {isOpen ? (
            <Image src="/assets/img/chevron-compact-down.svg" />
          ) : (
            <Image src="/assets/img/chevron-compact-up.svg" />
          )}
        </div>
      </button>
      {isOpen && (
        <ul className="absolute z-10 top-full bg-white p-1 border">
          {list.map((item, index) => (
            <li
              key={index}
              className={item === selectedItem ? 'bg-blue-500 text-white' : ''} // 선택된 항목에 대한 스타일 추가
              onClick={() => handleItemClick(item)} // 항목 클릭 핸들러 추가
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;
