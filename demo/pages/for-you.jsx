'use strict';

var React = require('react');
var ReactLiberty = require('../../src/index');
var AppAsset = require('../components/app-asset.jsx');
var CategoryAsset = require('../components/category-asset.jsx');
var List = require('../components/list/list.jsx');
var appService = require('../services/applications-service');
var BackToTopButton = require('../components/back-to-top.jsx');
var FocusManager = require('sunbeam').FocusManager;

var restarted = false;

class ForYou extends React.Component {

  contextTypes: {
    application: React.PropTypes.element
  };

  goTop() {
    this.refs.mainList.goTo(0);
    FocusManager.setFocusTarget('section-navigation');
  }

  render() {
    var self = this;

    if (!restarted) {
      restarted = true
      setTimeout(function(){
        self.forceUpdate();
      }, 2000);
    }

    var styles = {
      container: {
        flexDirection: 'column'
      },
      verticalList: {
        height: 600
      },
      caruselRow: {
        height: 292
      },
      categoriesCaruselRow: {
        height: 292
      },
      categoriesCarusel: {
        paddingTop: 70,
        width: 1140,
        height: 206
      },
      carusel: {
        marginLeft: -7,
        marginBottom: 55,
        width: 1140,
        height: 237
      },
      headerStyle: {
        fontFamily: 'InterstatePro',
        fontWeight: 300,
        height: 20,
        marginBottom: 10,
        fontSize: 24,
        color: '#ffffff'
      }
    };

    //Change after getRecent is implemented
    var recentlyUsed = appService.getApplicationsByCategory('games');
    var recentRow = recentlyUsed.length && (<Div style={styles.caruselRow}>
        <P style={styles.headerStyle}>Recently used</P>
        <List style={styles.carusel}
              itemClass={AppAsset}
              data={recentlyUsed.slice(0,18)}/>
      </Div>);

    var backToTop = recentRow ? <BackToTopButton onSelect={this.goTop.bind(this)} style={styles.caruselRow}/> : null;

    if (!recentRow) {
      return null;
    }

    return (
      <main style={styles.divStyle}>
        <Div style={styles.container}>
          <List cyclic={false} ref="mainList" style={styles.verticalList} orientation="vertical">
            <Div style={styles.caruselRow}>
              <P style={styles.headerStyle}>Featured</P>
              <List style={styles.carusel}
                    itemClass={AppAsset}
                    data={appService.getFeatured().slice(0,18)}/>
            </Div>
            {recentRow}
            {backToTop}
          </List>
        </Div>
      </main>
    );
  }
}

module.exports = ForYou;