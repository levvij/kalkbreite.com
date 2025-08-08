import { Component } from "@acryps/page";
import { SessionService } from "../managed/services";

export class LoginPage extends Component {
	mail = '';
	password = '';

	render() {
		return <ui-login>
			<ui-form>
				<ui-field>
					<label>Mail Address</label>

					<input
						type='email' name='mail'
						$ui-value={this.mail}
					/>
				</ui-field>

				<ui-field>
					<label>Password</label>

					<input
						type='password' name='password'
						$ui-value={this.password}
					/>
				</ui-field>

				<ui-action ui-click={() => {
					new SessionService().login(this.mail, this.password);

					location.href = '/home';
				}}>
					Login
				</ui-action>
			</ui-form>
		</ui-login>
	}
}
