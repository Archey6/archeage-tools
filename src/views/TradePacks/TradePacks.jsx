import {
  AppBar,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ReplayIcon from '@material-ui/icons/Replay';
import { openDialog } from 'actions/display';
import {
  resetSettings,
  setContinent,
  setOutlet,
  setPercentage,
  setWar,
} from 'actions/tradepacks';
import cn from 'classnames';
import Item from 'components/Item';
import { DIALOG_PROFICIENCY } from 'constants/display';
import { CONTINENT } from 'constants/map';
import {
  AGED_PACK,
  CARGO,
  CARGO_OUTLET,
  NO_FRESHNESS,
  OUTLET_ZONE,
  PACK_TYPE,
} from 'constants/tradepacks';
import TRADE_PACKS from 'data/tradepacks';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTitle } from 'utils/string';
import FreshnessBlip from './FreshnessBlip';
import PackViewer from './PackViewer';

class TradePacks extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    reset: false,
    open: false,
    packType: null,
    originZone: null,
  };

  setZone = this.props.setOutlet;

  setContinent = (e, value) => {
    this.props.setContinent(e, value);
    this.props.setOutlet(e, 0);
  };

  requestReset = () => {
    this.setState({ reset: true });
  };

  cancelReset = () => {
    this.setState({ reset: false });
  };

  handleReset = () => {
    this.props.resetSettings();
    this.cancelReset();
  };

  onOpenCalculator = (originZone, packType) => {
    this.setState({ open: true, originZone, packType });
  };

  onCloseCalculator = () => {
    this.setState({ open: false, originZone: null, packType: null });
  };

  render() {
    const { mobile, continent, percentage, war, outlet } = this.props;
    const { setPercentage, setWar, openDialog } = this.props;
    const { reset, open, packType, originZone } = this.state;

    let continentZones = [CONTINENT.HARANYA.name, CONTINENT.NUIA.name];
    if (continent !== CARGO) {
      continentZones = Object.values(CONTINENT).find((cont) => cont.name === continent).zones;
    }

    const outletZones = OUTLET_ZONE.filter(zone => continentZones.includes(zone));
    let sellZone = outletZones[outlet];
    if (continent === CARGO) {
      sellZone = CARGO;
    }

    setTitle('Trade Pack Calculator');

    return (
      <div className={cn('tool-container', { mobile })}>
        <Paper className="section">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" className="title-text">Trade Pack Calculator</Typography>
              <Tooltip title="Reset All Settings">
                <IconButton color="inherit" aria-label="Reset" onClick={this.requestReset}>
                  <ReplayIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <div className="tradepack-settings">
            <FormControl>
              <InputLabel htmlFor="continent">Pack Continent</InputLabel>
              <Select
                value={continent}
                onChange={this.setContinent}
                inputProps={{
                  name: 'continent',
                  id: 'continent',
                }}
                renderValue={() => <div>{continent}</div>}
              >
                <MenuItem value="Haranya">Haranya</MenuItem>
                <MenuItem value="Nuia">Nuia</MenuItem>
                <MenuItem value={CARGO}>{CARGO}</MenuItem>
              </Select>
            </FormControl>
            <div className="pack-percentage">
              <InputLabel shrink style={{ marginBottom: 6 }}>Pack Demands: {percentage}%</InputLabel>
              <Slider
                onChange={setPercentage(null, null)}
                value={percentage}
                defaultValue={130}
                min={50}
                max={130}
                step={1}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                valueLabelFormat={value => `${value}%`}
              />
            </div>
            <Button
              startIcon={<ListAltIcon />}
              onClick={() => openDialog(DIALOG_PROFICIENCY)}
            >
              Configure Proficiency
            </Button>
          </div>
        </Paper>
        <Dialog open={reset}>
          <DialogTitle>Reset all settings?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to reset all settings?<br />
              This will clear all saved percentages and item prices.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancelReset}>Cancel</Button>
            <Button color="primary" onClick={this.handleReset}>Confirm</Button>
          </DialogActions>
        </Dialog>
        <Paper className="section">
          <AppBar position="static" color="primary">
            <Toolbar variant="dense">
              {continent !== CARGO &&
              <Tabs
                value={outlet}
                onChange={this.setZone}
                className="title-text"
              >
                {outletZones.map(zone => (
                  <Tab key={`${continent}-${zone}`} label={zone} />
                ))}
              </Tabs>}
              {continent === CARGO &&
              <Typography variant="subtitle1" className="title-text">Cargo</Typography>}
              {continent !== CARGO && outlet === 2 &&
              <FormControlLabel
                control={
                  <Checkbox
                    checked={war[sellZone] || false}
                    onChange={setWar(sellZone)}
                  />
                }
                label="War (+15%)"
              />}
            </Toolbar>
          </AppBar>
          <div style={{ overflow: 'auto' }}>
            <Table size="small" className="trade-table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    {continent !== CARGO && 'Pack Origin'}
                  </TableCell>
                  {(continent === CARGO ? CARGO_OUTLET : Object.values(PACK_TYPE)).map(packType => (
                    <TableCell
                      key={`type-head-${packType}`}
                      align="center"
                    >
                      {packType}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {continentZones.map(zone => {
                  const zonePacks = TRADE_PACKS[zone] || { packs: {} };
                  const freshness = zonePacks.freshness;
                  return (
                    <TableRow
                      key={`pack-row-${zone}`}
                      className={freshness.name}
                    >
                      <TableCell
                        className={cn({ 'no-pack': zone === sellZone })}
                      >
                        {zone}{continent === CARGO && 'n Cargo'}
                      </TableCell>
                      {(continent === CARGO ? CARGO_OUTLET : Object.values(PACK_TYPE)).map(packType => {
                        const pack = zonePacks.packs[packType] || { sell: {} };
                        let packValue = pack.sell[sellZone];
                        // modify the pack's value
                        if (packValue) {
                          // modify the percentage
                          packValue = packValue * (percentage / 130);
                          // modify the freshness
                          const packFreshness = freshness[AGED_PACK.includes(packType) ? 'AGED' : 'STANDARD'];
                          if (packFreshness.HIGH && !NO_FRESHNESS.includes(packType)) {
                            packValue *= packFreshness.HIGH.modifier;
                          }
                          // modify war bonus
                          if (war[sellZone]) {
                            packValue *= 1.15;
                          }
                          // round to fixed 4 decimal
                          packValue = (Math.round(packValue * 10000) / 10000).toFixed(4);
                        }
                        const isPack = (zone !== sellZone && packValue);
                        let displayValue = isPack ? `${packValue}g` : '--';
                        if (isPack && continent === CARGO && pack.item) {
                          displayValue = <>
                            {Math.round(packValue)}&nbsp;
                            <Item id={pack.item} inline />
                          </>;
                        }
                        const cell = (
                          <TableCell
                            key={`pack-${zone}-${packType}`}
                            align="right"
                            className={cn({ 'no-pack': !isPack })}
                            onClick={isPack ? () => this.onOpenCalculator(zone, packType) : null}
                          >
                            {displayValue}
                          </TableCell>
                        );
                        return (
                          <Tooltip
                            title={`Customize ${continent !== CARGO
                              ? `${pack.name || `${zone} ${packType}`} -> ${sellZone}`
                              : `${zone}n Cargo -> ${packType}`}`}
                            key={`pack-${zone}-${packType}`}
                            classes={{ tooltip: 'nowrap' }}
                          >
                            {cell}
                          </Tooltip>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="trade-footer body-container">
            {continent !== CARGO &&
            <>
              <FreshnessBlip freshness="Luxury" />
              <FreshnessBlip freshness="Fine" />
              <FreshnessBlip freshness="Commercial" />
              <FreshnessBlip freshness="Preserved" />
            </> ||
            <FreshnessBlip freshness="Cargo" />}
            <Typography variant="overline">
              Prices shown at {percentage}% demand with high profit{war[sellZone] ? ' and +15% war bonus' : ''}. 2%
              interest is not shown.
            </Typography>
          </div>
        </Paper>
        <PackViewer
          originZone={originZone}
          packType={packType}
          sellZone={sellZone}
          open={open}
          onClose={this.onCloseCalculator}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ display: { mobile }, tradepacks: { continent, percentage, war, outlet } }) => ({
  mobile,
  continent,
  outlet,
  percentage,
  war,
});

const mapDispatchToProps = {
  setContinent,
  setOutlet,
  setPercentage,
  setWar,
  resetSettings,
  openDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(TradePacks);