import { useState } from 'react';

export const useTableRowModal = () => {
  const [toggleGearButtons, setToggleGearButtons] = useState(false);

  const handleToggleGearButtons = () => setToggleGearButtons(!toggleGearButtons);

  return {
    toggleGearButtons,
    handleToggleGearButtons,
  };
};