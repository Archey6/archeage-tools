import { Typography } from '@material-ui/core';
import { fetchVocations } from 'actions/gameData';
import { updateProficiency } from 'actions/proficiencies';
import cn from 'classnames';
import NumberField from 'components/NumberField';
import { PROFICIENCY_RANK } from 'constants/proficiencies';
import React, { Component } from 'react';
import {
  array,
  func,
  object,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { pascalCase } from 'utils/string';
import * as VocationIcon from '../../images/vocation/';

class Proficiencies extends Component {
  static propTypes = {
    fetchVocations: func.isRequired,
    proficiencies: object,
    vocations: array,
    updateProficiency: func.isRequired,
  };

  componentDidMount() {
    this.props.fetchVocations();
  }

  render() {
    const { updateProficiency, proficiencies, vocations } = this.props;
    return (
      <div className="proficiency-wrapper">
        {Array.from(new Set(vocations.map(v => v.group))).filter(g => Boolean(g)).map(group => (
          <div className="proficiency-group" key={`group-${group}`}>
            <Typography variant="h6">{group}</Typography>
            {vocations.filter(v => v.group === group).map(vocation => {
              const proficiency = proficiencies[vocation.name] || 0;
              const rank = PROFICIENCY_RANK.find(r => r.maxValue >= proficiency);
              const rankIndex = PROFICIENCY_RANK.indexOf(rank);
              const minProficiency = rankIndex === 0 ? 0 : PROFICIENCY_RANK[rankIndex - 1].maxValue;
              const barPercent = (proficiency - minProficiency) / (rank.maxValue - minProficiency);
              return (
                <div className="proficiency" key={`prof-${vocation.name}`}>
                  <img src={VocationIcon[pascalCase(vocation.name)]} alt={vocation.name} />
                  <div className="proficiency-stats" data-grade={rank.grade}>
                    <NumberField
                      className="proficiency-value"
                      label={(
                        <>
                          {rank.grade > 1 && <span className={cn('proficiency-icon', rank.name)} />}
                          <span className="quality-color">{vocation.name}</span>
                        </>
                      )}
                      InputLabelProps={{ className: 'proficiency-name' }}
                      size="small"
                      value={proficiency}
                      onChange={(value) => updateProficiency(vocation.name, Number(value))}
                      InputProps={{
                        disableUnderline: true,
                      }}
                      inputStyle={{ textAlign: 'left' }}
                      min={0}
                      max={230000}
                      step={10000}
                      margin="none"
                    />
                    <div className="proficiency-bar">
                      <div className="quality-bar" style={{ width: `${Math.round(barPercent * 100)}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="spacer" />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ gameData: { vocations }, proficiencies }) => ({
  vocations,
  proficiencies,
});

const mapDispatchToProps = {
  fetchVocations,
  updateProficiency,
};

export default connect(mapStateToProps, mapDispatchToProps)(Proficiencies);
