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
               "title":  "Welcome to ArcheRage Tools!",
               "body":  "This is a rehost of Dyani's fork of mokulu's Archeage tools project, all credits to them\n\n\n<b>PAY YOUR TAXES LOSERS</b>"+
               "\n<img src='https://i.imgur.com/gd5aZ0U.png' width='750' height='350'>",
               "author":  "Archey",
               "createDate":  "8/13/2023",
               "editDate":  "",
               "comments":  "test",
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
