import { Component } from '@acryps/page';
import { Application } from '.';

export class PageComponent extends Component {
	render(child) {
		return <ui-page>
			<ui-navigation>
				<ui-content>
					<ui-logo ui-href='/home'>
						Kalkbreite
					</ui-logo>

					{Application.session?.account ? <ui-account>
						{Application.session.account.name}
					</ui-account> : <ui-login ui-href='/login'>
						Login
					</ui-login>}
				</ui-content>
			</ui-navigation>

			{child}
		</ui-page>;
	}
}
