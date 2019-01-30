import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

import "@polymer/iron-ajax/iron-ajax.js";

class Las2peerUserlistWidget extends PolymerElement {

    static get template() {
        return html`
        <iron-ajax
          id="ajaxGetContacts"
          url='[[baseUrl]]/contactservice/'
          params='{}'
          handle-as="json"
          on-response="_updateContactList"
          on-error="_handleError"
          with-credentials='[[sendCookie]]'
          headers='[[_requestHeaders]]'>
        </iron-ajax>

        <input list="contactlist" name="contactlist">
        <datalist on-change="changeValue" id="contactlist">
            <template is="dom-repeat" items="[[contacts]]">
                <option value="{{item}}">{{item}}</option>
            </template>
        </datalist>`
    }

    static get properties() {
        return {
            data: Object,
            item: Object,
            name: String,
            baseUrl: {
                type: String,
                value: 'https://las2peer.dbis.rwth-aachen.de:9098',
            },
            loginOidcToken: {
                type: String,
                value: null
            },
            contacts: {
                type: Object,
                value: []
            },
            value: {
                type: String
            },
            loggedIn: {
                type: Boolean,
                computed: '_computeLogin(loginOidcToken)'
            },
            loginName: {
                type: String,
                value: null
            },
            loginPassword: {
                type: String,
                value: null
            },
            _requestHeaders: {
                type: Object,
                computed: '_computeHeaders(loginName,loginPassword)'
            },
            sendCookie: {
                type: Boolean,
                value: false
            }
        }
    }

    _computeHeaders(loginName, loginPassword) {
        var headers = {};

        if (loginName != null && loginPassword != null) {
            headers["Authorization"] = "Basic " + btoa(loginName + ":" + loginPassword);
        }
        return headers;
    }

    addUser(list, user) {
        this.push(list, user);
    }

    changeValue() {
        this.value = this.$.contactlist.value;
    }

    handleResponse(e, detail) {
        this.response.apply(this, arguments);
    }

    _computeLogin(loginOidcToken) {
        if (loginName != null)
            return true;
        if (loginOidcToken != null && loginOidcToken != "undefined") {
            return true;
        }
        return false;
    }

    ready() {
        super.ready();
        if (this.loggedIn) {
            this.$.ajaxGetContacts.generateRequest();
        }
    }

    _updateContactList(event) {
        var userliste = event.target.lastResponse.users;
        this.contacts = [];
        for (user in userliste) {
            this.addUser('contacts', userliste[user]);
        }
        if (this.contacts.length > 0) {
            this.value = this.contacts[0];
        }
        this.contacts.sort(function(a, b) {
            if (a.toLowerCase() < b.toLowerCase()) return -1;
            if (a.toLowerCase() > b.toLowerCase()) return 1;
            return 0;
        });
    }

    _handleError(event) {
        //alert(event.target.lastResponse);
        console.log(event._);
    }

    _isNull(val) {
        return val == null;
    }
}

window.customElements.define('las2peer-userlist-widget', Las2peerUserlistWidget);
