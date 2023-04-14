import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { Medium, Tier } from '../data/classes'

/** Properties of the commission select button. */
export interface ICommissionSelectButtonProps {
    medium: Medium,
    onSelect: any,
    src: string,
    tier: Tier,
}

/** The commission select button class. */
export default class CommissionSelectButton extends React.Component<ICommissionSelectButtonProps, {}> {
    constructor(props: ICommissionSelectButtonProps) {
        super(props)

        this.selectCommission = this.selectCommission.bind(this)
    }

    /** Choose the current commission button's respective medium and tier as the current ones. */
    selectCommission(): void {
        if (this.props.onSelect != null) {
            this.props.onSelect(this.props.medium, this.props.tier)
        }
    }

    /**
     * Returns a formatted string of the element's tier to be used in attributes.
     * @returns {string} The formatted string of the element's tier.
     */
    getTierAttribute(): string {
        return Tier[this.props.tier].toString().toLowerCase() + '-'
    }

    /** @inheritdoc */
    render(): React.ReactElement {
        return (
            <Grid container item xs={3}>
                <Button id={this.getTierAttribute() + 'sample-button'} className='sample-button' type='button' onClick={this.selectCommission}>
                    <Grid item>
                        <Typography id={this.getTierAttribute() + 'text'} variant='h4'>{Tier[this.props.tier]}</Typography>
                        <Box component='img' id={this.getTierAttribute() + 'sample'} className='sample' src={this.props.src} alt={Tier[this.props.tier] + '-tier'} />
                    </Grid>
                </Button>
            </Grid>
        )
    }
}