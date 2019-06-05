"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const crmModel_1 = require("../model/crmModel");
const Contact = mongoose.model("Contact", crmModel_1.ContactSchema);
class ContactController {
    addNewContact(req, res) {
        const newContact = new Contact(req.body);
        newContact.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    getcontacts(req, res) {
        const data = {
            "tes": "testing",
            "test2": "tesst2"
        };
        Contact.find({}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    }
    getContactWithID(req, res) {
        Contact.findById(req.params.contactId, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    updatecontact(req, res) {
        Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    deleteContact(req, res) {
        Contact.remove({ _id: req.params.contactId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: "Successfully deleted contact!" });
        });
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=crmController.js.map