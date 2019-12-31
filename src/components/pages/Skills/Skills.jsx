import {
  AppBar,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  Replay,
  Share,
} from '@material-ui/icons';
import cn from 'classnames';
import CopyDialog from 'components/CopyDialog';
import { MAX_POINTS } from 'constants/skills';
import SKILLSET from 'data/skillsets';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  decodeAncestrals,
  decodeSkillHex,
  encodeAncestrals,
  encodeSkillsAsHex,
  findClassName,
  getPointReq,
  getTreePoints,
} from 'utils/skills';
import { setTitle } from 'utils/string';
import SkillCombos from './SkillCombos';
import SkillTree from './SkillTree';

class Skills extends Component {
  state = {
    skillTrees: [
      { treeName: null, skills: [], ancestrals: [] },
      { treeName: null, skills: [], ancestrals: [] },
      { treeName: null, skills: [], ancestrals: [] },
    ],
    share: false,
    shareCode: null,
  };

  loadBuild = (props) => {
    const { location } = props;
    if (location.hash) {
      const dataString = location.hash.substr(1);
      this.setState({ skillTrees: this.decodeSkillTrees(dataString) });
    } else {
      this.setState({ skillTrees: this.decodeSkillTrees('') });
    }
  };

  componentDidMount() {
    this.loadBuild(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.location.hash !== this.props.location.hash) {
      this.loadBuild(nextProps);
    }
  }

  setSkillTree = (treeId, treeName) => {
    const { skillTrees: skillTreesOld } = this.state;
    const skillTrees = [...skillTreesOld];
    skillTrees[treeId] = { treeName, skills: [], ancestrals: [] };
    this.setState({ skillTrees });
  };

  setSkill = (treeId, skillId, value) => {
    const { skillTrees: skillTreesOld } = this.state;
    const skillTrees = [...skillTreesOld];
    const skills = [...skillTrees[treeId].skills];

    const remainingPoints = MAX_POINTS - this.getSpentPoints();
    const spentPoints = getTreePoints(skills);
    const currentValue = Boolean(skills[skillId]);

    // no change, do nothing
    if (value === currentValue) return;

    // validate the change
    if (value === true) {
      // no points available, do nothing
      if (remainingPoints === 0) return;
      // not enough points spent to unlock
      if (spentPoints < getPointReq(skillId)) return;
    } else {
      // can't take points out of skills if it would lock out a learned skill
      if (skillId !== 11 && Boolean(skills[11]) && getPointReq(11) > spentPoints - 2) return;
      if (skillId !== 7 && Boolean(skills[7]) && getPointReq(7) > spentPoints - 2) return;
      if (skillId !== 3 && Boolean(skills[3]) && getPointReq(3) > spentPoints - 2) return;
    }

    skills[skillId] = value === true ? 1 : 0;
    skillTrees[treeId].skills = skills;
    this.setState({ skillTrees });
  };

  setAncestral = (treeId, ancestralId, value) => {
    const { skillTrees: skillTreesOld } = this.state;
    const skillTrees = [...skillTreesOld];
    const ancestrals = [...skillTrees[treeId].ancestrals];

    ancestrals[ancestralId] = value;
    skillTrees[treeId].ancestrals = ancestrals;
    this.setState({ skillTrees });
  };

  resetSkillTree = (treeId) => {
    const { skillTrees } = this.state;
    this.setSkillTree(treeId, skillTrees[treeId].treeName);
  };

  selectAllTrees = (trees) => {
    this.setState({
      skillTrees: [
        { treeName: trees[0], skills: [], ancestrals: [] },
        { treeName: trees[1], skills: [], ancestrals: [] },
        { treeName: trees[2], skills: [], ancestrals: [] },
      ],
    });
  };

  resetAllTrees = () => {
    const { skillTrees } = this.state;
    this.selectAllTrees(skillTrees.map(tree => tree.treeName));
  };

  encodeSkillTrees = () => {
    const { skillTrees } = this.state;
    return skillTrees.filter(tree => Boolean(tree.treeName)).map(tree => {
      if (!tree.treeName) {
        return '';
      }
      const ancestrals = encodeAncestrals(tree.ancestrals);
      return `${tree.treeName}.${encodeSkillsAsHex(tree.skills)}${ancestrals && `.${ancestrals}` || ''}`;
    }).join(':');
  };

  decodeSkillTrees = (data) => {
    const decodedTrees = data.split(':').map(rawTree => {
      let treeName;
      let skills;
      let ancestrals;
      if (rawTree.indexOf(',') >= 0) {
        [treeName, skills, ancestrals] = rawTree.split(',');
      } else {
        [treeName, skills, ancestrals] = rawTree.split('.');
      }
      if (!SKILLSET[treeName] || SKILLSET[treeName].visible === false) {
        treeName = null;
        skills = [];
        ancestrals = [];
      } else {
        skills = decodeSkillHex(skills);
        ancestrals = decodeAncestrals(ancestrals);
      }
      return { treeName, skills, ancestrals };
    });
    while (decodedTrees.length < 3) {
      decodedTrees.push({ treeName: null, skills: [], ancestrals: [] });
    }
    if (decodedTrees.length > 3) {
      decodedTrees.unshift(decodedTrees.length - 3);
    }
    return decodedTrees;
  };

  handleShare = () => {
    this.setState({ share: true, shareCode: this.encodeSkillTrees(), copied: false });
  };

  handleClose = () => {
    this.setState({ share: false });
  };

  getSpentPoints = () => {
    return this.state.skillTrees.map(tree => getTreePoints(tree.skills)).reduce((a, b) => a + b);
  };

  render() {
    const { skillTrees, share, shareCode } = this.state;
    const { location, mobile } = this.props;

    let className;
    if (skillTrees[0].treeName && skillTrees[1].treeName && skillTrees[2].treeName) {
      className = findClassName(skillTrees[0].treeName, skillTrees[1].treeName, skillTrees[2].treeName);
    }
    const selectedClasses = skillTrees.map(tree => tree.treeName);

    const spentPoints = this.getSpentPoints();
    const remainingPoints = MAX_POINTS - spentPoints;

    if (className) {
      setTitle(`${className} Build`);
    } else {
      setTitle('Skill Builder');
    }

    return (
      <div className="skills-container">
        <div className="skills-header">
          <Paper className="section">
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="subtitle1" className="title-text">Skill
                  Builder{className && `: ${className}`}</Typography>
                <Typography variant="subtitle2">{spentPoints}/{MAX_POINTS}</Typography>
                <Tooltip title="Reset All Trees">
                  <IconButton color="inherit" aria-label="Reset" onClick={this.resetAllTrees}>
                    <Replay />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share Build" onClick={this.handleShare}>
                  <IconButton color="inherit" aria-label="Share">
                    <Share />
                  </IconButton>
                </Tooltip>
              </Toolbar>
            </AppBar>
          </Paper>
        </div>
        <div className={cn('section', 'skill-trees', { mobile })}>
          {[0, 1, 2].map(treeId =>
            <SkillTree
              treeId={treeId}
              key={`tree-${treeId}`}
              setSkillTree={this.setSkillTree}
              setSkill={this.setSkill}
              setAncestral={this.setAncestral}
              resetSkillTree={this.resetSkillTree}
              skillTree={skillTrees[treeId]}
              remainingPoints={remainingPoints}
              selectedClasses={selectedClasses}
            />,
          )}
        </div>
        <CopyDialog
          open={share}
          handleClose={this.handleClose}
          title="Share Build"
          label="Shareable Link"
          value={`${window.location.protocol}//${window.location.host}${location.pathname}#${shareCode}`}
        />
        <SkillCombos skillTrees={skillTrees} />
      </div>
    );
  }
}

const mapStateToProps = ({ display: { mobile } }) => ({
  mobile,
});

export default connect(mapStateToProps, null)(Skills);
