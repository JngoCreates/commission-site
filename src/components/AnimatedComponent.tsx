import React from "react";

/** Properties of the animated component. */
export interface IAnimatedComponentProps {
    fps: number,
    frames: string[],
}

/** Holds the state of the animated component. */
export interface IAnimatedComponentState {
    currentFrameSrc: string,
}

/** Animated component class. */
export default class AnimatedComponent<P extends IAnimatedComponentProps, S extends IAnimatedComponentState> extends React.Component<P, S> {
    constructor(props: P) {
        super(props)

        this.incrementFrame = this.incrementFrame.bind(this)
    }

    /** @inheritdoc */
    componentDidMount(): void {
        this.setState({ currentFrameSrc: this.props.frames[0] })
        setInterval(this.incrementFrame, 1000 / this.props.fps)
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
            <img src={this.state.currentFrameSrc} alt='Animated component' loading='lazy' />
        )
    }
}