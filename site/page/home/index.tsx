import { Component } from "@acryps/page";
import { RailcarService, RailcarSummaryModel, SearchService } from "../managed/services";
import { ReaderComponent } from "./reader";
import { RailcarCollectionComponent } from "../shared/railcar-collection";
import { SlideshowComponent } from "../shared/slideshow";
import { Application } from "..";
import { LayoutComponent } from "../shared/layout";
import { goIcon, searchIcon } from "../.built/icons";
import { MetaSearchRescueOrganization } from "@acryps/metadata";
import { SearchComponent } from "../shared/search";

export class HomePage extends Component {
	static shortcuts = ['home', 'h'];

	search = new SearchComponent(link => this.navigate(link));

	render() {
		return <ui-home>
			<ui-header>
				<ui-title>
					Kalkbreite Model Railway
				</ui-title>

				<ui-introduction>
					Welcome to Kalkbreite Model Railway.
					A playground for railway operations, electronics, robust controlling software and street art.
					Layout built and run by train nerd Levi Hechenberger in Zürich, Switzerland.
				</ui-introduction>

				{this.search}
			</ui-header>

			<ui-cover>
				<img src='/assets/cover.jpg' />
			</ui-cover>

			<ui-topics>
				<ui-topic ui-href='/railcar'>
					<img src='/assets/topics/rolling-stock.jpg' />

					<ui-title>
						Rolling Stock
					</ui-title>

					<ui-description>
						All rolling stock registered in the Kalkbreite model railway.
					</ui-description>

					{goIcon()}
				</ui-topic>

				<ui-topic ui-href='/layout'>
					<img src='/assets/topics/layout.jpg' />

					<ui-title>
						Layout
					</ui-title>

					<ui-description>
						View the layout schematic representation, including current train locations.
					</ui-description>

					{goIcon()}
				</ui-topic>

				<ui-topic ui-href='/live'>
					<img src='/assets/topics/live.jpg' />

					<ui-title>
						Live Session
					</ui-title>

					<ui-description>
						View live view of the layout through the network cameras.
					</ui-description>

					{goIcon()}
				</ui-topic>

				<ui-topic ui-href='/graffiti'>
					<img src='/assets/topics/graffiti.jpg' />

					<ui-title>
						Graffiti
					</ui-title>

					<ui-description>
						Explore the many graffitis applied to the rolling stock all over the layout.
					</ui-description>

					{goIcon()}
				</ui-topic>

				<ui-topic ui-href='/train'>
					<img src='/assets/topics/trains.jpg' />

					<ui-title>
						Trains
					</ui-title>

					<ui-description>
						See the currently assembled trains and track them across the layout.
					</ui-description>

					{goIcon()}
				</ui-topic>

				<ui-topic ui-href='/cargo'>
					<img src='/assets/topics/cargo.jpg' />

					<ui-title>
						Cargo
					</ui-title>

					<ui-description>
						Trains move cargo. See all the containers registered at Kalkbreite.
					</ui-description>

					{goIcon()}
				</ui-topic>
			</ui-topics>
		</ui-home>
	}
}
