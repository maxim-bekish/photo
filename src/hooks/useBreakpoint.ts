import { useEffect, useState } from 'react';

export type DeviceType = 'mob' | 'tab' | 'desk';

/**
 * Returns the current device type based on viewport width:
 * - mob: 0 => 767px
 * - tab: 768 => 1279px
 * - desk: 1280px+
 */
export const useBreakpoint = (): DeviceType => {
	const [deviceType, setDeviceType] = useState<DeviceType>('desk');

	useEffect(() => {
		const updateDeviceType = () => {
			const width = window.innerWidth;
			if (width < 768) {
				setDeviceType('mob');
			} else if (width < 1280) {
				setDeviceType('tab');
			} else {
				setDeviceType('desk');
			}
		};

		updateDeviceType();
		window.addEventListener('resize', updateDeviceType);
		return () => window.removeEventListener('resize', updateDeviceType);
	}, []);

	return deviceType;
};
