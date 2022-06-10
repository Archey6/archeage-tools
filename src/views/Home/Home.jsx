import {
  AppBar,
  Button,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { push } from 'actions/navigate';
import AdContainer from 'components/AdContainer';
import Banner from 'components/Banner';
import IfPerm from 'components/IfPerm';
import config from 'config';
import { banners } from 'constants/navigation';
import React, { Component } from 'react';
import { object } from 'react-proptypes';
import { connect } from 'react-redux';
import {
  scrollToTop,
  setTitle,
  substitute,
} from 'utils/string';
import xhr from 'utils/xhr';
import NewsPost from './NewsPost';

class Home extends Component {
  static propTypes = {
    location: object,
  };

  state = {
    posts: [{"id":  1,
             "title":  "Welcome to ArcheRage!",
             "body":  "The official Mokulu is no longer up, "+
             "but he left a big part of his legacy available, which is very good! \n\n " +
             "As our server has customized events I decided to invest a part of my time "+
             "to facilitate the daily life of the new players that i am also a part of.\n\n"+
             "\n\n"+
             "The idea is to make the schedules part work, i have no experience with react, "+
             "and by the way it took me a while to upload this to heroku. "+
             "My job now is to map event times.\n\n" +

             "I'll be honest, I'm doing something very basic, but if you still like it "+
             "and it's useful, I invite you to donate some gold in the game, send something to ' <b>Dyani</b> ' 🐱 "+
             "but if you are some kind of dollar tycoon here goes my paypal ' <b>ferna126@hotmail.com</b> '\n\n" +
             "Forgive me for my basic english of 'google translator'...\n\n\n\n"+
             "<img src='https://github.com/fernandogfo/archeage-tools/blob/data/static/images/leprechaun.png?raw=true'>",
             "author":  "Dyani",
             "createDate":  "10/06/2022",
             "editDate":  "",
             "comments":  "teste",
             "commentCount":  0,
             "loading":  ""}],
    page: 1,
    pages: 1,
    loading: false,
    error: null,
  };

  getPageHash = () => {
    const hash = location.hash || '';
    const match = hash.match(/#page=([0-9]+)/i);
    return Math.max(1, match ? Number(match[1]) : 1);
  };

  componentDidMount() {
    this.loadPage(this.getPageHash(), false);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.hash !== this.props.location.hash) {
      this.loadPage(this.getPageHash(), true);
    }
  }

  loadPage = (page, scroll = true) => {
    if (this.state.page === page) return;
    this.setState({ error: null, loading: true });

    xhr.get(substitute(config.endpoints.service.newsPage, { page }))
    .then(({ data }) => {
      this.setState({ ...data, loading: false });
      if (Number(data.page) !== 1 || document.location.hash) {
        document.location.hash = `#page=${data.page}`;
      }
      if (scroll) {
        scrollToTop();
      }
    })
    .catch(() => {
      this.setState({ error: 'Failed to get news posts.', loading: false });
    });
  };

  render() {
    const { posts, page, pages, loading, error } = this.state;

    setTitle('News');
    return [
      <AppBar position="static" key="news-header" className="section" style={{ marginBottom: 0 }}>
        <Toolbar variant="dense">
          <Typography variant="h4" className="title-text">News</Typography>
          <IfPerm permission="news.create">
            <Tooltip title="Create New Post">
              <IconButton color="inherit" onClick={() => push('/news/create')}>
                <CreateIcon />
              </IconButton>
            </Tooltip>
          </IfPerm>
        </Toolbar>
      </AppBar>,
      <div className="news-container section" key="news-main">
        <div className="home-banners">
          {banners.map(banner => <Banner {...banner} key={banner.name} />)}
          <AdContainer type="square" section={false} />
        </div>
        <div className="news-list">
          {loading && [0, 1, 2, 3, 4].map(i => <NewsPost loading={true} key={`loading-${i}`} />)}
          {error &&
          <Typography variant="h6" className="alert-red">{error}</Typography>}
          {posts.length > 0 && !error &&
          posts.map(post => <NewsPost key={`news-${post.id}`} {...post} />)}
          <Paper className="pagination-control">
            <Button
              startIcon={<KeyboardArrowLeftIcon />}
              disabled={page === 1}
              onClick={() => this.loadPage(page - 1)}
            >
              Page {Math.max(1, page - 1)}
            </Button>
            <Button
              endIcon={<KeyboardArrowRightIcon />}
              disabled={page === pages}
              onClick={() => this.loadPage(page + 1)}
            >
              Page {Math.min(pages, page + 1)}
            </Button>
          </Paper>
        </div>
      </div>,
    ];
  }
}

export default connect()(Home);
