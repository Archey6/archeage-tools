import {
  IconButton,
  Link,
  Typography,
} from '@material-ui/core';
import { teal } from '@material-ui/core/colors';
import {
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';
import createTypography from '@material-ui/core/styles/createTypography';
import { ThemeProvider } from '@material-ui/styles';
import { clearNotification } from 'actions/notification';
import { fetchMe } from 'actions/session';
import cn from 'classnames';
import DiscordButton from 'components/DiscordButton';
import DonateButton from 'components/DonateButton';
import Proficiencies from 'components/MyGame';
import Navigation from 'components/Navigation';
import Notification from 'components/Notification';
import React from 'react';
import {
  bool,
  func,
  node,
  object,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import 'styles/index';
import { watchAdStyle } from 'utils/display';

class Main extends React.PureComponent {
  static propTypes = {
    darkMode: bool,
    session: object,
    fetchMe: func,
    children: node,
    notification: object,
    mobile: bool,
    clearNotification: func.isRequired,
  };

  state = {
    proficienciesOpen: false,
  };

  createPalette = () => {
    const { darkMode } = this.props;

    const palette = createPalette({
      type: darkMode ? 'dark' : 'light',
      primary: teal,
      secondary: {
        main: darkMode ? teal['50'] : teal['900'],
      },
    });

    const theme = createMuiTheme({
      palette,
      typography: createTypography(palette, {
        fontFamily: '"Flareserif821BT-Roman"',
      }),
      overrides: {
        MuiCardHeader: {
          root: {
            padding: 8,
          },
          avatar: {
            marginRight: 8,
          },
        },
        MuiListItemAvatar: {
          root: {
            minWidth: 32,
          },
        },
        MuiListItemIcon: {
          root: {
            minWidth: 24,
            textAlign: 'center',
          },
        },
        MuiExpansionPanelDetails: {
          root: {
            display: 'block',
            padding: '4px 12px 12px',
          },
        },
        MuiTooltip: {
          tooltip: {
            fontSize: '0.8rem',
          },
        },
        MuiListSubheader: {
          sticky: {
            backgroundColor: null,
          },
        },
        MuiInputAdornment: {
          positionEnd: {
            marginLeft: 0,
          },
        },
      },
    });

    return responsiveFontSizes(theme);
  };

  componentDidMount() {
    const { session, fetchMe } = this.props;

    if (session.access_token) {
      fetchMe();
    }

    // prevent adsense from applying height to content wrapper
    window.ready('.content-wrapper, .MuiDialog-container', (element) => {
      watchAdStyle(element);
    });
  }

  render() {
    const { children, notification, darkMode, mobile } = this.props;
    const { clearNotification } = this.props;

    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }

    if (mobile) {
      document.getElementsByTagName('meta').viewport.content = 'width=device-width, initial-scale=1, maximum-scale=1';
    } else {
      document.getElementsByTagName('meta').viewport.content = '';
    }

    return (
      <ThemeProvider theme={this.createPalette()}>
        <>
          <header className="site-header">
            <div className="inner-wrapper">
              <IconButton color="inherit" aria-label="Menu" id="logo-icon-wrapper" className="icon-button">
                <RouterLink id="logo-icon" to="/" />
              </IconButton>
              <Typography variant="h6" className="title title-text">
                AA Classic Tools
              </Typography>

              <Navigation />
            </div>
          </header>
          <div className={cn('content-wrapper', { mobile })}>
            {children}
          </div>
          <footer className="site-footer">
            <div className="inner-wrapper">
              {/* eslint-disable-next-line no-undef */}
              <Typography className="title-text">AA Classic Tools v{__VERSION__}</Typography>
              <Link href="https://www.mokulu.io/privacy-policy" color="inherit" target="_blank">
                <Typography>Privacy Policy</Typography>
              </Link>
              {!mobile &&
              <>
                <DiscordButton />
                <DonateButton />
              </>}
            </div>
          </footer>

          <Notification
            {...notification}
            handleClose={clearNotification}
          />
          <Proficiencies />
        </>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ notification, display: { mobile, darkMode }, session }) => ({
  notification,
  mobile,
  darkMode,
  session,
});

const mapDispatchToProps = {
  clearNotification,
  fetchMe,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
