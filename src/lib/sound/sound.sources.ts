/** Known sound files under `public/assets/sounds`. Add entries here when you add assets. */
export const SOUNDS = {
	homeAmbient: '/assets/sounds/Home_Ambient.wav', // Home ambient sound
	homeEnter: '/assets/sounds/Home_Enter.wav', // Not used
	homeExit: '/assets/sounds/Home_Exit.wav', // Not used
	homeIconSelect: '/assets/sounds/Home_Icon_Select.wav', // When a home icon is clicked (onMouseUp)
	homeIconGaze: '/assets/sounds/Home_Icon_Gaze.wav', // When a home icon is hovered (onMouseEnter)
	panoExpand: '/assets/sounds/pano_expand.wav', // Not used
	panoRetract: '/assets/sounds/pano_retract.wav', // Not used
	ornamentSelect: '/assets/sounds/Ornament_Select.wav', // When an ornament tab is clicked (onClick)
	gridSelect: '/assets/sounds/Grid_Select.wav', // When a grid(row) item is clicked (onClick)
} as const
