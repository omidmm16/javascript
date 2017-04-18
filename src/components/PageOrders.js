import React from "react";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import { Row, ColumnText, Column } from "./Tables";
import { LargeButton } from "./Button";
import { ChevronButton } from "./RoundButton";
import MediaQuery from "react-responsive";

const messages = defineMessages( {
	date: {
		id: "orders.overview.date",
		defaultMessage: "Date",
	},
	orderNumber: {
		id: "orders.overview.orderNumber",
		defaultMessage: "Order number",
	},
	items: {
		id: "orders.overview.items",
		defaultMessage: "Items",
	},
	total: {
		id: "orders.overview.total",
		defaultMessage: "Total",
	},
	status: {
		id: "orders.overview.status",
		defaultMessage: "Status",
	},
	invoice: {
		id: "orders.overview.invoice",
		defaultMessage: "Invoice",
	},
} );

/**
 * A page order list using table abstraction.
 *
 * @param {Object} props Properties to be passed to the table.
 * @returns {ReactElement} A row of order stuff.
  */
function PageOrderList( props ) {
	return (
		<Row>
			<ColumnText label={ props.intl.formatMessage( messages.date ) }>{ props.date }</ColumnText>
			<ColumnText hideOnMobile={ true } hideOnTablet={ true } label={ props.intl.formatMessage( messages.orderNumber ) } >{ props.orderNumber }</ColumnText>
			<ColumnText label={ props.intl.formatMessage( messages.items ) } >{ props.items }</ColumnText>
			<ColumnText label={ props.intl.formatMessage( messages.total ) } >{ props.total }</ColumnText>
			<ColumnText label={ props.intl.formatMessage( messages.status ) } >{ props.status }</ColumnText>
			<Column textAlign="right">
				<MediaQuery query="(min-width: 1356px)">
					<LargeButton aria-label={ props.intl.formatMessage( messages.invoice ) }
								 onClick={ props.onClickInvoice }>{ props.intl.formatMessage( messages.invoice ) }</LargeButton>
				</MediaQuery>
				<MediaQuery query="(max-width: 1355px)">
					<ChevronButton aria-label={ props.intl.formatMessage( messages.invoice ) }
								   onClick={ props.onClickInvoice } />
				</MediaQuery>
			</Column>
		</Row>
	);
}


PageOrderList.propTypes = {
	date: React.PropTypes.instanceOf( Date ),
	orderNumber: React.PropTypes.string,
	items: React.PropTypes.string,
	total: React.PropTypes.string,
	status: React.PropTypes.string,
	onClickInvoice: React.PropTypes.func,
	intl: intlShape.isRequired,
};

PageOrderList.defaultProps = {
	date: Date(),
	orderNumber: "MOOIE 123 TEST",
	items: "TEST ITEM",
	total: "$centjes",
	status: "Failed",
	onClickInvoice: () => {
		console.log( "Invoice clicked" );
	},
	intl: intlShape.isRequired,
};

export default injectIntl( PageOrderList );

