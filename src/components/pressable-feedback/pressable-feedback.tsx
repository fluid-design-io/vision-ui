import { PressableFeedbackHighlight } from './pressable-feedback.highlight'
import { PressableFeedbackRoot } from './pressable-feedback.root'
import { PressableFeedbackScale } from './pressable-feedback.scale'

export const PressableFeedback = Object.assign(PressableFeedbackRoot, {
	Root: PressableFeedbackRoot,
	Highlight: PressableFeedbackHighlight,
	Scale: PressableFeedbackScale,
})
