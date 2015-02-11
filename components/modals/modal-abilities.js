// main requires
var React = require('react');
var Modal = require('react-bootstrap/Modal');
var Input = require('react-bootstrap/Input');
var Button = require('react-bootstrap/Button');
var Alert = require('react-bootstrap/Alert');
var Col = require('react-bootstrap/Col');
var Row = require('react-bootstrap/Row');

// modal object to export
var AbilityModal = React.createClass ({

  getInitialState : function () {
    var state = {};

    state.str = "";
    state.dex = "";
    state.con = "";
    state.int = "";
    state.wis = "";
    state.cha = "";
    state.profBonus = "";
    state.passPerception = "";
    state.alert = false;
    state.alertMsg = "";
    state.alertType = "";

    return (state);
  },

  handleChange : function (cmp, e) {
    var node = {};
    node[cmp] = e.target.value;
    this.setState(node);
  },

  handleOk : function() {
    var tmp = this.props.character;
    var path = "charAbilities";

    //parse ability scores in state, if NaN show alert and stop saving
    if (this.state.str !== "") {
      var str = parseInt(this.state.str,10);

      if (isNaN(str)) {
        this.setState({
          alert : true,
          alertMsg : "Yo! Enter a number for your strength! Any number will do, jus so that it's a valid decimal number.",
          alertType : "str"
        });
        return;
      }
      // test for NaN first
      tmp['charAbilities']['str']['score'] = str;
      path += '.str.' + this.state.str;
      tmp['charAbilities']['str']['mod'] = Math.floor((str - 10) / 2);
    }

    if (this.state.dex !== "") {
      var dex = parseInt(this.state.dex,10);

      if (isNaN(dex)) {
        this.setState({
          alert : true,
          alertMsg : "Yo! Enter a number for your dexterity! Any number will do, just so that it's a valid decimal number",
          alertType : "dex"
        });
        return;
      }
      tmp['charAbilities']['dex']['score'] = dex;
      path += '.dex.' + this.state.dex;
      tmp['charAbilities']['dex']['mod'] = Math.floor((dex - 10) / 2);
    }

    if (this.state.con !== "") {
      var con = parseInt(this.state.con,10);

      if (isNaN(con)) {
        this.setState({
          alert : true,
          alertMsg : "Yo! Enter a number for your constitution! Any number will do, just so that it's a valid decimal number.",
          alertType : "con"
        });
        return;
      }  
      tmp['charAbilities']['con']['score'] = con;
      path += '.con.' + this.state.con;
      tmp['charAbilities']['con']['mod'] = Math.floor((con - 10) / 2);
    }

    if (this.state.int !== "") {
      var int = parseInt(this.state.int,10);

      if (isNaN(int)) {
        this.setState({
          alert : true,
          alertMsg : "Yo! Enter a number for your intelligence! Any number will do, just do that it's a valid decimal number.",
          alertType : "int"
        });
        return;
      }
      tmp['charAbilities']['int']['score'] = int;
      path += '.int.' + this.state.int;
      tmp['charAbilities']['int']['mod'] = Math.floor((int - 10) / 2);
    }

    if (this.state.wis !== "") {
      var wis = parseInt(this.state.wis,10);

      if (isNaN(wis)) {
        this.setState({
          alert : true,
          alertMsg : "Yo! Enter a number for your wisdom! Any number will do, just so that it's a valid decimal number.",
          alertType : "wis"
        });
        return;
      }
      tmp['charAbilities']['wis']['score'] = wis;
      path += '.wis.' + this.state.wis;
      tmp['charAbilities']['wis']['mod'] = Math.floor((wis - 10) / 2);
    }

    if (this.state.cha !== "") {
      var cha = parseInt(this.state.cha,10);

      if (isNaN(cha)) {
        this.setState({
          alert : true,
          alertMsg : "Yo! Enter a number for your charisma! Any number will do, just so that it's a valid decimal number.",
          alertType : "cha"
        });
        return;
      }
      tmp['charAbilities']['cha']['score'] = cha;
      path += '.cha.' + this.state.cha;
      tmp['charAbilities']['cha']['mod'] = Math.floor((cha - 10) / 2);
    }

    // change variables to allow modification of proficiency
    // check for NaN, alert if NaN is true
    var path = "charProficiencyBonus"

    if (this.state.profBonus !== "") {
      var profBonus = parseInt(this.state.profBonus,10);

      if (isNaN(profBonus)) {
        this.setState({
          alert : true,
          alertMsg : "Yo! Enter a number for your proficiency bonus! Any number will do, just so that it's a valid decimal number.",
          alertType : "profBonus"
        });
        return;
      }
      tmp['charProficiencyBonus']['score'] = profBonus;
      path += '.profBonus.' + this.state.profBonus;
    } 

    // change path to passive perception, and check for NaN
    var path = "charPassivePerception"

    if (this.state.passPerception !== "") {
      var passPerception = parseInt(this.state.passPerception,10);

      if (isNaN(passPerception)) {
        this.setState({
          alert : true,
          alertMsg : "Yo! Enter a number for your passive perception! Any number will do, just so that it's a valid decimal number",
          alertType : "passPerception"
        });
        return;
      }
      tmp['charPassivePerception']['score'] = passPerception;
      path += '.passPerception.' + this.state.passPerception;
    }

    this.props.edit({ path : path, character : tmp });
    this.props.close();
  },

  handleAlert : function() {
    this.setState({ alert : false, alertMsg : "" });
  },

  render : function() {
    var alert;
    var validationStr;
    var validationDex;
    var validationCon;
    var validationInt;
    var validationWis;
    var validationCha;
    var validationProfBonus;
    var validationPassPerception;

    if (this.state.alertType === "str") {
      validationStr = "error";
    }

    if (this.state.alertType === "dex") {
      validationDex = "error";
    }

    if (this.state.alertType === "con") {
      validationCon = "error";
    }

    if (this.state.alertType === "int") {
      validationInt = "error";
    }

    if (this.state.alertType === "wis") {
      validationWis = "error";
    }

    if (this.state.alertType === "cha") {
      validationCha = "error";
    }

    if (this.state.alertType === "profBonus") {
      validationProfBonus = "error";
    }

    if (this.state.alertType === "passPerception") {
      validationPassPerception = "error";
    }

    if (this.state.alert) {
      alert = (
        <Alert bsStyle="danger" onDismiss={this.handleAlert}>
          <h4>{"Critical Failure"}</h4>
          <p>{this.state.alertMsg}</p>
        </Alert>
      );
    }

    else {
      alert = <span />
    } 

    return (
      <Modal onRequestHide={this.props.close} title="Enter Ability Scores">
        <div className="modal-body">
          <p>{"Enter values for your ability scores, proficiency bonus, and passive perception. If a field is left blank and no new values are entered, nothing will be changed."}</p>
          {alert}
          <Input>
            <Row>
              <Col xs={4}>
                <Input type="text" bsStyle={validationStr} onChange={this.handleChange.bind(this, "str")} label="STR" placeholder={this.props.character['charAbilities']['str']['score']} value={this.state.str}/>
              </Col>
              <Col xs={4}>
                <Input type="text" bsStyle={validationDex} onChange={this.handleChange.bind(this, "dex")} label="DEX" placeholder={this.props.character['charAbilities']['dex']['score']} value={this.state.dex}/>
              </Col>
              <Col xs={4}>
                <Input type="text" bsStyle={validationCon} onChange={this.handleChange.bind(this, "con")} label="CON" placeholder={this.props.character['charAbilities']['con']['score']} value={this.state.con}/>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <Input type="text" bsStyle={validationInt} onChange={this.handleChange.bind(this, "int")} label="INT" placeholder={this.props.character['charAbilities']['int']['score']} value={this.state.int}/>
              </Col>
              <Col xs={4}>
                <Input type="text" bsStyle={validationWis} onChange={this.handleChange.bind(this, "wis")} label="WIS" placeholder={this.props.character['charAbilities']['wis']['score']} value={this.state.wis}/>
              </Col>
              <Col xs={4}>
                <Input type="text" bsStyle={validationCha} onChange={this.handleChange.bind(this, "cha")} label="CHA" placeholder={this.props.character['charAbilities']['cha']['score']} value={this.state.cha}/>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <Input type="text" bsStyle={validationProfBonus} onChange={this.handleChange.bind(this, "profBonus")} label="Proficiency Bonus" placeholder={this.props.character['charProficiencyBonus']['score']} value={this.state.profBonus}/>
              </Col>
              <Col xs={4}>
                <Input type="text" bsStyle={validationPassPerception} onChange={this.handleChange.bind(this, "passPerception")} label="Passive Perception" placeholder={this.props.character['charPassivePerception']['score']} value={this.state.passPerception}/>
              </Col>
            </Row>
          </Input>
        </div>
        <div className="modal-footer">
          <Button bsStyle="danger" onClick={this.props.close}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        </div>
      </Modal>
    );
  }
})

//export modal
module.exports = AbilityModal;
  