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
import discordLogo from './images/discord-logo.svg'
import githubLogo from './images/github-logo.svg'
import twitterLogo from './images/twitter-logo.webp'
import youtubeLogo from './images/youtube-logo.svg'
import './App.css'
import { Avatar, Box, Button, CssBaseline, Grid, ImageList, Modal, ImageListItem, PaletteMode, TextField, Theme, ThemeProvider, Typography, createTheme } from '@mui/material'

enum Tier {
  Rendered,
  Flat,
  Lineart,
  Sketch,
}

interface IAppState {
  contactInfo: string,
  message: string,
  msgModalOpen: boolean,
  price: number,
  theme: Theme,
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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '25%',
  maxWidth: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #dddddd',
  boxShadow: 24,
  p: 2,
}

export default class App extends React.Component<{}, IAppState> {
  POST_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeieoARIXG-n6kTSTtwN6_Qvxhw-930QbDwSe13J0CfjAi6Qw/formResponse?'
  CONTACT_FIELD = 'entry.2095249351'
  MESSAGE_FIELD = 'entry.1209716240'
  PRICE_FIELD = 'entry.1149927974'
  TIER_FIELD = 'entry.240676536'

  constructor(props: {}) {
    super(props)
    this.state = {
      contactInfo: "",
      message: "",
      msgModalOpen: false,
      price: 0,
      theme: createTheme({
        components: {
          MuiButtonBase: {
            defaultProps: {
              style: {
                maxWidth: '100%',
              }
            }
          }
        },
        palette: {
          mode: "light" as PaletteMode,
        },
      }),
      tier: Tier.Rendered,
    }

    this.chooseTier = this.chooseTier.bind(this)
    this.onClose = this.onClose.bind(this)
    this.submitRequest = this.submitRequest.bind(this)
  }

  chooseTier(tier: Tier): void {
    this.setState({ tier: tier, msgModalOpen: true })
  }

  onClose(): void {
    this.setState({ msgModalOpen: false })
  }

  async submitRequest(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    console.log("Contact info: " + this.state.contactInfo)
    console.log("Message: " + this.state.message)
    console.log("Tier: " + Tier[this.state.tier].toString())
    console.log("Price: " + this.state.price)

    event.preventDefault()

    const postUrl = `${this.POST_URL}${this.CONTACT_FIELD}=${this.state.contactInfo.split(' ').join('%20')}&${this.MESSAGE_FIELD}=${this.state.message.split(' ').join('%20')}` +
      `&${this.TIER_FIELD}=${Tier[this.state.tier].toString()}&${this.PRICE_FIELD}=${this.state.price}`

    console.log("Post URL: " + postUrl)
    try {
      const response = await fetch(postUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      console.log("Response: " + JSON.stringify(response))
    } catch (error) {
      console.error("Error: " + error)
    }

    this.setState({ contactInfo: '', message: '', price: 0 })
    const form = document.getElementById('commission-request-form') as HTMLFormElement;
    form?.reset();

    this.setState({ msgModalOpen: false })
  }

  render(): React.ReactElement {
    return (
      <ThemeProvider theme={this.state.theme}>
        <CssBaseline />
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
            <Grid id='sample-selection-grid' container item sx={{ overflowX: 'scroll' }}>
              <Grid container item xs={3}>
                <Button id='full-sample-button' className='sample-button' type='button' onClick={() => this.chooseTier(Tier.Rendered)}>
                  <Grid item>
                    <Typography id='full-text' variant='h4'>Rendered</Typography>
                    <Box component='img' id='full-sample' className='sample' src={fullImage} alt='Fully rendered tier' />
                  </Grid>
                </Button>
              </Grid>
              <Grid container item xs={3}>
                <Button id='flat-sample-button' className='sample-button' type='button' onClick={() => this.chooseTier(Tier.Flat)}>
                  <Grid item>
                    <Typography id='flat-text' variant='h4'>Flat</Typography>
                    <Box component='img' id='flat-sample' className='sample' src={flatImage} alt='Flat shading tier' />
                  </Grid>
                </Button>
              </Grid>
              <Grid container item xs={3}>
                <Button id='lineart-sample-button' className='sample-button' type='button' onClick={() => this.chooseTier(Tier.Lineart)}>
                  <Grid item>
                    <Typography id='lineart-text' variant='h4'>Lineart</Typography>
                    <Box component='img' id='lineart-sample' className='sample' src={lineImage} alt='Lineart tier' />
                  </Grid>
                </Button>
              </Grid>
              <Grid container item xs={3} >
                <Button id='sketch-sample-button' className='sample-button' type='button' onClick={() => this.chooseTier(Tier.Sketch)}>
                  <Grid item>
                    <Typography id='sketch-text' variant='h4'>Sketch</Typography>
                    <Box component='img' id='sketch-sample' className='sample' src={sketchImage} alt='Sketch tier' />
                  </Grid>
                </Button>
              </Grid>
            </Grid>
            <footer className='footer'>
              <Grid id='profile-links' container item>
                <Grid item xs={3}>
                  <Button variant='contained'
                    color='inherit'
                    startIcon={<Avatar id='discord-avatar' className='logo-avatar' src={discordLogo} variant='rounded' />}
                    href='https://discord.com/users/799432073387442217'>
                    Italy#0316
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button variant='contained'
                    color='inherit'
                    startIcon={<Avatar id='twitter-avatar' className='logo-avatar' src={twitterLogo} variant='rounded' />}
                    href='https://twitter.com/JngoCreates'>
                    JngoCreates
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button variant='contained'
                    color='inherit'
                    startIcon={<Avatar id='youtube-avatar' className='logo-avatar' src={youtubeLogo} variant='rounded' />}
                    href='https://www.youtube.com/@jngo102/'>
                    jngo102
                  </Button>
                </Grid>
                <Grid container item xs={3}>
                  <Button variant='contained'
                    color='inherit'
                    startIcon={<Avatar id='github-avatar' className='logo-avatar' src={githubLogo} variant='rounded' />}
                    href='https://github.com/JngoCreates'>
                    JngoCreates
                  </Button>
                </Grid>
              </Grid>
            </footer>
          </Grid>
          <Modal id='msg-modal'
            open={this.state.msgModalOpen}
            onClose={this.onClose}
            aria-labelledby='msg-modal-title'
            aria-describedby='msg-modal-description'>
            <Box sx={style}>
              <Typography id='msg-modal-title' variant='h6'>
                Send me a message.
              </Typography>
              <Typography id='msg-modal-description' variant='body1'>
                You selected the {Tier[this.state.tier]} tier.
              </Typography>
              <Box id='commission-request-form'
                component='form'
                encType='text/plain'
                target='cancel-redirect'
                onSubmit={this.submitRequest}>
                <input id='entry.240676536'
                  name='entry.240676536'
                  hidden
                  readOnly
                  value={Tier[this.state.tier].toString()} />
                <TextField id='entry.2095249351'
                  required
                  name='entry.2095249351'
                  label='Your contact info'
                  helperText='email, Discord, Twitter, anywhere I can reach you.'
                  color={this.state.contactInfo === '' ? 'error' : 'success'}
                  onChange={(event) => this.setState({ contactInfo: event.currentTarget.value })}
                  value={this.state.contactInfo}
                  variant='outlined'
                  fullWidth />
                <TextField id='entry.1209716240'
                  required
                  name='entry.1209716240'
                  color={this.state.message === '' ? 'error' : 'success'}
                  label='Your request'
                  helperText='Describe in as much detail as possible.'
                  onChange={(event) => this.setState({ message: event.currentTarget.value })}
                  value={this.state.message}
                  multiline
                  variant='outlined'
                  fullWidth
                  minRows={8} />
                <TextField id='entry.1149927974'
                  required
                  name='entry.1149927974'
                  color={(this.state.price <= 0 || isNaN(this.state.price)) ? 'error' : 'success'}
                  type='number'
                  label='Your price'
                  helperText='United States dollar only.'
                  onChange={(event) => this.setState({ price: parseInt(event.currentTarget.value) })}
                  value={this.state.price}
                  variant='outlined'
                  fullWidth />
                <Button id='submit-request-button'
                  disabled={this.state.contactInfo === '' || this.state.message === '' || (this.state.price <= 0 || isNaN(this.state.price))}
                  type='submit'
                  variant='contained'
                  color='primary'>
                  Send Message
                </Button>
              </Box>
              <iframe id='cancel-redirect' title='cancel-redirect' style={{ display: 'none' }} />
            </Box>
          </Modal>
        </div>
      </ThemeProvider>
    )
  }
}