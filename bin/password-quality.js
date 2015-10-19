"use strict";

var PasswordQuality = class PasswordQuality {
	constructor(password, username){
		this.password = password;
		this.username = username;
		this._messages = [];
	}

	notEnoughCharVariety(){
		let count = 0;
		if( String.prototype.match.call(this.password, /[A-Z]/) ) { count++; }
		if( String.prototype.match.call(this.password, /[a-z]/) ) { count++; }
		if( String.prototype.match.call(this.password, /\d/) ) { count++; }
		if( String.prototype.match.call(this.password, /[!@#\$%\^&\*(){}\[\]]/) ) { count++; }
		if(count < 2){
			this._messages.push('Password must have at least 3, a lowercase letter, an uppercase letter, a number, a symbol.');
		}
		return this;
	}

	notLongEnough(){
		if(this.password.length < 8) {
			this._messages.push('Password must be 8 or more characters.');
		}
		return this;
	}

	get messages(){
		this._messages = [];
		return this.notEnoughCharVariety().notLongEnough()._messages;
	}

	set messages(m){
		return false;
	}

	hasErrs(){
		this._messages = [];
		return this.notEnoughCharVariety().notLongEnough()._messages.length;
	}

	sendErrs(req, res, message){
		let tempMessages = this.messages;
		if(message) tempMessages.push(message);

		if(req.accepts('html')){ 
			res.redirect('/#/create-account?flash='+JSON.stringify(tempMessages));
		} else {
			res.json(tempMessages)
		}
	}

}

module.exports = PasswordQuality;