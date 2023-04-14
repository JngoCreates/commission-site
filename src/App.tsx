import React from 'react'

import { Medium, Tier } from './data/classes'
import './App.css'
import { Box, Button, CssBaseline, Grid, ImageList, Modal, ImageListItem, PaletteMode, TextField, Theme, ThemeProvider, Typography, createTheme } from '@mui/material'
import CommissionSelectButton from './components/CommissionSelectButton'
import ProfileLinkButton from './components/ProfileLinkButton'
import AnimatedCommissionSelectButton from './components/AnimatedCommissionSelectButton'


/** Interface for the app's state. */
interface IAppState {
  email: string,
  fullFrames: Array<string>,
  flatFrames: Array<string>,
  images: Record<string, string>,
  lineFrames: Array<string>,
  medium: Medium,
  message: string,
  msgModalOpen: boolean,
  price: number,
  sketchFrames: Array<string>,
  theme: Theme,
  tier: Tier,
}

/** An object containing data for portfolio images. */
const imgList = [
  {
    key: 'art0.png',
    alt: 'Chainsaw Man x Hollow Knight artwork',
  },
  {
    key: 'art1.png',
    alt: 'Hollow Knight Bindings artwork',
  },
  {
    key: 'art2.png',
    alt: 'Hollow Knight Radiance gijinka artwork',
  },
  {
    key: 'art3.png',
    alt: 'Crowsworn manga-style artwork',
  },
  {
    key: 'art4.png',
    alt: 'Hollow Knight OCs artwork',
  },
  {
    key: 'art5.png',
    alt: 'Golden mask artwork',
  },
  {
    key: 'art6.png',
    alt: 'Hornet wallpaper',
  },
  {
    key: 'art7.png',
    alt: 'Mushroom mage artwork',
  },
]

/** Style for the message modal. */
const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '25%',
  maxWidth: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #dddddd',
  boxShadow: 24,
  p: 2,
}

/** The main application class. */
export default class App extends React.Component<{}, IAppState> {
  URL_PREFIX = 'https://docs.google.com/forms/d/e/1FAIpQLSeieoARIXG-n6kTSTtwN6_Qvxhw-930QbDwSe13J0CfjAi6Qw/formResponse?'
  EMAIL_FIELD = 'entry.2095249351'
  MEDIUM_FIELD = 'entry.2053143014'
  MESSAGE_FIELD = 'entry.1209716240'
  PRICE_FIELD = 'entry.1149927974'
  TIER_FIELD = 'entry.240676536'

  constructor(props: {}) {
    super(props)
    this.state = {
      email: "",
      fullFrames: [],
      flatFrames: [],
      images: {},
      lineFrames: [],
      medium: Medium.Image,
      message: "",
      msgModalOpen: false,
      price: 0,
      sketchFrames: [],
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

    this.importAll = this.importAll.bind(this)
    this.onClose = this.onClose.bind(this)
    this.selectCommission = this.selectCommission.bind(this)
    this.submitRequest = this.submitRequest.bind(this)
  }

  /** @inheritdoc */
  componentDidMount(): void {
    this.setState({
      images: this.importAll(require.context('./images', false, /\.(png|svg|webp)$/)),
      fullFrames: Object.values(this.importAll(require.context('./images/full', false, /\.(png)$/))),
      flatFrames: Object.values(this.importAll(require.context('./images/flat', false, /\.(png)$/))),
      lineFrames: Object.values(this.importAll(require.context('./images/lineart', false, /\.(png)$/))),
      sketchFrames: Object.values(this.importAll(require.context('./images/sketch', false, /\.(png)$/))),
    })
  }

  /**
   * Imports all images from a given directory.
   * @param req The require context.
   * @returns An object containing all images.
   */
  importAll(req: __WebpackModuleApi.RequireContext) {
    let images: Record<string, string> = {}
    req.keys().map(item => { images[item.replace('./', '')] = req(item); })
    return images
  }

  /**
   * Whether the current email value is valid.
   * @returns Whether the current email value is valid.
   */
  emailValid(): boolean {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regex.test(this.state.email)
  }

  /**
   * Sets the current tier and opens the message modal.
   * @param medium The medium to set.
   * @param tier The tier to set.
   */
  selectCommission(medium: Medium, tier: Tier): void {
    this.setState({ medium, tier, msgModalOpen: true })
  }

  /** Handle closing the message modal. */
  onClose(): void {
    this.setState({ msgModalOpen: false })
  }

  /**
   * Submit a commission request.
   * @param event The submitted form event.
   * @returns A promise that resolves when the a response is received.
   */
  async submitRequest(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    console.log("Email: " + this.state.email)
    console.log("Medium: " + Medium[this.state.medium])
    console.log("Message: " + this.state.message)
    console.log("Tier: " + Tier[this.state.tier].toString())
    console.log("Price: " + this.state.price)

    event.preventDefault()

    const postUrl = `${this.URL_PREFIX}${this.MEDIUM_FIELD}=${Medium[this.state.medium]}&${this.EMAIL_FIELD}=${this.state.email.split(' ').join('%20')}`+
      `&${this.MESSAGE_FIELD}=${this.state.message.split(' ').join('%20')}&${this.TIER_FIELD}=${Tier[this.state.tier].toString()}&${this.PRICE_FIELD}=${this.state.price}`

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

    this.setState({ email: '', message: '', price: 0 })
    const form = document.getElementById('commission-request-form') as HTMLFormElement
    form?.reset()

    this.setState({ msgModalOpen: false })
  }

  /** @inheritdoc */
  render(): React.ReactElement {
    return (
      <ThemeProvider theme={this.state.theme}>
        <CssBaseline />
        <div id='App'>
          <Grid id='content-grid' container spacing={2}>
            <Grid id="portfolio" container item>
              <div>
                <Typography id='portfolio-title' variant='h2'>
                  Some of My Works
                </Typography>
              </div>
              <ImageList id="portfolio-images" variant='masonry' cols={3} gap={4}>
                {imgList.map((img) => (
                  <ImageListItem key={img.key}>
                    <img src={this.state.images[img.key]} alt={img.alt} loading='lazy' />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
            <Grid item xs={12}>
              <Typography id="commission-select-title" variant='h2'>Choose a Tier</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography id="image-medium-title" variant='h4'>Still Image</Typography>
            </Grid>
            <Grid id='image-sample-selection-grid' container item sx={{ overflowX: 'scroll' }}>
              <CommissionSelectButton medium={Medium.Image} onSelect={this.selectCommission} src={this.state.images['full.png']} tier={Tier.Rendered} />
              <CommissionSelectButton medium={Medium.Image} onSelect={this.selectCommission} src={this.state.images['flat.png']} tier={Tier.Flat} />
              <CommissionSelectButton medium={Medium.Image} onSelect={this.selectCommission} src={this.state.images['lineart.png']} tier={Tier.Lineart} />
              <CommissionSelectButton medium={Medium.Image} onSelect={this.selectCommission} src={this.state.images['sketch.png']} tier={Tier.Sketch} />
            </Grid>
            <Typography id="animation-medium-title" variant='h4'>Animation</Typography>
            <Grid id='animation-sample-selection-grid' container item sx={{ overflowX: 'scroll' }}>
              <AnimatedCommissionSelectButton frames={this.state.fullFrames} medium={Medium.Animation} onSelect={this.selectCommission} src='' tier={Tier.Rendered} />
              <AnimatedCommissionSelectButton frames={this.state.flatFrames} medium={Medium.Animation} onSelect={this.selectCommission} src='' tier={Tier.Flat} />
              <AnimatedCommissionSelectButton frames={this.state.lineFrames} medium={Medium.Animation} onSelect={this.selectCommission} src='' tier={Tier.Lineart} />
              <AnimatedCommissionSelectButton frames={this.state.sketchFrames} medium={Medium.Animation} onSelect={this.selectCommission} src='' tier={Tier.Sketch} />
            </Grid>
            <footer className='footer'>
              <Grid id='profile-links' container item>
                <ProfileLinkButton href='https://discord.com/users/799432073387442217' logo={this.state.images['discord-logo.svg']} name='Discord' profile='Italy#0316' />
                <ProfileLinkButton href='https://twitter.com/JngoCreates' logo={this.state.images['twitter-logo.webp']} name='Twitter' profile='JngoCreates' />
                <ProfileLinkButton href='https://www.youtube.com/@jngo102/' logo={this.state.images['youtube-logo.svg']} name='YouTube' profile='jngo102' />
                <ProfileLinkButton href='https://github.com/JngoCreates' logo={this.state.images['github-logo.svg']} name='GitHub' profile='JngoCreates' />
              </Grid>
            </footer>
          </Grid>
          <Modal id='msg-modal'
            open={this.state.msgModalOpen}
            onClose={this.onClose}
            aria-labelledby='msg-modal-title'
            aria-describedby='msg-modal-description'>
            <Box sx={modalStyle}>
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
                <TextField id='email-field'
                  required
                  label='Your email address.'
                  type='email'
                  helperText='I will reach out to you via email.'
                  color={this.emailValid() ? 'success' : 'error'}
                  onChange={(event) => this.setState({ email: event.currentTarget.value })}
                  value={this.state.email}
                  variant='outlined'
                  fullWidth />
                <TextField id='message-field'
                  required
                  color={this.state.message === '' ? 'error' : 'success'}
                  label='Your request'
                  helperText='Describe in as much detail as possible.'
                  onChange={(event) => this.setState({ message: event.currentTarget.value })}
                  value={this.state.message}
                  multiline
                  variant='outlined'
                  fullWidth
                  minRows={8} />
                <TextField id='price-field'
                  required
                  color={(this.state.price <= 0 || isNaN(this.state.price)) ? 'error' : 'success'}
                  type='number'
                  label='Your price'
                  helperText='United States dollar only.'
                  onChange={(event) => this.setState({ price: parseInt(event.currentTarget.value) })}
                  value={this.state.price}
                  variant='outlined'
                  fullWidth />
                <Button id='submit-request-button'
                  disabled={!this.emailValid() || this.state.message === '' || (this.state.price <= 0 || isNaN(this.state.price))}
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