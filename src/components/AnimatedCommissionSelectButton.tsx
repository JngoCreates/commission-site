import React from "react"
import { ICommissionSelectButtonProps } from "./CommissionSelectButton"
import CommissionSelectButton from "./CommissionSelectButton"
import AnimatedComponent, { IAnimatedComponentProps, IAnimatedComponentState } from "./AnimatedComponent"

/** Properties of the animated commission select button. */
interface IAnimatedCommissionSelectButtonProps extends ICommissionSelectButtonProps, IAnimatedComponentProps {}

export default class AnimatedCommissionSelectButton extends AnimatedComponent<IAnimatedCommissionSelectButtonProps, IAnimatedComponentState> {
    constructor(props: IAnimatedCommissionSelectButtonProps) {
        super(props)

        this.state = {
            currentFrameSrc: this.props.frames[0],
        }
    }

    /** Increment the current frame of the animation. */
    incrementFrame(): void {
        this.setState((state: IAnimatedComponentState) => {
            const nextFrameIndex = (this.props.frames.indexOf(state.currentFrameSrc) + 1) % this.props.frames.length
            return { currentFrameSrc: this.props.frames[nextFrameIndex] }
        })
    }

    /** @inheritdoc */
    render(): React.ReactElement {
        return (
            <CommissionSelectButton {...this.props} src={this.state.currentFrameSrc} />
        )
    }
}