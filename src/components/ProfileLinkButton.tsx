import { Button, Grid } from "@mui/material"
import React from "react"

/** Properties of the profile link button. */
interface IProfileLinkButtonProps {
    href: string,
    logo: string,
    name: string,
    profile: string,
}

/** The profile link button class. */
export default class ProfileLinkButton extends React.Component<IProfileLinkButtonProps, {}> {
    /** @inheritdoc */
    render(): React.ReactElement {
        return (
            <Grid item xs={3}>
                <Button variant='contained'
                    color='inherit'
                    startIcon={<img id={this.props.name.toLowerCase() + '-logo'} className='logo-avatar' src={this.props.logo} alt={this.props.name + ' Logo'} style={{ maxWidth: '32px' }} />}
                    href={this.props.href}>
                    {this.props.profile}
                </Button>
            </Grid>
        )
    }
}