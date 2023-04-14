import React from "react"
import { ICommissionSelectButtonProps } from "./CommissionSelectButton"
import CommissionSelectButton from "./CommissionSelectButton"

/** Properties of the animated commission select button. */
interface IAnimatedCommissionSelectButtonProps extends ICommissionSelectButtonProps {
    frames: string[],
}

/** The state of the animated commission select button. */
interface IAnimatedCommissionSelectButtonState {
    currentFrameSrc: string,
}

export default class AnimatedCommissionSelectButton extends React.Component<IAnimatedCommissionSelectButtonProps, IAnimatedCommissionSelectButtonState> {
    constructor(props: IAnimatedCommissionSelectButtonProps) {
        super(props)

        this.state = {
            currentFrameSrc: this.props.frames[0],
        }

        this.incrementFrame = this.incrementFrame.bind(this)
    }

    /** @inheritdoc */
    componentDidMount(): void {
        setInterval(this.incrementFrame, 1000 / 6)
    }

    /** Increment the current frame of the animation. */
    incrementFrame(): void {
        this.setState((state: IAnimatedCommissionSelectButtonState) => {
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