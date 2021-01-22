import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import "@polymer/paper-card/paper-card.js";
import "@polymer/paper-styles/color.js";
import "@polymer/paper-styles/typography.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/paper-toggle-button/paper-toggle-button.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-icons/communication-icons.js";
import "@polymer/iron-icons/editor-icons.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-form/iron-form.js";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-input/paper-textarea.js";
import "@polymer/paper-spinner/paper-spinner.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/iron-flex-layout/iron-flex-layout.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-badge/paper-badge.js";
import "@polymer/iron-list/iron-list.js";
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-toast/paper-toast.js";
import "@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js";

class Las2peerUserWidget extends PolymerElement {

    static get template() {
      return html`
        <style is="custom-style">
            #errorToast {
                --paper-toast-background-color: red;
                --paper-toast-color: white;
            }
        </style>
        <style>
            :host {
                margin-left: 10px;
            }
            button {
                border: 0px;
            }
            button:focus {
                outline: none;
            }
            #circular {
                width: 40px;
                height: 40px;
                border-radius: 20px;
                -webkit-border-radius: 20px;
                -moz-border-radius: 20px;
                box-shadow: 0 0 8px rgba(0, 0, 0, .8);
                -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, .8);
                -moz-box-shadow: 0 0 8px rgba(0, 0, 0, .8);
            }
            .dropdown-content {
                background-color: white;
                line-height: 20px;
                border-radius: 1px;
                box-shadow: 0px 1px 1px #ccc;
                outline: none;
                margin-top: 42px;
                z-index: 5000;
            }
            #dropdown-button {
                margin-top: -5px;
                width: 40px;
                height: 40px;
                border-radius: 20px;
                -webkit-border-radius: 20px;
                -moz-border-radius: 20px;
                background-image: url('https://raw.githubusercontent.com/rwth-acis/las2peer-frontend-user-widget/master/logo.png');
                background-size: 100% 100%;
                background-color: var(--user-widget-button-background, rgba(0, 0, 0, 0));
                box-shadow: 0 0 6px rgba(0, 0, 0, .6);
                -webkit-box-shadow: 0 0 6px rgba(0, 0, 0, .6);
                -moz-box-shadow: 0 0 6px rgba(0, 0, 0, .6);
                position: relative;
                border: 1px solid white;
            }

            #dropdown-button:hover {
                cursor: pointer;
                box-shadow: 0 0 12px rgba(0, 0, 0, 0.9);
                -webkit-box-shadow: 0 0 12px rgba(0, 0, 0, .9);
                -moz-box-shadow: 0 0 12px rgba(0, 0, 0, .9);
            }

            paper-toggle-button.green {
                --paper-toggle-button-checked-bar-color: var(--paper-green-500);
                --paper-toggle-button-checked-button-color: var(--paper-green-500);
                --paper-toggle-button-checked-ink-color: var(--paper-green-500);
                --paper-toggle-button-unchecked-bar-color: var(--paper-red-500);
                --paper-toggle-button-unchecked-button-color: var(--paper-red-500);
                --paper-toggle-button-unchecked-ink-color: var(--paper-red-500);
            }
            a {
                display: block;
                position: relative;
                padding: 1em;
                text-decoration: none;
            }
            ul {
                margin: 0;
                padding: 0;
            }
            li {
                display: block;
                position: relative;
                margin: 0;
                padding: 0;
            }
            li:not(:last-of-type) {
                border-bottom: 1px solid #eee;
            }
            .horizontal-section {
                padding: 0 !important;
            }
            paper-item {
                --paper-item: {
                    cursor: pointer;
                };
            }
            .sublist {
                padding-left: 20px;
                padding-right: 20px;
            }
            .content {
                @apply(--layout-vertical);
                height: 100%;
            }
            .avatar {
                background-size: 100% 100%;
                float: left;
                overflow: hidden;
                height: 40px;
                width: 40px;
                border-radius: 20px;
                box-sizing: border-box;
                background-color: #ddd;
                background-image: url('https://raw.githubusercontent.com/rwth-acis/las2peer-frontend-user-widget/master/logo.png');
            }
            #itemsList,
            #selectedItemsList {
                @apply(--layout-flex);
            }
            .item {
                @apply(--layout-horizontal);
                cursor: pointer;
                padding: 16px 22px;
                border-bottom: 1px solid #DDD;
            }
            .item:focus,
            .item.selected:focus {
                outline: 0;
                background-color: #ddd;
            }
            .item.selected .star {
                color: var(--paper-blue-600);
            }
            .pad {
                @apply(--layout-flex);
                @apply(--layout-vertical);
                padding: 0 16px;
            }
            .primary {
                font-size: 16px;
            }
            .secondary {
                font-size: 14px;
            }
            .dim {
                color: gray;
            }
            .star {
                width: 24px;
                height: 24px;
            }
            paper-item {
                white-space: nowrap;
                cursor: pointer;
                position: relative;
            }
            paper-item:hover::after {
                content: "－";
                width: 16px;
                height: 16px;
                display: block;
                border-radius: 50% 50%;
                background-color: var(--google-red-300);
                margin-left: 10px;
                line-height: 16px;
                text-align: center;
                color: white;
                font-weight: bold;
                text-decoration: none;
                position: absolute;
                right: 15px;
                top: calc(50% - 8px);
            }
            .no-selection {
                color: #999;
                margin-left: 10px;
                line-height: 50px;
            }
            #file{
             display: none;
            }
            iron-list {
                @apply(--layout-flex);
            }
            paper-dialog-scrollable {
                @apply(--layout-flex);
            }
            paper-button.green {
                background-color: var(--paper-green-500);
                color: white;
            }
            paper-icon-button.red {
                background-color: var(--paper-red-500);
                color: white;
                height: 32px;
                width: 32px;
                border-radius: 50% 50%;
            }
            a {
                color: #337ab7;
                text-decoration: none;
            }
            a:hover, a:focus{
              color: #23527c;
                text-decoration: none;
            }
        </style>

            <iron-ajax
              id="ajaxUserinformation"
              url='[[baseUrl]]/contactservice/user'
              params='{}'
              handle-as="text"
              on-response="_getUserInformation"
              on-error="_handleError"
              headers='[[_requestHeaders]]'>
            </iron-ajax>

            <iron-ajax id="ajaxContactInformation" url='[[baseUrl]]/contactservice/user/[[contact]]'
              params='{}'
              handle-as="text"
              on-response="_getContactInformation"
              on-error="_handleError"
              headers='[[_requestHeaders]]'>
            </iron-ajax>

            <iron-ajax
              id="ajaxUserinformationUpdate"
              url='[[baseUrl]]/contactservice/user'
              method='POST'
              params='{}'
              body='{"firstName":"[[firstName]]","lastName":"[[lastName]]","userImage":"[[userImage]]"}'
              handle-as="json"
              on-response="_updatedUserInformation"
              on-error="_handleError"
              headers='[[_requestHeaders]]'
              content-type='text/plain'>
            </iron-ajax>

            <iron-ajax
              id="ajaxAddUser"
              url='[[baseUrl]]/contactservice/[[contactToAdd]]'
              method='POST'
              params='{}'
              handle-as="text"
              on-response="contactAdded"
              on-error="_contactAddError"
              headers='[[_requestHeaders]]'>
            </iron-ajax>

            <iron-ajax
              id="ajaxGetContacts"
              url='[[baseUrl]]/contactservice'
              params='{}'
              handle-as="json"
              on-response="_updateContactList"
              on-error="_handleError"
              headers='[[_requestHeaders]]'>
            </iron-ajax>

            <iron-ajax
              id="ajaxRemoveContact"
              url='[[baseUrl]]/contactservice/[[contactToRemove]]'
              method='DELETE'
              params='{}'
              handle-as="text"
              on-response="contactRemoved"
              on-error="_handleError"
              headers='[[_requestHeaders]]'
              content-type='text/plain'>
            </iron-ajax>

            <iron-ajax
              id="ajaxGetPermissions"
              url='[[baseUrl]]/contactservice/permission'
              params='{}'
              handle-as="text"
              on-response="_updatePermission"
              on-error="_handleError"
              headers='[[_requestHeaders]]'>
            </iron-ajax>

            <iron-ajax
              id="ajaxUserPermissionUpdate"
              url='[[baseUrl]]/contactservice/permission'
              method='POST'
              params='{}'
              body='{"firstName":[[firstNamePermission]],"lastName":[[lastNamePermission]],"userImage":[[userImagePermission]]}'
              handle-as="json"
              on-response="loadPermissions"
              on-error="_handleError"
              headers='[[_requestHeaders]]'
              content-type='text/plain'>
            </iron-ajax>

            <iron-ajax
              id="ajaxAddToAddressbook"
              url='[[baseUrl]]/contactservice/addressbook'
              method='POST'
              params='{}'
              handle-as="text"
              on-response="loadAddressbook"
              on-error="_addressbookError"
              headers='[[_requestHeaders]]'
              content-type='text/plain'>
            </iron-ajax>

            <iron-ajax
              id="ajaxRemoveFromAddressbook"
              url='[[baseUrl]]/contactservice/addressbook'
              method='DELETE'
              params='{}'
              handle-as="text"
              on-response="loadAddressbook"
              on-error="_addressbookError"
              headers='[[_requestHeaders]]'
              content-type='text/plain'>
            </iron-ajax>

            <iron-ajax
              id="ajaxGetAddressbook"
              url='[[baseUrl]]/contactservice/addressbook'
              params='{}'
              handle-as="json"
              on-response="updateAddressbook"
              on-error="_addressbookError"
              headers='[[_requestHeaders]]'>
            </iron-ajax>

            <iron-ajax
              id="ajaxGetGroups"
              url='[[baseUrl]]/contactservice/groups'
              params='{}'
              handle-as="json"
              on-response="_updateGroups"
              on-error="_handleError"
              headers='[[_requestHeaders]]'>
            </iron-ajax>

            <iron-ajax
              id="ajaxGetGroupMember"
              url='[[baseUrl]]/contactservice/groups/[[group]]/member'
              params='{}'
              handle-as="json"
              on-response="_updateGroupMemberlist"
              on-error="_handleError"
              headers='[[_requestHeaders]]'>
            </iron-ajax>

            <iron-ajax
              id="ajaxAddGroup"
              url='[[baseUrl]]/contactservice/groups/[[group]]'
              method='POST'
              params='{}'
              handle-as="text"
              on-response="_groupAdded"
              on-error="_handleError"
              headers='[[_requestHeaders]]'
              content-type='text/plain'>
            </iron-ajax>

            <iron-ajax
              id="ajaxRemoveGroup"
              url='[[baseUrl]]/contactservice/groups/[[group]]'
              method='DELETE'
              params='{}'
              handle-as="text"
              on-response="_groupRemoved"
              on-error="_handleError"
              headers='[[_requestHeaders]]'
              content-type='text/plain'>
            </iron-ajax>

            <iron-ajax
              id="ajaxAddGroupMember"
              url='[[baseUrl]]/contactservice/groups/[[group]]/member/[[contact]]'
              method='POST'
              params='{}'
              handle-as="json"
              on-response="_memberAdded"
              on-error="_handleError"
              headers='[[_requestHeaders]]'
              content-type='text/plain'>
            </iron-ajax>

            <iron-ajax
              id="ajaxRemoveGroupMember"
              url='[[baseUrl]]/contactservice/groups/[[group]]/member/[[contact]]'
              method='DELETE'
              params='{}'
              handle-as="json"
              on-response="_memberRemoved"
              on-error="_handleError"
              headers='[[_requestHeaders]]'
              content-type='text/plain'>
            </iron-ajax>

            <iron-ajax
              id="ajaxGetGroupId"
              url='[[baseUrl]]/contactservice/groups/[[group]]/id'
              method='GET'
              params='{}'
              handle-as="json"
              on-response="_handleId"
              on-error="_handleError"
              headers='[[_requestHeaders]]'
              content-type='text/plain'>
            </iron-ajax>

            <iron-ajax
               id="ajaxUpdateAvatar"
               url = '[[baseUrl]]/fileservice/files'
               method="POST"
               params='{}'
               handle-as="text"
               on-response="_updateAvatar"
               on-error="_handleError"
               headers = '[[_requestHeaders]]'
               >
        </iron-ajax>

        <button class="dropdown-trigger" id="dropdown-button" on-click="_openDropdown"></button>
        <iron-dropdown id="dropdown">
            <!-- for now the widget drops down regardless whether a valid login is detected -->
            <!-- until I find a proper solution for detecting a valid login -->
          <!-- <template is="dom-if" if="{{loggedIn}}"> -->
            <div class="dropdown-content" slot="dropdown-content" hidden$="[[!loggedIn]]">
              <ul tabindex="0">
                  <li><a href="javascript:void(0)" on-click="_editProfile">Edit profile</a>
                  </li>
                  <li><a href="javascript:void(0)" on-click="_editRights">Change privacy</a>
                  </li>
                  <li><a href="javascript:void(0)" on-click="_editContacts">Manage Contacts</a>
                  </li>
                  <li><a href="javascript:void(0)" on-click="_editGroups">Manage Groups</a>
                  </li>
                  <li><a href="javascript:void(0)" on-click="_addressbook">Addressbook</a>
                  </li>
                  <li><a href="javascript:void(0)" on-click="_logout">Logout</a>
                  </li>
              </ul>
            </div>
          <!-- </template> -->
        </iron-dropdown>
        <paper-toast id="errorToast" class="fit-bottom" text=""></paper-toast>
        <paper-dialog id="editUser" on-iron-overlay-closed="editUserFunction" style="width:400px">
            <h4>User Information</h4>
            <p>First name:
                <paper-input id="firstName" label="first name" no-label-float value="{{firstName}}"></paper-input>
            </p>
            <p>Last name:
                <paper-input id="lastName" label="last name" no-label-float value="{{lastName}}"></paper-input>
            </p>
            <p>
                <div style="width:50%;margin:auto">
                    <table>
                        <tr>
                            <td>
                                <div class="avatar" id="preview"></div>
                            </td>
                            <td>
                                <input type="file" name="file" id="file" class="inputfile" on-change="onChangeAvatarFile" />
                                <paper-button raised on-click="_uploadAvatarFile">Upload new Avatar</paper-button>
                            </td>
                        </tr>
                    </table>

                </div>
                <div style="display:none">User image:
                    <paper-input id="userImage" label="user image" width="50px" no-label-float value="{{userImage}}"></paper-input>
                </div>
            </p>
            <div class="buttons">
                <paper-button dialog-dismiss>Cancel</paper-button>
                <paper-button dialog-confirm autofocus>Save</paper-button>
            </div>
        </paper-dialog>

        <paper-dialog id="editRights" style="width:400px">
            <h4>Privacy</h4>
            <p>
                <table width="100%" style="border-collapse:separate; border-spacing:1em;">
                    <tr>
                        <td>First name:</td>
                        <td>Private</td>
                        <td>
                            <paper-toggle-button id="firstNamePermission" on-click="changePermission" noink class="green"></paper-toggle-button>
                        </td>
                        <td>Public</td>
                    </tr>
                    <tr>
                        <td>Last name:</td>
                        <td>Private</td>
                        <td>
                            <paper-toggle-button id="lastNamePermission" on-click="changePermission" noink class="green"></paper-toggle-button>
                        </td>
                        <td>Public</td>
                    </tr>
                    <tr>
                        <td>User image:</td>
                        <td>Private</td>
                        <td>
                            <paper-toggle-button id="userImagePermission" on-click="changePermission" noink class="green"></paper-toggle-button>
                        </td>
                        <td>Public</td>
                    </tr>
                    <tr>
                        <td>Addressbook:</td>
                        <td>Private</td>
                        <td>
                            <paper-toggle-button id="appearInAdressbook" on-click="changeAddressbook" noink class="green"></paper-toggle-button>
                        </td>
                        <td>Public</td>
                    </tr>
                </table>
            </p>
            <div class="buttons">
                <paper-button dialog-dismiss>Close</paper-button>
            </div>
        </paper-dialog>

        <paper-dialog id="editContacts" style="width:400px">
            <h4>Contacts:</h4>
            <div>
                <table>
                    <tr>
                        <td>
                            <paper-input id="addContactName" label="Contact name" no-label-float></paper-input>
                        </td>
                        <td>
                            <paper-button raised on-click="addContact" class="green">
                                <iron-icon icon="add"></iron-icon>Add</paper-button>
                        </td>
                    </tr>
                </table>
            </div>
            <paper-dialog-scrollable>
                <div id="userContacts">
                    <iron-list id='itemsList' items='[[contacts]]' selection-enabled multi-selection style='overflow-y:scroll; max-height:200px'>
                        <template>
                            <div style='padding:5px;'>
                                <div id="img[[item]]" class="avatar"></div>
                                <div style='margin-left:5px; position:relative; top:8px;display:inline;'>[[item]]</div>
                                <div style='float:right'>
                                    <paper-icon-button class="red" icon="remove" on-click='removeContact' id="[[item]]"></paper-icon-button>
                                </div>
                            </div>
                        </template>
                    </iron-list>
                </div>
            </paper-dialog-scrollable>
            </p>
            <div class="buttons">
                <paper-button dialog-dismiss>Close</paper-button>
            </div>
        </paper-dialog>

        <paper-dialog id="editGroups" style="width:400px">
            <h4>Groups:</h4>
            <div>
                <table>
                    <tr>
                        <td>
                            <paper-input id="addGroupName" label="Group name" no-label-float></paper-input>
                        </td>
                        <td>
                            <paper-button raised on-click="addGroup" class="green">
                                <iron-icon icon="add"></iron-icon>Add</paper-button>
                        </td>
                    </tr>
                </table>
            </div>
            <div>
                <table>
                    <tr>
                        <td>
                            <select class="form-control" on-change="_updateGroupMemberlist2" id="groupSelect" style="width:150px">
                                <template is="dom-repeat" items="[[groups]]">
                                    <option value="{{item}}">{{item}}</option>
                                </template>
                            </select>

                        </td>
                        <td></td>
                    </tr>
                </table>
            </div>
            <p>
                <paper-dialog-scrollable>
                    <div id="userGroupMember">
                        <iron-list id='itemsList' items='[[groupMember]]' selection-enabled multi-selection style='overflow-y:scroll; max-height:200px'>
                            <template>
                                <div style='padding:5px;'>
                                    <div id="imgg[[item]]" class="avatar"></div>
                                    <div style='margin-left:5px; position:relative; top:8px;display:inline;'>[[item]]</div>
                                    <div style='float:right'>
                                        <paper-icon-button class="red" icon="remove" on-click='removeGroupMember' id="[[item]]"></paper-icon-button>
                                    </div>
                                </div>
                            </template>
                        </iron-list>
                        <button style="font-size:20px" on-click="_getGroupId" >Copy Group ID to Clipboard<i class="fa fa-clipboard"></i></button>
                    </div>
                </paper-dialog-scrollable>
            </p>
            <div>
                <table>
                    <tr>
                        <td>Add a friend:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <select class="form-control" id="memberSelect" style="width:150px">
                                <template is="dom-repeat" items="[[contactsCanAdd]]">
                                    <option value="{{item}}">{{item}}</option>
                                </template>
                            </select>
                        </td>
                        <td>
                            <paper-button raised on-click="addGroupMember" class="green">
                                <iron-icon icon="add"></iron-icon>Add</paper-button>
                        </td>
                    </tr>
                </table>
            </div>
                        <div>
                <table>
                </table>
            </div>
            <div class="buttons">
                <paper-button dialog-dismiss>Close</paper-button>
            </div>
        </paper-dialog>

        <paper-dialog id="addressbook" style="width:400px">
            <h4>Addressbook:</h4>
                <p>
                    <paper-dialog-scrollable>
                        <div id="addressbookContacts">
                            <iron-list id='itemsList' items='[[addressbookContacts]]' selection-enabled multi-selection style='overflow-y:scroll; max-height:200px'>
                                <template>
                                    <div style='padding:5px;'>
                                        <div id="imgAddr[[item]]" class="avatar"></div>
                                        <div style='margin-left:5px; position:relative; top:8px;display:inline;'>[[item]]</div>
                                        <!--<div style='float:right'><paper-icon-button class="red" icon="remove" on-click='removeContact' id="[[item]]"></paper-icon-button></div>-->
                                    </div>
                                </template>
                            </iron-list>
                        </div>
                    </paper-dialog-scrollable>
                </p>
            <div class="buttons">
                <paper-button dialog-dismiss>Close</paper-button>
            </div>
        </paper-dialog>`;
    }

    static get properties() {
        return {
            data: Object,
            baseUrl: {
                type: String,
                value: null,
            },
            hover: {
                type: Boolean,
                value: false
            },
            firstName: {
                type: String,
                notify: true,
                value: null
            },
            lastName: {
                type: String,
                value: null,
                notify: true
            },
            userImage: {
                type: String,
                value: null
            },
            firstNamePermission: {
                type: Boolean,
                notify: true,
                value: null
            },
            lastNamePermission: {
                type: Boolean,
                value: null,
                notify: true
            },
            userImagePermission: {
                type: Boolean,
                value: null
            },
            appearInAdressbook: {
                type: Boolean,
                value: null
            },
            contactToAdd: {
                type: String,
                value: null
            },
            contactToRemove: {
                type: String,
                value: null
            },
            contacts: {
                type: Object,
                value: []
            },
            addressbookContacts: {
                type: Object,
                value: []
            },
            contactsCanAdd: {
                type: Object,
                value: []
            },
            contact: {
                type: String,
                value: null
            },
            group: {
                type: String,
                value: null
            },
            groups: {
                type: Object,
                value: []
            },
            groupMember: {
                type: Object,
                value: []
            },
            name: {
              type: String,
              computed: '_computeName()'
            },
            loggedIn: {
                type: Boolean,
                computed: '_computeLogin(loginName,loginOidcToken,loginOidcProvider,loginOidcSub)'
            },
            loginName: {
                type: String,
                value: null
            },
            loginPassword: {
                type: String,
                value: null
            },
            loginOidcToken: {
                type: String,
                value: null
            },
            loginOidcProvider: {
                type: String,
                value: null
            },
            loginOidcSub: {
                type: String,
                value: null
            },
            _requestHeaders: {
                type: Object,
                computed: '_computeHeaders(loginName,loginPassword,loginOidcToken,loginOidcProvider,loginOidcSub)'
            },
            sendCookie: {
                type: Boolean,
                value: false
            }
        }
    }

    _computeHeaders(loginName, loginPassword, loginOidcToken, loginOidcProvider, loginOidcSub) {
        var headers = {};

        if (loginName != null && loginName.length && loginPassword != null && loginPassword.length) {
            headers["Authorization"] = "Basic " + btoa(loginName + ":" + loginPassword);
        } else if (loginOidcToken != null && loginOidcToken.length) {
            headers["access-token"] = loginOidcToken;
            if (loginOidcProvider != null && loginOidcProvider.length) {
                headers["oidc_provider"] = loginOidcProvider;
            }
            if (loginOidcSub != null && loginOidcSub.length) {
                headers["Authorization"] = "Basic " + btoa(loginName + ":" + loginOidcSub)
            }
        }
        return headers;
    }

    addUser(list, user) {
        this.push(list, user);
    }

    removeUser(list, user) {
        var index = this.contacts.indexOf(user);
        if (index != -1) {
            this.splice(list, index, 1);
        }
    }

    removeUserCanAdd(list, user) {
        var index = this.contactsCanAdd.indexOf(user);
        if (index != -1) {
            this.splice(list, index, 1);
        }
    }

    addContact(e, detail) {
        var cta = this.$.addContactName.value;
        this.contactToAdd = cta;
        this.$.ajaxAddUser.generateRequest();
    }

    addGroup(e, detail) {
        var groupName = this.$.addGroupName.value;
        this.group = groupName;
        this.$.ajaxAddGroup.generateRequest();
    }

    _openDropdown() {
        this.$.dropdown.open();
    }

    _uploadAvatarFile() {
        this.$.file.click();
    }

    _editProfile(event) {
        this.$.dropdown.close();
        var dialog = this.$.editUser;
        if (dialog) {
            dialog.open();
        }
    }

    _editRights(event) {
        this.$.dropdown.close();
        var dialog = this.$.editRights;
        if (dialog) {
            this.$.ajaxGetPermissions.generateRequest();
            this.$.ajaxGetAddressbook.generateRequest();
            dialog.open();
        }
    }

    _editContacts(event) {
        this.$.dropdown.close();
        var dialog = this.$.editContacts;
        if (dialog) {
            dialog.open();
            this.$.ajaxGetContacts.generateRequest();
        }
    }

    _editGroups(event) {
        this.$.dropdown.close();
        var dialog = this.$.editGroups;
        if (dialog) {
            dialog.open();
            this.$.ajaxGetGroups.generateRequest();
        }
    }

    _addressbook(event) {
        this.$.dropdown.close();
        var dialog = this.$.addressbook;
        if (dialog) {
            dialog.open();
            this.$.ajaxGetAddressbook.generateRequest();
        }
    }

    _computeLogin(loginName, loginOidcToken, loginOidcProvider, loginOidcSub) {
        if (loginName != null && loginName.length) {
            return true;
        } else if (loginOidcToken != null && loginOidcToken.length && loginOidcProvider != null && loginOidcProvider.length && loginOidcSub != null && loginOidcSub.length) {
            return true;
        }
        return false;
    }

    _computeName(){
        return ""+Math.random().toString(36).substring(7);
    }

    ready() {
        super.ready();
        if (this.sendCookie) {
            let ajaxReqs = this.shadowRoot.querySelectorAll("iron-ajax");
            for (var i = 0; i < ajaxReqs.length; i++)
                if (this.sendCookie)
                    ajaxReqs[i].withCredentials = true;
        }
        if (this.loggedIn || this.sendCookie) {
            this.$.ajaxUserinformation.generateRequest();
            this.$.ajaxGetContacts.generateRequest();
            this.$.ajaxGetGroups.generateRequest();
            this.$.ajaxGetAddressbook.generateRequest();
        }
    }

    editUserFunction(event) {
        if (event.detail.confirmed) {
            this.firstName = this.$.firstName.value;
            this.lastName = this.$.lastName.value;
            this.userImage = this.$.userImage.value;
            this.$.ajaxUserinformationUpdate.generateRequest();
        } else {
            this.$.firstName.setAttribute('value', this.firstName);
            this.$.lastName.setAttribute('value', this.lastName);
            this.$.userImage.setAttribute('value', this.userImage);
        }
    }

    changePermission(event, detail) {
        var p1 = this.$.firstNamePermission;
        var p2 = this.$.lastNamePermission;
        var p3 = this.$.userImagePermission;
        this.firstNamePermission = p1.checked;
        this.lastNamePermission = p2.checked;
        this.userImagePermission = p3.checked;
        this.$.ajaxUserPermissionUpdate.generateRequest();
    }

    changeAddressbook(event, detail) {
        var p1 = this.$.appearInAdressbook;
        this.appearInAdressbook = p1.checked;
        if (p1.checked)
            this.$.ajaxAddToAddressbook.generateRequest();
        else
            this.$.ajaxRemoveFromAddressbook.generateRequest();
    }

    loadPermissions(event, detail) {
        this.$.ajaxGetPermissions.generateRequest();
    }

    loadAddressbook(event, detail) {
        this.$.ajaxGetAddressbook.generateRequest();
    }

    updateAddressbook(event, detail) {
        this.addressbookContacts = [];
        var contactlist = event.detail.response;
        let keys = Object.keys(contactlist);
        for (var i = 0; i < keys.length; i++) {
            this.addUser('addressbookContacts',contactlist[keys[i]]);
            this.contact = contactlist[keys[i]];
            this.$.ajaxContactInformation.generateRequest();
        }
        if (this.loginName != null && this.loginName.length){
            if (this.addressbookContacts.indexOf(this.loginName) > -1) {
              this.appearInAdressbook = true;
              this.$.appearInAdressbook.setAttribute('checked', this.appearInAdressbook);
            }
        }
    }

    removeContact(event, detail) {
        this.contactToRemove = event.model.__data.item;
        console.log("Removing " + this.contactToRemove + " from your contact list");
        this.$.ajaxRemoveContact.generateRequest();
        delete this.contacts[this.contactToRemove];
    }

    removeGroupMember(event, detail) {
        this.contact = event.model.__data.item;
        console.log(this.contact);
        this.group = this.$.groupSelect.value;
        this.$.ajaxRemoveGroupMember.generateRequest();
    }


    contactAdded(event) {
        this.addUser('contacts', this.contactToAdd);
        this.contact = this.contactToAdd;
        this.$.ajaxContactInformation.generateRequest();
        this.contacts.sort(function(a, b) {
            if (a.toLowerCase() < b.toLowerCase()) return -1;
            if (a.toLowerCase() > b.toLowerCase()) return 1;
            return 0;
        });
    }

    _getGroupId(){
      this.$.ajaxGetGroupId.generateRequest();
    }

    _handleId(event){
      var res = event.detail.response;
      console.log(res);
      console.log(res.groupId);
      var groupId = res.groupId;
      var textArea = document.createElement("textarea");

      textArea.value = groupId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

    }

    addGroupMember(event, detail) {
        var gm = this.$.memberSelect.value;
        var g = this.$.groupSelect.value;
        if (gm.length > 0 && g.length > 0) {
            this.group = g;
            this.contact = gm;
            this.$.ajaxAddGroupMember.generateRequest();
        }
    }

    contactRemoved(event) {
        this.removeUser('contacts', this.contactToRemove);
        this.contacts.sort(function(a, b) {
            if (a.toLowerCase() < b.toLowerCase()) return -1;
            if (a.toLowerCase() > b.toLowerCase()) return 1;
            return 0;
        });
    }

    updateContactList(event) {
        this.$.ajaxGetContacts.generateRequest();
    }

    _updateGroups(event) {
      console.log("_updateGroupMemberlisdsdsdds");
        var res = event.detail.response;
        this.groups = [];
        let keys = Object.keys(res);

        for (var i = 0; i < keys.length; i++) {
            console.log("jkey " + i);
            this.addUser('groups', res[keys[i]]);
        }
        if (keys.length > 0) {
            if (this.$.groupSelect.value.length > 0) {
                this._updateGroupMemberlist2();
            } else {
                this.group = res[keys[0]];
                this.$.ajaxGetGroupMember.generateRequest();
            }
        } 
    }

    _updateGroupMemberlist(event) {
      console.log("_updateGroupMemberlist");
        var res = event.detail.response;
        this.groupMember = [];
        this.contactsCanAdd = [];
        let keys = Object.keys(this.contacts);
        for (var i = 0; i < keys.length; i++) {
            this.addUser("contactsCanAdd", this.contacts[keys[i]]);
        }
        keys = Object.keys(res);
        for (var i = 0; i < keys.length; i++) {
            this.addUser('groupMember', res[keys[i]]);
            this.removeUserCanAdd('contactsCanAdd', res[keys[i]]);
            //this.contact = res[member];
            //this.$.ajaxContactInformation.generateRequest();
        }
        this.groupMember.sort(function(a, b) {
            if (a.toLowerCase() < b.toLowerCase()) return -1;
            if (a.toLowerCase() > b.toLowerCase()) return 1;
            return 0;
        });
    }

    _updateGroupMemberlist2(event) {
      console.log("_updateGroupMemberlist2");
        this.group = this.$.groupSelect.value;
        this.$.ajaxGetGroupMember.generateRequest();
    }

    _groupAdded(event) {
        this.addUser('groups', this.group);
       this._updateGroupMemberlist(event); 
    }

    _memberAdded(event) {
        this.removeUserCanAdd("contactsCanAdd", this.contact);
        this._updateGroupMemberlist2();
    }

    _memberRemoved(event) {
        this.addUser("contactsCanAdd", this.contact);
        this._updateGroupMemberlist2();
    }

    _getContactInformation(event) {
        var result = event.detail.response;
        result = result.substring(1, result.length - 1);
        result = result.replace(/ /g, "");
        var res = result.split(",");
        var json = "{";
        for (var i = 0; i < res.length; i++) {
            var res2 = res[i].split("=");
            json = json + "\"" + res2[0] + "\":" + "\"" + res2[1] + "\",";
        }
        json = json.substring(0, json.length - 1);
        json = json + "}";

        var jsonObject = JSON.parse(json);
        var currentUrl = event.detail.url;
        var currentUser = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
        var imgUrl = "";
        if (typeof jsonObject["userImage"] !== 'undefined') {
            imgUrl = jsonObject["userImage"];
        }
        //$('#img'+currentUser).css("background-image", "url(https://raw.githubusercontent.com/rwth-acis/las2peer-frontend-user-widget/polymer3.0/logo.png)");
        var imgUrl_css = "https://raw.githubusercontent.com/rwth-acis/las2peer-frontend-user-widget/master/logo.png";
        if (imgUrl.length > 1)
            imgUrl_css = this.baseUrl + "/fileservice/files/" + imgUrl;
        let usrAvatar = this.shadowRoot.querySelector("#img" + currentUser);
        if (usrAvatar != null)
            usrAvatar.style.backgroundImage = "url(" + imgUrl_css + ")";
        usrAvatar = this.shadowRoot.querySelector("#imgg" + currentUser);
        if (usrAvatar != null)
            usrAvatar.style.backgroundImage = "url(" + imgUrl_css + ")";
        usrAvatar = this.shadowRoot.querySelector("#imgAddr" + currentUser);
        if (usrAvatar != null)
            usrAvatar.style.backgroundImage = "url(" + imgUrl_css + ")";
    }

    _updateContactList(event) {
        var userliste = event.target.lastResponse;
        this.contacts = [];
        let keys = Object.keys(userliste);
        for (var i = 0; i < keys.length; i++) {
            this.addUser('contacts', userliste[keys[i]]);
            this.contact = userliste[keys[i]];
            this.$.ajaxContactInformation.generateRequest();
        }
        this.contacts.sort(function(a, b) {
            if (a.toLowerCase() < b.toLowerCase()) return -1;
            if (a.toLowerCase() > b.toLowerCase()) return 1;
            return 0;
        });
    }

    _getUserInformation(event) {
        //var userInformation = JSON.parse(event.target.lastResponse);
        var response = event.target.lastResponse;
        response = response.substring(1, response.length - 1);
        var res = response.split(",");
        this.firstName = res[0].substring(res[0].indexOf('=') + 1);
        this.lastName = res[1].substring(res[1].indexOf('=') + 1);
        this.userImage = res[2].substring(res[2].indexOf('=') + 1);
        this.$.firstName.setAttribute('value', this.firstName);
        this.$.lastName.setAttribute('value', this.lastName);
        this.$.userImage.setAttribute('value', this.userImage);
        if(this.userImage.length>0){
          this.shadowRoot.querySelector("#dropdown-button").style.backgroundImage = "url(" + this.baseUrl + "/fileservice/files/" + this.userImage + ")";
          this.shadowRoot.querySelector("#preview").style.backgroundImage = "url(" + this.baseUrl + "/fileservice/files/" + this.userImage + ")";
        }
        console.log(this.firstName + " " + this.lastName + ", " + this.userImage);
        this.dispatchEvent(new CustomEvent('signed-in'));
    }

    _updatedUserInformation(event) {
        this.shadowRoot.querySelector("#dropdown-button").style.backgroundImage = "url(" + this.baseUrl + "/fileservice/files/" + this.userImage + ")";
    }

    _updatePermission(event) {
        var permissions = event.target.lastResponse;
        var res = permissions.split(",");
        this.firstNamePermission = res[0].substring(res[0].indexOf('=') + 1);
        this.lastNamePermission = res[1].substring(res[1].indexOf('=') + 1);
        this.userImagePermission = res[2].substring(res[2].indexOf('=') + 1);
        this.userImagePermission = this.userImagePermission.substring(0, this.userImagePermission.length - 1);
        if (this.firstNamePermission == "true") {
            this.$.firstNamePermission.setAttribute('checked', this.firstNamePermission);
        }
        if (this.lastNamePermission == "true") {
            this.$.lastNamePermission.setAttribute('checked', this.lastNamePermission);
        }
        if (this.userImagePermission == "true") {
            this.$.userImagePermission.setAttribute('checked', this.userImagePermission);
        }
    }

    onChangeAvatarFile(e, detail, sender) {
        var formData = new FormData();
        for (var i = 0, f; f = e.target.files[i]; ++i) {
            formData.append("filecontent", f, f.name);
        }
        formData.append('identifier', 'contactPicutre'+this.name);
        formData.append('description', 'profile picture');

        this.$.ajaxUpdateAvatar.body = formData;
        // Override default type set by core-ajax.
        // Allow browser to set the mime multipart content type itself.
        this.$.ajaxUpdateAvatar.contentType = null;
        this.$.ajaxUpdateAvatar.generateRequest();
    }

    _updateAvatar(event) {
        this.userImage = event.detail.response;
        this.$.userImage.setAttribute('value', this.userImage);
        if(this.userImage.length>0){
          this.shadowRoot.querySelector("#dropdown-button").style.backgroundImage = "url(" + this.baseUrl + "/fileservice/files/" + this.userImage + ")";
          this.shadowRoot.querySelector("#preview").style.backgroundImage = "url(" + this.baseUrl + "/fileservice/files/" + this.userImage + ")";
        }
    }

    _logout(event) {
        this.loginName = null;
        this.loginPassword = null;
        this.loginOidcToken = null;
        this.loginOidcProvider = null;
        this.loginOidcSub = null;
        this.shadowRoot.querySelector("#dropdown-button").style.backgroundImage = "url(https://raw.githubusercontent.com/rwth-acis/las2peer-frontend-user-widget/master/logo.png)";
        this.dispatchEvent(new CustomEvent('signed-out', {bubbles: true}));
        event.stopPropagation();
    }

    _handleError(event) {
        //alert(event.target.lastResponse);
        console.log(event.detail.error.message + " " + event.detail.request.url);
    }

    _contactAddError(event) {
        this.$.errorToast.show({
            text: 'Contact could not be added. ' + event.detail.request.xhr.response,
            duration: 2500
        });
    }

    _addressbookError(event) {
        this.$.errorToast.show({
            text: 'Addressbook: ' + event.detail.request.xhr.response,
            duration: 2500
        });
    }

    _isNull(val) {
        return val == null;
    }
}

window.customElements.define("las2peer-user-widget", Las2peerUserWidget);
