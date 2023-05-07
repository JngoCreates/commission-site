import { ImageListItem } from "@mui/material";
import React from "react";
import AnimatedComponent, { IAnimatedComponentProps, IAnimatedComponentState } from "./AnimatedComponent";

/** Properties of the animated image list item. */
interface IAnimatedImageListItemProps extends IAnimatedComponentProps {
    link: string,
}

export default class AnimatedImageListItem extends AnimatedComponent<IAnimatedImageListItemProps, IAnimatedComponentState> {
    constructor(props: IAnimatedImageListItemProps) {
        super(props)

        this.state = {
            currentFrameSrc: this.props.frames[0],
        }
    }

    /** @inheritdoc */
    render(): React.ReactElement {
        return (
            <a href={this.props.link}>
                <ImageListItem>
                    {super.render()}
                </ImageListItem>
            </a>
        )
    }
}