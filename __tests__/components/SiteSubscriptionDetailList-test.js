import React from 'react';
import { createComponentWithIntl } from "../../utils";

import SiteSubscriptionDetailList from '../../src/components/SiteSubscriptionDetailList';
import SeoIcon from "../../src/icons/Yoast/Yoast_SEO_Icon_Small.svg";
import LocalIcon from "../../src/icons/Yoast/Local_SEO_Icon_Small.svg";

test('the site subscription detail list component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SiteSubscriptionDetailList
			siteSubscriptions={ [
				{
					id: "bla",
					name: "Yoast SEO",
					productId: "Yoast SEO",
					startDate: "2017-04-11T00:00:00.000Z",
					endDate: "2017-04-11T00:00:00.000Z",
					reoccurring: true,
					subscriberId: 2,
					limit: 10,
					used: 5,
					price: 5900,
					product: {
						id: "productid",
						name: "string",
						description: "string",
						storeUrl: "string",
						downloadUrl: "string",
						isDownloadOnly: false,
						icon: SeoIcon,
						shopProductType: "string",
						shopStatus: "string",
						price: 0,
						shopRegularPrice: 0,
						shopTaxStatus: "string",
						shopTaxClass: "string",
						lastUpdated: "2017-04-26T11:21:02.597Z",
						currentVersion: 0,
						changelog: "string"
					},
					productLogo: SeoIcon,
				},
				{
					id: "bla2",
					name: "Local SEO",
					productId: "Local SEO",
					startDate: "2017-04-11T00:00:00.000Z",
					endDate: "2017-04-11T00:00:00.000Z",
					reoccurring: true,
					subscriberId: 2,
					limit: 10,
					used: 7,
					price: 6900,
					product: {
						id: "productid2",
						name: "string",
						description: "string",
						storeUrl: "string",
						downloadUrl: "string",
						isDownloadOnly: false,
						icon: LocalIcon,
						shopProductType: "string",
						shopStatus: "string",
						price: 0,
						shopRegularPrice: 0,
						shopTaxStatus: "string",
						shopTaxClass: "string",
						lastUpdated: "2017-04-26T11:21:02.597Z",
						currentVersion: 0,
						changelog: "string"
					},
					productLogo: LocalIcon,
				},
			] }
			plugins={
				[
					{
						id: "productid",
						name: "Yoast SEO Premium",
						type: "plugin",
						icon: "icon.png",
						currency: "USD",
						price: 123,
						limit: 2,
						used: 1,
					},
					{
						id: "productid2",
						name: "Yoast SEO Local",
						type: "plugin",
						icon: "icon2.png",
						currency: "USD",
						price: 123,
						limit: 2,
						used: 2,
					},
				]
			}
			onAddMoreLicensesClick={ () => {
				console.log( "add more licenses" );
			} }
			onMoreInfoClick={ () => {
				console.log( "more info" );
			} }
			onSettingsClick={ () => {
				console.log( "settings" );
			} }
			onToggleSubscription={ () => {
				console.log( "toggled" );
			} }
		/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
