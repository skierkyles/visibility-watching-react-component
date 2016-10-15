import React from 'react';
import ReactDOM from 'react-dom';
import WatchVisibility from '../../dist/index';

const TEXT_STYLE = {
  textAlign: 'center',
  fontFamily: 'system, Helvetica, sans',
  color: 'white',
  fontSize: '120px'
}

const WatchMe = props => {
  return (
    <div style={{backgroundColor: 'teal', position: 'relative'}}>
      <h1 style={{...TEXT_STYLE, padding: '150px 0', margin: 0}}>{ `${Math.round(props.visibility)}%` }</h1>
    </div>
  );
};
const WatchMeWrapper = WatchVisibility(WatchMe);

const Header = props => {
  const o = props.visibility / 100;
  return <h1 style={{...TEXT_STYLE, color: 'black', opacity: o}}>React Vizibility Watcher</h1>;
}
const MagicHeader = WatchVisibility(Header);

const Spacer = props => {
  return <div style={{height: '50vh', backgroundColor: props.color}} />
}

const App = () => {
  return (
    <div>
      <MagicHeader />

      <Spacer color="maroon" />
      <WatchMeWrapper />
      <Spacer color="olive" />
      <WatchMeWrapper />
      <Spacer color="navy" />
      <WatchMeWrapper />
    </div>
  );
}

ReactDOM.render(<App/>, document.getElementById('app'));
