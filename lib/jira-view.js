'use babel';

import { CompositeDisposable } from 'atom';

var _JIRA_AUTH_STRING_ = "cmhuLXN1cHBvcnQtcGZlc3Rvc286RmVzdGVyc29uIQ==";

function getJiras(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.setRequestHeader("Authorization", "Basic " + _JIRA_AUTH_STRING_);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return JSON.parse(xhttp.responseText);
}

export default {

  subscriptions: null,

  config:
    someInt:
      type: 'integer'
      default: 23
      minimum: 1

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jira-view:backlog': () => this.getMyBacklog()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jira-view:working': () => this.getMyWorking()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jira-view:testing': () => this.getMyTesting()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jira-view:verified': () => this.getMyVerified()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jira-view:closed': () => this.getMyClosed()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jira-view:test': () => this.test()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {
    };
  },

  test() {
    console.log("test");
  },

  getMyClosed() {
    console.log('JiraView getting open Jiras with a Closed status.');
    var url = "http://issues.jboss.org/rest/api/2/search?jql=assignee=currentUser() and status=Closed&fields=id,key,status";
    var json = getJiras(url);
    issues = json['issues'];
    console.log(json);
  },

  getMyBacklog(){
    console.log('JiraView getting open Jiras not in a Working status.');
    var url = "https://issues.jboss.org/rest/api/2/search?jql=assignee=currentUser()%20and%20status%20in%20(New,Open,Reopened)&fields=id,key,status";
    var json = getJiras(url);
    issues = json['issues'];
    console.log(json);
  },

  getMyWorking(){
    console.log('JiraView getting Jiras with a Working status.');
    var url = "https://issues.jboss.org/rest/api/2/search?jql=assignee=currentUser()%20and%20status%20in%20('In Progress','SME Review','Peer Review','Pull Request Sent')&fields=id,key,status";
    var json = getJiras(url);
    issues = json['issues'];
    console.log(JSON.stringify(issues));
  },

  getMyTesting(){
    console.log('JiraView getting Jiras with a Testing status.');
    var url = "https://issues.jboss.org/rest/api/2/search?jql=assignee=currentUser()%20and%20status%20in%20('Ready for Test','Under Test')&fields=id,key,status";
    var json = getJiras(url);
    issues = json['issues'];
    console.log(json);
  },

  getMyVerified(){
    console.log('JiraView getting Jiras with a Verified status.');
    var url = "https://issues.jboss.org/rest/api/2/search?jql=assignee=currentUser()%20and%20status%20in%20(Verified)&fields=id,key,status";
    var json = getJiras(url);
    issues = json['issues'];
    console.log(json);
  },

};
