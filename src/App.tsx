import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import ImageList from '@mui/material/ImageList'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import fullImage from './images/full.png'
import flatImage from './images/flat.png'
import lineImage from './images/lineart.png'
import art0 from './images/art0.png'
import art1 from './images/art1.png'
import art2 from './images/art2.png'
import art3 from './images/art3.png'
import art4 from './images/art4.png'
import art5 from './images/art5.png'
import sketchImage from './images/sketch.png'
import twitterLogo from './images/twitter-logo.webp'
import discordLogo from './images/discord-logo.svg'
import youtubeLogo from './images/youtube-logo.svg'
import './App.css'
import { ImageListItem } from '@mui/material'

enum Tier {
  Full,
  Flat,
  Lineart,
  Sketch,
}

interface IAppState {
  msgModalOpen: boolean,
  tier: Tier,
}

const imgList = [
  {
    img: art0,
    alt: 'Chainsaw Man x Hollow Knight artwork',
  },
  {
    img: art1,
    alt: 'Hollow Knight Bindings artwork',
  },
  {
    img: art2,
    alt: 'Hollow Knight Radiance gijinka artwork',
  },
  {
    img: art3,
    alt: 'Crowsworn manga-style artwork',
  },
  {
    img: art4,
    alt: 'Hollow Knight OCs artwork',
  },
  {
    img: art5,
    alt: 'Golden mask artwork',
  },
  
]

export default class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      msgModalOpen: false,
      tier: Tier.Full,
    }

    this.chooseTier = this.chooseTier.bind(this)
    this.onClose = this.onClose.bind(this)
  }

  chooseTier(tier: Tier): void {
    this.setState({ tier: tier, msgModalOpen: true })
  }

  onClose(): void {
    this.setState({ msgModalOpen: false })
  }

  render(): React.ReactElement {
    return (
      <div className='App'>
        <Grid id='content-grid' container spacing={2}>
          <Grid id="portfolio" container item>
            <div>
              <h1 id='portfolio-title' style={{ alignItems: 'center', justifyContent: 'center' }}>
                Some of My Works
              </h1>
            </div>
            <ImageList id="portfolio-images" variant='masonry' cols={3} gap={4}>
              {imgList.map((img) => (
                <ImageListItem key={img.img}>
                  <img src={img.img} alt={img.alt} loading='lazy' />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
          <div>
            <h1 id="tier-select-title">Choose a Tier</h1>
          </div>
          <Grid id='sample-selection-grid' container item>
            <Grid container item xs={3}>
              <Button type='button' onClick={() => this.chooseTier(Tier.Full)}>
                <Grid item>
                  <Typography id='full-text'>Rendered</Typography>
                  <Box component='img' id='full-sample' className='sample' src={fullImage} alt='Fully rendered tier' />
                </Grid>
              </Button>
            </Grid>
            <Grid container item xs={3}>
              <Button type='button' onClick={() => this.chooseTier(Tier.Flat)}>
                <Grid item>
                  <Typography id='flat-text'>Flat</Typography>
                  <Box component='img' id='flat-sample' className='sample' src={flatImage} alt='Flat shading tier' />
                </Grid>
              </Button>
            </Grid>
            <Grid container item xs={3}>
              <Button type='button' onClick={() => this.chooseTier(Tier.Lineart)}>
                <Grid item>
                  <Typography id='lineart-text'>Lineart</Typography>
                  <Box component='img' id='lineart-sample' className='sample' src={lineImage} alt='Lineart tier' />
                </Grid>
              </Button>
            </Grid>
            <Grid container item xs={3}>
              <Button type='button' onClick={() => this.chooseTier(Tier.Sketch)}>
                <Grid item>
                  <Typography id='sketch-text'>Sketch</Typography>
                  <Box component='img' id='sketch-sample' className='sample' src={sketchImage} alt='Sketch tier' />
                </Grid>
              </Button>
            </Grid>
          </Grid>
          <Grid container item>
            <footer className='footer'>
              <Grid item xs={4}>
                <a id='discord-link' href='https://discord.com/users/799432073387442217'>
                  <img src={discordLogo} style={{ maxWidth: '32px' }} alt='Discord Link' />
                  <Typography id='discord-text'>Italy#0316</Typography>
                </a>
              </Grid>
              <Grid item xs={4}>
                <a id='twitter-link' href='https://twitter.com/JngoCreates'>
                  <img src={twitterLogo} style={{ maxWidth: '32px' }} alt='Twitter Link' />
                  <Typography id='twitter-text'>JngoCreates</Typography>
                </a>
              </Grid>
              <Grid item xs={4}>
                <a id='youtube-link' href='https://www.youtube.com/@jngo102/'>
                  <img src={youtubeLogo} style={{ maxWidth: '32px' }} alt='YouTube Link' />
                  <Typography id='youtube-text'>jngo102</Typography>
                </a>
              </Grid>
            </footer>
          </Grid>
        </Grid>
        <div>
          <Modal id='msg-modal' 
            open={this.state.msgModalOpen} 
            onClose={this.onClose}
            aria-labelledby='msg-modal-title'
            aria-describedby='msg-modal-description'>
            <Box>
              <Typography id='msg-modal-title' component='h2'>
                Message Me!
              </Typography>
              <Typography id='msg-modal-description' sx={{ mt: 2 }}>
                You selected the {Tier[this.state.tier]} tier.
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    )
  }
}