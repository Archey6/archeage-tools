import {
  AppBar,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import Skill from 'components/Skill';
import EffectIcon from 'components/Skill/EffectIcon';
import SKILLSET from 'data/skillsets';
import React, { Component } from 'react';
import { array } from 'react-proptypes';
import { connect } from 'react-redux';
import {
  compareBuff,
  deepCopy,
  prepareComboText,
} from 'utils/skills';

class SkillCombos extends Component {
  static propTypes = {
    skillTrees: array.isRequired,
  };

  state = {
    showAll: true,
  };

  toggleVisibility = () => {
    const { showAll } = this.state;
    this.setState({ showAll: !showAll });
  };

  createComboRow = (combo, sub) => {
    const { skill, effect, activator, causes, combos } = combo;
    let nodes = [];
    // starting skill
    if (!sub) {
      nodes.push(
        <div className="combo-skill" key={`sk-${Math.random()}`}>
          <Skill
            skillset={skill.treeName}
            slot={skill.skillId}
            learned={skill.learned}
            noRequirement
            remainingPoints={0}
            {...skill}
          />
          <EffectIcon
            {...effect}
            tooltip={`<span class="text-orange">${skill.name}</span> applies <span class="${effect.negative
              ? 'tt-debuff'
              : 'tt-buff'}">${effect.name}</span>`}
          />
        </div>,
      );
      nodes.push(<div className="combo-arrow" key={`ca2-${Math.random()}`} />);
    }

    // comboing skill
    const comboText = `<span class="text-orange">${activator.name}:</span> ${prepareComboText(causes, activator)}`;
    nodes.push(
      <div className="combo-skill" key={`skc-${Math.random()}`}>
        <Skill
          skillset={activator.treeName}
          slot={activator.skillId}
          learned={activator.learned}
          noRequirement
          remainingPoints={0}
          {...activator}
        />
        {causes.causes ?
          <EffectIcon
            {...causes.causes}
            tooltip={comboText}
          /> :
          <Tooltip title={<div dangerouslySetInnerHTML={{ __html: comboText }} />}>
            <div className="combo-icon" />
          </Tooltip>
        }
      </div>,
    );
    if (combos && combos.length > 0) {
      nodes.push(<div key={`ca-${Math.random()}`} className="combo-arrow" />);
      if (combos.length > 1) {
        nodes = nodes.concat(
          <div className="combo-col" key={`cc-${Math.random()}`}>
            {combos.map((combo, index) =>
              <div
                className="combo-row"
                key={`c-${Math.random()}-${index}`}
              >
                {this.createComboRow(combo, true)}
              </div>,
            )}
          </div>,
        );
      } else {
        nodes = nodes.concat(this.createComboRow(combos[0], true));
      }
    }

    return nodes;
  };

  render() {
    const { skillTrees } = this.props;
    const { showAll } = this.state;
    let combos = [];
    let comboSkills = [];
    let comboActivators = [];

    skillTrees.forEach(skillTree => {
      const { treeName, skills, ancestrals } = skillTree;
      if (!treeName) return;
      const skillSet = SKILLSET[treeName];
      let skillList = deepCopy(skillSet.skills);
      skillSet.ancestrals.forEach((ancestral, ancestralId) => {
        const selected = ancestrals[ancestralId];
        if (selected === 1 || selected === 2) {
          skillList[ancestral.skillId] = {
            ...skillList[ancestral.skillId],
            ...ancestral.variants[selected - 1],
          };
        }
      });
      // embed skill data
      skillList.forEach((skill, skillId) => {
        skill.treeName = treeName;
        skill.learned = skills[skillId] === 1;
        skill.skillId = skillId;
      });

      if (!showAll) {
        skillList = skillList.filter((skill, skillId) => skills[skillId] === 1);
      }

      comboSkills = comboSkills.concat(skillList.filter(skill => skill.combos && skill.combos.length > 0));
      comboActivators = comboActivators.concat(skillList.filter(skill => skill && skill.effects && skill.effects.length > 0));
    });

    const findComboSkills = (effect) => {
      const skills = [];
      comboSkills.forEach(comboSkill => {
        const combos = comboSkill.combos.filter(combo => compareBuff(combo.buff, effect));
        if (combos.length > 0) {
          skills.push({ skill: comboSkill, combos });
        }
      });
      return skills;
    };

    const createCombosForEffects = (skill, effects, notSkills) => {
      const combos = [];
      // add this skill to the list of subcombos to skip
      notSkills = deepCopy(notSkills);
      notSkills.push(skill.name);
      effects.forEach(effect => {
        // look for combos on this effect
        findComboSkills(effect).forEach(comboSkill_ => {
          const { skill: comboSkill, combos: comboEffects } = comboSkill_;
          if (notSkills.includes(comboSkill.name)) return;
          const causeEffects = comboEffects.filter(combo => combo.causes);
          const subCombos = causeEffects.length > 0
            ? createCombosForEffects(comboSkill, causeEffects.map(combo => combo.causes), notSkills) : null;
          comboEffects.forEach(comboEffect => {
            combos.push({
              skill,
              effect,
              activator: comboSkill,
              causes: comboEffect,
              combos: subCombos,
            });
          });
        });
      });
      return combos;
    };

    // loop through all activators
    comboActivators.forEach(skill => {
      combos = combos.concat(createCombosForEffects(skill, skill.effects, []));
    });

    combos = combos.sort((a, b) => a.skill.name > b.skill.name ? 1 : -1);

    return (
      <Paper className="skill-combos section">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="subtitle1" className="title-text">{showAll ? 'Available'
              : 'Learned'} Combos ({combos.length})</Typography>
            <Tooltip title={`Show ${showAll ? 'Only Learned' : 'All Available'} Combos`}>
              <IconButton color="inherit" aria-label="Toggle Visibility" onClick={this.toggleVisibility}>
                {showAll ? <ToggleOffIcon /> : <ToggleOnIcon />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <div className="combos-list">
          {combos.length === 0 &&
          <Typography>You have no {showAll ? 'available' : 'learned'} combos.</Typography>}
          {combos.map((combo, index) =>
            <div className="combo-row" key={`c-${index}`}>
              {this.createComboRow(combo)}
            </div>,
          )}
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = ({ gameData: { skillsets } }) => ({
  skillsets,
});

export default connect(mapStateToProps, null)(SkillCombos);
