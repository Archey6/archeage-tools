import {
  AppBar,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import {
  fetchSkillsets,
  findClassName,
} from 'actions/gameData';
import cn from 'classnames';
import {
  DEFAULT_SKILLS,
  MAX_POINTS,
} from 'constants/skills';
import { equals } from 'ramda';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { objectHasProperties } from 'utils/object';
import {
  decodeSkillString,
  encodeSkillsets,
  getPointReq,
  getTreePoints,
  legacyDecodeSkillString,
} from 'utils/skills';
import { setTitle } from 'utils/string';
import SkillCombos from './SkillCombos';
import SkillTree from './SkillTree';

class Skills extends Component {
  state = {
    skillsets: [
      { id: null, skills: DEFAULT_SKILLS, ancestrals: [] },
      { id: null, skills: DEFAULT_SKILLS, ancestrals: [] },
      { id: null, skills: DEFAULT_SKILLS, ancestrals: [] },
    ],
  };

  componentDidMount() {
    this.props.fetchSkillsets();
  }

  loadBuild = (props) => {
    const { location } = props;
    if (location.hash && location.hash.length > 0) {
      const dataString = location.hash.substr(1);
      const isLegacy = dataString.includes('.') || dataString.includes(',');
      const skillsets = isLegacy ? legacyDecodeSkillString(dataString) : decodeSkillString(dataString);
      if (isLegacy) {
        this.updateHash(skillsets);
      }
      if (!equals(skillsets, this.state.skillsets)) {
        this.setState({ skillsets });
      }
    } else {
      this.setState({ skillsets: decodeSkillString('') });
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.location.hash !== this.props.location.hash || objectHasProperties(nextProps.skillsets) !== objectHasProperties(this.props.skillsets)) {
      this.loadBuild(nextProps);
    }
  }

  setSkillTree = (treeId, id) => {
    const { skillsets: skillTreesOld } = this.state;
    const skillsets = [...skillTreesOld];
    skillsets[treeId] = { id, skills: DEFAULT_SKILLS, ancestrals: [] };
    this.updateHash(skillsets);
  };

  setSkill = (setId, skillIndex, value) => {
    const { skillsets: skillTreesOld } = this.state;
    const skillsets = [...skillTreesOld];
    const skills = [...skillsets[setId].skills];

    const remainingPoints = MAX_POINTS - this.getSpentPoints();
    const spentPoints = getTreePoints(skills);
    const currentValue = Boolean(skills[skillIndex]);

    // no change, do nothing
    if (value === currentValue) return;

    // validate the change
    if (value === true) {
      // no points available, do nothing
      if (remainingPoints === 0) return;
      // not enough points spent to unlock
      if (spentPoints < getPointReq(skillIndex * 5)) return;
    } else {
      // can't take points out of skills if it would lock out a learned skill
      if (skillIndex !== 11 && Boolean(skills[11]) && getPointReq(55) > spentPoints - 2) return;
      if (skillIndex !== 7 && Boolean(skills[7]) && getPointReq(35) > spentPoints - 2) return;
      if (skillIndex !== 3 && Boolean(skills[3]) && getPointReq(15) > spentPoints - 2) return;
    }

    skills[skillIndex] = value === true ? 1 : 0;
    skillsets[setId].skills = skills;
    this.updateHash(skillsets);
  };

  setAncestral = (setId, ancestralId, ancestralIndex) => {
    const { skillsets: oldSkillsets } = this.state;
    const skillsets = [...oldSkillsets];
    const ancestrals = [...skillsets[setId].ancestrals];

    ancestrals[ancestralId] = ancestralIndex;
    skillsets[setId].ancestrals = ancestrals;
    this.updateHash(skillsets);
  };

  resetSkillTree = (setId) => {
    const { skillsets } = this.state;
    this.setSkillTree(setId, skillsets[setId].id);
  };

  selectAllTrees = (trees) => {
    this.updateHash([
      { id: trees[0], skills: [], ancestrals: [] },
      { id: trees[1], skills: [], ancestrals: [] },
      { id: trees[2], skills: [], ancestrals: [] },
    ]);
  };

  resetAllTrees = () => {
    const { skillsets } = this.state;
    this.selectAllTrees(skillsets.map(tree => tree.id));
  };

  getSpentPoints = () => {
    return this.state.skillsets.map(tree => getTreePoints(tree.skills)).reduce((a, b) => a + b);
  };

  updateHash = (skillsets) => {
    window.location.hash = '#' + encodeSkillsets(skillsets);
  };

  render() {
    const { skillsets } = this.state;
    const { mobile, findClassName } = this.props;

    let className;
    const selectedSkillsets = skillsets.map(sks => sks.id);
    if (skillsets.every(sks => Boolean(sks.id))) {
      className = findClassName(selectedSkillsets);
    }

    const spentPoints = this.getSpentPoints();
    const remainingPoints = MAX_POINTS - spentPoints;

    if (className) {
      setTitle(`${className} Build`);
    } else {
      setTitle('Skill Calculator');
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
                    <ReplayIcon />
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
              treeData={skillsets[treeId]}
              remainingPoints={remainingPoints}
              selectedSkillset={selectedSkillsets}
            />,
          )}
        </div>
        <SkillCombos skillTrees={skillsets} />
      </div>
    );
  }
}

const mapStateToProps = ({ display: { mobile }, gameData: { skillsets } }) => ({
  mobile,
  skillsets,
});

const mapDispatchToProps = {
  findClassName,
  fetchSkillsets,
};

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
